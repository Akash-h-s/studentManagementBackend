"""
AI-Powered Markscard Generator Backend
This Flask API generates professional PDF markscards using AI for design and layout.
Now integrates Google Gemini 2.0 Flash for intelligent marks analysis and summaries.
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
import json
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Hasura Configuration
HASURA_URL = os.environ.get("HASURA_ENDPOINT", "http://localhost:8085/v1/graphql")
HASURA_ADMIN_SECRET = os.environ.get("HASURA_ADMIN_SECRET", "myadminsecretkey")

# Google Gemini AI Configuration — using new google-genai SDK
from google import genai

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_AVAILABLE = False
gemini_client = None

# List of models to try in order (fallback chain)
GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite']

if GEMINI_API_KEY:
    gemini_client = genai.Client(api_key=GEMINI_API_KEY)
    GEMINI_AVAILABLE = True
    print(f"Google Gemini AI initialized (primary: {GEMINI_MODELS[0]})")
else:
    print("GEMINI_API_KEY not found. AI features disabled.")

import time

def call_gemini_with_retry(prompt, max_retries=2):
    """Call Gemini with automatic retry and model fallback on 429 errors."""
    last_error = None
    
    for model_name in GEMINI_MODELS:
        for attempt in range(max_retries):
            try:
                result = gemini_client.models.generate_content(
                    model=model_name,
                    contents=prompt
                )
                print(f"AI response from {model_name} (attempt {attempt+1})")
                return result
            except Exception as e:
                error_str = str(e)
                last_error = e
                
                if '429' in error_str:
                    wait_time = (attempt + 1) * 5  # 5s, 10s
                    print(f"Rate limited on {model_name} (attempt {attempt+1}). Waiting {wait_time}s...")
                    time.sleep(wait_time)
                else:
                    print(f"Error on {model_name}: {error_str[:100]}")
                    break
        
        print(f"Trying next model...")
    
    raise last_error or Exception("All Gemini models failed")

# Legacy: Anthropic AI import (optional)
try:
    from anthropic import Anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False

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
                # Step 1: Get created_by_admin_id from student
                query_student = """
                query GetStudentAdminId($admission_no: String!) {
                  students(where: {admission_no: {_eq: $admission_no}}, limit: 1) {
                    created_by_admin_id
                  }
                }
                """
                
                resp_student = requests.post(
                    HASURA_URL,
                    json={'query': query_student, 'variables': {'admission_no': data['admission_no']}},
                    headers={'x-hasura-admin-secret': HASURA_ADMIN_SECRET},
                    timeout=5
                )
                
                if resp_student.status_code == 200:
                    student_data = resp_student.json().get('data', {}).get('students', [])
                    if student_data:
                        admin_id = student_data[0].get('created_by_admin_id')
                        
                        if admin_id:
                            # Step 2: Get school_name from admins table
                            query_school = """
                            query GetSchoolName($id: Int!) {
                              admins_by_pk(id: $id) {
                                school_name
                              }
                            }
                            """
                            
                            resp_school = requests.post(
                                HASURA_URL,
                                json={'query': query_school, 'variables': {'id': admin_id}},
                                headers={'x-hasura-admin-secret': HASURA_ADMIN_SECRET},
                                timeout=5
                            )
                            
                            if resp_school.status_code == 200:
                                school_data = resp_school.json().get('data', {}).get('admins_by_pk', {})
                                if school_data and school_data.get('school_name'):
                                    data['school_name'] = school_data['school_name']
                                    print(f"DEBUG: Successfully fetched school name from admin ID {admin_id}: {data['school_name']}")
                                else:
                                    print(f"DEBUG: No school name found for admin ID {admin_id}")
                        else:
                            print(f"DEBUG: created_by_admin_id is null for admission_no: {data['admission_no']}")
                    else:
                        print(f"DEBUG: No student found for admission_no: {data['admission_no']}")
                else:
                    print(f"DEBUG: Hasura student query failed with status {resp_student.status_code}")
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
    return jsonify({'status': 'healthy', 'service': 'markscard-generator', 'ai_enabled': GEMINI_AVAILABLE}), 200


# ═══════════════════════════════════════════════════════════════
# 🤖 AI-POWERED ENDPOINTS (Google Gemini 2.0 Flash)
# ═══════════════════════════════════════════════════════════════

@app.route('/api/ai/generate-summary', methods=['POST'])
def generate_ai_summary():
    """
    Generate an AI-powered natural language summary of a student's marks card.
    Expects the same MarkscardData format used for PDF generation.
    """
    if not GEMINI_AVAILABLE:
        return jsonify({'error': 'AI features are not available. GEMINI_API_KEY not configured.'}), 503

    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Build marks detail string for the prompt
        marks_detail = "\n".join([
            f"  - {m['subject']}: {m['marks_obtained']}/{m['max_marks']} ({m['percentage']}%) — Grade: {m['grade']}"
            + (f" — Remarks: {m['remarks']}" if m.get('remarks') else "")
            for m in data.get('marks', [])
        ])

        prompt = f"""You are an experienced academic advisor analyzing a student's exam performance. 
