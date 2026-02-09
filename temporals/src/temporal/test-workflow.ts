import { Connection, Client } from '@temporalio/client';
import { uploadWorkflow } from '../temporal/workflows/uploadWorkflow';
import * as fs from 'fs';
import * as path from 'path';

async function testStudentUpload() {
  const connection = await Connection.connect({
    address: 'localhost:7233',
  });

  const client = new Client({ connection });

  // Create a sample Excel file in base64 (or read an existing one)
  // For testing, you can use a simple base64 string or read a real file
  
  // Option 1: Read an existing Excel file
  // const filePath = path.join(__dirname, 'sample-students.xlsx');
  // const fileBuffer = fs.readFileSync(filePath);
  // const fileBase64 = fileBuffer.toString('base64');

  // Option 2: Use a mock base64 for testing (minimal Excel file)
  const fileBase64 = 'UEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAAAAJAAAAeGwvX3JlbHMvLnJlbHONkMEKwjAQRO+C/1DYe5s9eCpS8QMEv2CbbqFJNiFbhf69oYLiwYsHl5nHm8lkVzuOol0zIqkNqX/VRzFb0u+K7F7tOkRzEzB6C0LoB3EJOZmQQOmRZLj7rJhVqE5KxKBrU5U5pHPqRU1XZLrWPGvL8qUqxZN6VqVGIvLJJtBqUqUl6VanxV5vG0yKL+4gRfX9AL8BAAD//wMAUEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAABAAAAB4bC9fcmVscy93b3JrYm9vay54bWyNj0sKwjAURfeCq4TsN+kHlPpZgFtwAyXJSw1NE/KK0t0bHUhFcODMPefchTOvp+4RTGqDVKjk7AGCVg44qLbwdD7lO4CoTYBBUbBcQ5AWFvsDAA==';

  console.log('🚀 Starting Student Upload Workflow...');

  const handle = await client.workflow.start(uploadWorkflow, {
    taskQueue: 'upload-queue',
    workflowId: `student-upload-${Date.now()}`,
    args: [{
      type: 'student' as const,
      fileBase64: fileBase64,
      filename: 'test-students.xlsx',
      className: 'Class 10',
      section: 'A',
    }],
  });

  console.log(`✅ Workflow started!`);
  console.log(`📋 Workflow ID: ${handle.workflowId}`);
  console.log(`🌐 View in Temporal UI: http://localhost:8233/namespaces/default/workflows/${handle.workflowId}`);
  console.log(`⏳ Waiting for workflow to complete...`);

  try {
    const result = await handle.result();
    console.log('✅ Workflow completed successfully!');
    console.log('📊 Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Workflow failed:', error);
  }
}

async function testTeacherUpload() {
  const connection = await Connection.connect({
    address: 'localhost:7233',
  });

  const client = new Client({ connection });

  const fileBase64 = 'UEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAAAAJAAAAeGwvX3JlbHMvLnJlbHONkMEKwjAQRO+C/1DYe5s9eCpS8QMEv2CbbqFJNiFbhf69oYLiwYsHl5nHm8lkVzuOol0zIqkNqX/VRzFb0u+K7F7tOkRzEzB6C0LoB3EJOZmQQOmRZLj7rJhVqE5KxKBrU5U5pHPqRU1XZLrWPGvL8qUqxZN6VqVGIvLJJtBqUqUl6VanxV5vG0yKL+4gRfX9AL8BAAD//wMAUEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAABAAAAB4bC9fcmVscy93b3JrYm9vay54bWyNj0sKwjAURfeCq4TsN+kHlPpZgFtwAyXJSw1NE/KK0t0bHUhFcODMPefchTOvp+4RTGqDVKjk7AGCVg44qLbwdD7lO4CoTYBBUbBcQ5AWFvsDAA==';

  console.log('🚀 Starting Teacher Upload Workflow...');

  const handle = await client.workflow.start(uploadWorkflow, {
    taskQueue: 'upload-queue',
    workflowId: `teacher-upload-${Date.now()}`,
    args: [{
      type: 'teacher' as const,
      fileBase64: fileBase64,
      filename: 'test-teachers.xlsx',
    }],
  });

  console.log(`✅ Workflow started!`);
  console.log(`📋 Workflow ID: ${handle.workflowId}`);
  console.log(`🌐 View in Temporal UI: http://localhost:8233/namespaces/default/workflows/${handle.workflowId}`);
  console.log(`⏳ Waiting for workflow to complete...`);

  try {
    const result = await handle.result();
    console.log('✅ Workflow completed successfully!');
    console.log('📊 Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Workflow failed:', error);
  }
}

// Run the test
const testType = process.argv[2] || 'student'; // Get argument from command line

if (testType === 'teacher') {
  testTeacherUpload().catch(console.error);
} else {
  testStudentUpload().catch(console.error);
}