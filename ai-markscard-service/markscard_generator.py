"""
AI-Powered Markscard Generator Backend
This Flask API generates professional PDF markscards using AI for design and layout
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from datetime import datetime
import io
import os
import requests

# Hasura Configuration
HASURA_URL = os.environ.get("HASURA_ENDPOINT", "http://localhost:8085/v1/graphql")
HASURA_ADMIN_SECRET = os.environ.get("HASURA_ADMIN_SECRET", "myadminsecretkey")

# Optional: Anthropic AI import (not required for basic functionality)
try:
    from anthropic import Anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False
    print("Note: anthropic module not installed. AI-enhanced features disabled.")

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend
print("Markscard Generator Service Updated - Ready to use dynamic school names")

# Initialize Anthropic AI client only if available (optional - for enhanced features)
if ANTHROPIC_AVAILABLE:
    anthropic_client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

class MarkscardGenerator:
    """AI-powered markscard generation with professional styling"""
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.setup_custom_styles()
    
    def setup_custom_styles(self):
        """Create custom paragraph styles for the markscard"""
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1e40af'),
            spaceAfter=12,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        self.styles.add(ParagraphStyle(
            name='CustomSubtitle',
            parent=self.styles['Normal'],
            fontSize=14,
            textColor=colors.HexColor('#4b5563'),
            spaceAfter=20,
            alignment=TA_CENTER,
            fontName='Helvetica'
        ))
        
        self.styles.add(ParagraphStyle(
            name='StudentInfo',
            parent=self.styles['Normal'],
            fontSize=11,
            textColor=colors.HexColor('#374151'),
            spaceAfter=6,
            fontName='Helvetica'
        ))
    
    def generate_header(self, story, data):
        """Generate professional header section"""
        # School/Institution name
        school_name = data.get('school_name', 'ACADEMIC INSTITUTION').upper()
        title = Paragraph(
            f"<b>{school_name}</b>",
            self.styles['CustomTitle']
        )
        story.append(title)
        
        subtitle = Paragraph(
            "Student Progress Report",
            self.styles['CustomSubtitle']
        )
        story.append(subtitle)
        
        story.append(Spacer(1, 0.3 * inch))
        
        # Student information section
        info_data = [
            ['Student Name:', data['student_name'], 'Admission No:', data['admission_no']],
            ['Examination:', data['exam_name'], 'Date:', data['date']]
        ]
        
        info_table = Table(info_data, colWidths=[1.5*inch, 2.5*inch, 1.5*inch, 2*inch])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#e5e7eb')),
            ('BACKGROUND', (2, 0), (2, -1), colors.HexColor('#e5e7eb')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1f2937')),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (2, 0), (2, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#d1d5db'))
        ]))
        
        story.append(info_table)
        story.append(Spacer(1, 0.3 * inch))
    
    def generate_marks_table(self, story, marks_data):
        """Generate the marks table with AI-enhanced styling"""
        # Table header
        table_data = [
            ['Subject', 'Marks Obtained', 'Maximum Marks', 'Percentage', 'Grade', 'Remarks']
        ]
        
        # Add marks rows
        for mark in marks_data:
            table_data.append([
                mark['subject'],
                str(mark['marks_obtained']),
                str(mark['max_marks']),
                f"{mark['percentage']}%",
                mark['grade'],
                mark['remarks'] or '-'
            ])
        
        # Create table
        marks_table = Table(
            table_data,
            colWidths=[2*inch, 1.2*inch, 1.2*inch, 1*inch, 0.8*inch, 1.3*inch]
        )
        
        # Style the table
        table_style = TableStyle([
            # Header styling
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2563eb')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 11),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
            ('TOPPADDING', (0, 0), (-1, 0), 10),
            
            # Body styling
            ('BACKGROUND', (0, 1), (-1, -1), colors.white),
            ('TEXTCOLOR', (0, 1), (-1, -1), colors.HexColor('#374151')),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
            ('TOPPADDING', (0, 1), (-1, -1), 8),
            
            # Grid
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#9ca3af')),
            
            # Alternating row colors
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f9fafb')])
        ])
        
        # Add grade-based coloring
        for idx, mark in enumerate(marks_data, start=1):
            grade = mark['grade']
            if grade in ['A+', 'A']:
                table_style.add('TEXTCOLOR', (4, idx), (4, idx), colors.HexColor('#059669'))
            elif grade in ['B+', 'B']:
                table_style.add('TEXTCOLOR', (4, idx), (4, idx), colors.HexColor('#2563eb'))
            elif grade == 'C':
                table_style.add('TEXTCOLOR', (4, idx), (4, idx), colors.HexColor('#d97706'))
            elif grade in ['D', 'F']:
                table_style.add('TEXTCOLOR', (4, idx), (4, idx), colors.HexColor('#dc2626'))
        
        marks_table.setStyle(table_style)
        story.append(marks_table)
        story.append(Spacer(1, 0.3 * inch))
    
    def generate_summary(self, story, data):
        """Generate performance summary section"""
        summary_data = [
            ['Total Marks Obtained', 'Maximum Marks', 'Overall Percentage', 'Result'],
            [
                str(data['total_marks']),
                str(data['max_marks']),
                f"{data['overall_percentage']}%",
                'PASS' if float(data['overall_percentage']) >= 35 else 'FAIL'
            ]
        ]
        
        summary_table = Table(summary_data, colWidths=[2*inch, 2*inch, 2*inch, 1.5*inch])
        summary_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#7c3aed')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 11),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ('TOPPADDING', (0, 0), (-1, -1), 10),
            ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor('#f3f4f6')),
            ('FONTNAME', (0, 1), (-1, 1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 1), (-1, 1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#9ca3af'))
        ]))
        
        # Color code the result
        result = 'PASS' if float(data['overall_percentage']) >= 35 else 'FAIL'
        result_color = colors.HexColor('#059669') if result == 'PASS' else colors.HexColor('#dc2626')
        summary_table.setStyle(TableStyle([
            ('TEXTCOLOR', (3, 1), (3, 1), result_color)
        ]))
        
        story.append(summary_table)
        story.append(Spacer(1, 0.4 * inch))
    
    def generate_footer(self, story):
        """Generate footer with signatures"""
        story.append(Spacer(1, 0.5 * inch))
        
        footer_data = [
            ['_________________', '_________________', '_________________'],
            ["Class Teacher's Signature", "Principal's Signature", "Parent's Signature"]
        ]
        
        footer_table = Table(footer_data, colWidths=[2.5*inch, 2.5*inch, 2.5*inch])
        footer_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 1), (-1, 1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, 1), 9),
            ('TEXTCOLOR', (0, 1), (-1, 1), colors.HexColor('#6b7280')),
            ('TOPPADDING', (0, 1), (-1, 1), 5)
        ]))
        
        story.append(footer_table)
    
    def generate_pdf(self, data):
        """Main method to generate the complete markscard PDF"""
        buffer = io.BytesIO()
        
        # Create PDF document
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=0.5*inch,
            leftMargin=0.5*inch,
            topMargin=0.5*inch,
            bottomMargin=0.5*inch
        )
        
        story = []
        
        # Generate sections
        self.generate_header(story, data)
        self.generate_marks_table(story, data['marks'])
        self.generate_summary(story, data)
        self.generate_footer(story)
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return buffer


@app.route('/api/generate-markscard', methods=['POST'])
def generate_markscard():
    """API endpoint to generate markscard PDF"""
    try:
        data = request.json
        print(f"DEBUG: Received data: {data}")
        
        # Validate required fields
        required_fields = ['student_name', 'admission_no', 'exam_name', 'marks', 
                          'total_marks', 'max_marks', 'overall_percentage', 'date']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Try to fetch actual school name from Hasura if default is sent
        if data.get('school_name') == 'ACADEMIC INSTITUTION' or not data.get('school_name'):
            try:
                query = """
                query GetStudentSchool($admission_no: String!) {
                  students(where: {admission_no: {_eq: $admission_no}}, limit: 1) {
                    creator_admin {
                      school_name
                    }
                    admin {
                      school_name
                    }
                  }
                }
                """
                response = requests.post(
                    HASURA_URL,
                    json={'query': query, 'variables': {'admission_no': data['admission_no']}},
                    headers={'x-hasura-admin-secret': HASURA_ADMIN_SECRET},
                    timeout=5
                )
                if response.status_code == 200:
                    res_data = response.json()
                    students = res_data.get('data', {}).get('students', [])
                    if students:
                        student = students[0]
                        # Prioritize creator_admin, fallback to admin
                        school = None
                        if student.get('creator_admin'):
                            school = student['creator_admin']['school_name']
                        elif student.get('admin'):
                            school = student['admin']['school_name']
                        
                        if school:
                            data['school_name'] = school
                            print(f"DEBUG: Successfully fetched school name: {data['school_name']}")
                        else:
                            print(f"DEBUG: No school name found in relationships for admission_no: {data['admission_no']}")
                    else:
                        print(f"DEBUG: No student found for admission_no: {data['admission_no']}")
                else:
                    print(f"DEBUG: Hasura query failed with status {response.status_code}")
            except Exception as e:
                print(f"DEBUG: Error fetching school name from Hasura: {str(e)}")
        
        # Generate the markscard
        generator = MarkscardGenerator()
        pdf_buffer = generator.generate_pdf(data)
        
        # Return PDF file
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f"{data['student_name']}_markscard.pdf"
        )
        
    except Exception as e:
        print(f"Error generating markscard: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'markscard-generator'}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)