Generate a comprehensive, encouraging, and insightful performance summary.

STUDENT DETAILS:
- Name: {data.get('student_name', 'Student')}
- Admission No: {data.get('admission_no', 'N/A')}
- Exam: {data.get('exam_name', 'Exam')}
- School: {data.get('school_name', 'School')}

MARKS BREAKDOWN:
{marks_detail}

OVERALL:
- Total: {data.get('total_marks', 0)}/{data.get('max_marks', 0)}
- Overall Percentage: {data.get('overall_percentage', '0')}%

INSTRUCTIONS:
Respond with ONLY a valid JSON object (no markdown, no code fences, no extra text). Use this exact structure:
{{
  "overall_assessment": "A 2-3 sentence overview of the student's performance",
  "strengths": ["Subject/area where student excelled (with specific marks)", "Another strength"],
  "areas_for_improvement": ["Subject/area needing work (with specific marks)", "Another area"],
  "suggestions": ["Specific, actionable study tip", "Another suggestion", "A third suggestion"],
  "motivational_note": "A personalized, encouraging message for the student",
  "performance_tier": "Excellent|Good|Average|Needs Improvement",
  "highlight_stats": {{
    "best_subject": "Subject name",
    "best_score": "XX/XX",
    "subjects_above_90": 0,
    "subjects_below_50": 0
  }}
}}

Be specific with marks and percentages. Be encouraging but honest. Keep suggestions actionable and age-appropriate for school students."""

        result = call_gemini_with_retry(prompt)
        response_text = result.text.strip()
        
        # Clean up response — remove markdown code fences if present
        if response_text.startswith('```'):
            response_text = response_text.split('\n', 1)[1] if '\n' in response_text else response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        # Parse JSON response
        try:
            summary_data = json.loads(response_text)
        except json.JSONDecodeError:
            # If Gemini returns non-JSON, wrap it
            summary_data = {
                "overall_assessment": response_text,
                "strengths": [],
                "areas_for_improvement": [],
                "suggestions": [],
                "motivational_note": "",
                "performance_tier": "Good",
                "highlight_stats": {}
            }

        return jsonify({'summary': summary_data}), 200

    except Exception as e:
        print(f"Error generating AI summary: {str(e)}")
        return jsonify({'error': f'AI summary generation failed: {str(e)}'}), 500


@app.route('/api/ai/review-marks', methods=['POST'])
def review_marks():
    """
    AI-powered marks review for teachers — flags anomalies, errors, and suspicious patterns.
    Expects: { students: [...], marks: {...}, subject: "...", exam: "..." }
    """
    if not GEMINI_AVAILABLE:
        return jsonify({'error': 'AI features are not available. GEMINI_API_KEY not configured.'}), 503

    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        students = data.get('students', [])
        marks_map = data.get('marks', {})
        subject = data.get('subject', 'Unknown')
        exam = data.get('exam', 'Unknown')

        # Build marks data string
        marks_detail = []
        for student in students:
            sid = str(student.get('id', ''))
            mark = marks_map.get(sid, {})
            obtained = mark.get('marks_obtained', 'N/A')
            max_marks = mark.get('max_marks', 100)
            grade = mark.get('grade', 'N/A')
            marks_detail.append(f"  - {student.get('name', 'Unknown')} (ID: {sid}): {obtained}/{max_marks} — Grade: {grade}")

        marks_text = "\n".join(marks_detail) if marks_detail else "No marks data available"

        prompt = f"""You are a quality assurance expert reviewing marks data before submission.
Analyze the following marks for potential issues.

CONTEXT:
- Subject: {subject}
- Exam: {exam}
- Total Students: {len(students)}

MARKS DATA:
{marks_text}

INSTRUCTIONS:
Check for these issues:
1. Suspiciously identical marks across multiple students
2. Marks that are drastic outliers compared to the class average
3. Missing or incomplete entries (marks shown as N/A)
4. Grade-marks mismatches (e.g., 95 marks but grade is C)
5. Any marks exceeding maximum marks
6. Unusual patterns (e.g., all marks ending in 0 or 5)

