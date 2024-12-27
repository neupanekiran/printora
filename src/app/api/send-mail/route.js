import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const email = formData.get('email');
    const shop = formData.get('shop');
    const printType = formData.get('printType');
    const instructions = formData.get('instructions');

    if (!file || !email) {
      return NextResponse.json({ error: 'File and email are required' }, { status: 400 });
    }

    // Ensure email configuration
    const { SMTP_USER, SMTP_PASS, EMAIL_USER } = process.env;

    if (!SMTP_USER || !SMTP_PASS || !EMAIL_USER) {
      return NextResponse.json({ error: 'Email environment variables are not set properly' }, { status: 587 });
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const fileContent = Buffer.from(buffer);

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Email body content
    const emailBody = `
      <h1>Print Order Details</h1>
      <p><strong>Shop:</strong> ${shop}</p>
      <p><strong>Print Type:</strong> ${printType === 'color' ? 'Color' : 'Black & White'}</p>
      <p><strong>Instructions:</strong> ${instructions || 'No additional instructions provided.'}</p>
      <p>Please find the uploaded file attached below.</p>
    `;

    // Send the email
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: `New Print Order for ${shop}`,
      html: emailBody,
      attachments: [
        {
          filename: file.name,
          content: fileContent,
        },
      ],
    });

    return NextResponse.json({ message: 'File uploaded and email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}