Respond with ONLY a valid JSON object (no markdown, no code fences):
{{
  "overall_status": "clean|warnings|critical",
  "issues": [
    {{
      "severity": "critical|warning|info",
      "type": "anomaly_type",
      "message": "Description of the issue",
      "affected_students": ["Student Name 1", "Student Name 2"]
    }}
  ],
  "statistics": {{
    "class_average": 0.0,
    "highest": 0,
    "lowest": 0,
    "pass_rate": "XX%",
    "total_reviewed": 0,
    "missing_entries": 0
  }},
  "recommendation": "A brief overall recommendation for the teacher"
}}

If everything looks good, return overall_status as "clean" with an empty issues array and a positive recommendation."""

        result = call_gemini_with_retry(prompt)
        response_text = result.text.strip()

        # Clean markdown fences
        if response_text.startswith('```'):
            response_text = response_text.split('\n', 1)[1] if '\n' in response_text else response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        response_text = response_text.strip()

        try:
            review_data = json.loads(response_text)
        except json.JSONDecodeError:
            review_data = {
                "overall_status": "warnings",
                "issues": [{"severity": "info", "type": "parse_error", "message": response_text, "affected_students": []}],
                "statistics": {},
                "recommendation": "Could not parse AI response. Please review manually."
            }

        return jsonify({'review': review_data}), 200

    except Exception as e:
        print(f"Error in AI marks review: {str(e)}")
        return jsonify({'error': f'AI marks review failed: {str(e)}'}), 500


@app.route('/api/ai/class-analysis', methods=['POST'])
def class_analysis():
    """
    AI-powered class-wide performance analysis for teachers.
    Expects: { students: [...], marks: {...}, subject: "...", exam: "...", className: "...", section: "..." }
    """
    if not GEMINI_AVAILABLE:
        return jsonify({'error': 'AI features are not available. GEMINI_API_KEY not configured.'}), 503

    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        students = data.get('students', [])
        marks_map = data.get('marks', {})
        subject = data.get('subject', 'Unknown')
        exam = data.get('exam', 'Unknown')
        class_name = data.get('className', 'Unknown')
        section = data.get('section', 'Unknown')

        # Build marks data
        marks_detail = []
        for student in students:
            sid = str(student.get('id', ''))
            mark = marks_map.get(sid, {})
            obtained = mark.get('marks_obtained', 'N/A')
            max_marks = mark.get('max_marks', 100)
            grade = mark.get('grade', 'N/A')
            marks_detail.append(f"  - {student.get('name', 'Unknown')}: {obtained}/{max_marks} (Grade: {grade})")

        marks_text = "\n".join(marks_detail) if marks_detail else "No marks data available"

        prompt = f"""You are an expert educational analyst. Provide a comprehensive analysis of this class's performance.

CLASS DETAILS:
- Class: {class_name}-{section}
- Subject: {subject}
- Exam: {exam}
- Total Students: {len(students)}

INDIVIDUAL MARKS:
{marks_text}

INSTRUCTIONS:
Respond with ONLY a valid JSON object (no markdown, no code fences):
{{
  "class_overview": "2-3 sentence summary of class performance",
  "grade_distribution": {{
    "A+": 0, "A": 0, "B+": 0, "B": 0, "C": 0, "D": 0, "F": 0
  }},
  "statistics": {{
    "mean": 0.0,
    "median": 0.0,
    "highest": {{ "score": 0, "student": "Name" }},
    "lowest": {{ "score": 0, "student": "Name" }},
    "pass_rate": "XX%",
    "distinction_rate": "XX%"
  }},
  "top_performers": ["Name (Score)", "Name (Score)", "Name (Score)"],
  "students_needing_attention": ["Name (Score) - brief reason", "Name (Score) - brief reason"],
  "insights": [
    "Key insight about the class performance",
    "Another observation",
    "A trend or pattern noticed"
  ],
  "teaching_recommendations": [
    "Specific suggestion for the teacher",
    "Another teaching strategy",
    "A resource or approach suggestion"
  ],
  "overall_rating": "Excellent|Good|Average|Below Average"
}}

Be data-driven, specific with numbers, and provide actionable teaching recommendations."""

        result = call_gemini_with_retry(prompt)
        response_text = result.text.strip()

        # Clean markdown fences
        if response_text.startswith('```'):
            response_text = response_text.split('\n', 1)[1] if '\n' in response_text else response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        response_text = response_text.strip()

        try:
            analysis_data = json.loads(response_text)
        except json.JSONDecodeError:
            analysis_data = {
                "class_overview": response_text,
                "grade_distribution": {},
                "statistics": {},
                "top_performers": [],
                "students_needing_attention": [],
                "insights": [],
                "teaching_recommendations": [],
                "overall_rating": "Good"
            }

        return jsonify({'analysis': analysis_data}), 200

    except Exception as e:
        print(f"Error in AI class analysis: {str(e)}")
        return jsonify({'error': f'AI class analysis failed: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)