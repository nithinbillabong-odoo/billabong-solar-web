import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createCRMLead, sendLeadEmail } from '@/lib/odoo';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  address: z.string().optional().nullable().transform((v) => (v && v.trim().length > 0 ? v.trim() : 'Victoria, Australia')),
  message: z.string().optional().nullable().transform((v) => v || ''),
});

export async function POST(request: NextRequest) {
  // Rate limiting placeholder
  // const ip = request.ip ?? '127.0.0.1';
  // await rateLimit(ip);

  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    let odooLeadId: number | null = null;
    try {
      odooLeadId = await createCRMLead({
        ...validatedData,
        source: 'Website Contact Form'
      });
      console.log('Successfully created Odoo lead:', odooLeadId);
    } catch (odooError) {
      console.error('Odoo Lead creation failed (graceful degradation):', odooError);
      // We don't throw here, we continue to send the email
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const htmlContent = `
        <h2>New Website Lead</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Address:</strong> ${validatedData.address}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message || 'No message provided.'}</p>
        <p><small>Odoo Lead ID: ${odooLeadId || 'Creation Failed'}</small></p>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.SMTP_TO || process.env.SMTP_USER,
        subject: `New Contact Form Lead: ${validatedData.name}`,
        html: htmlContent,
      });
      
      // Also log the action as requested in lib/odoo
      await sendLeadEmail(odooLeadId, validatedData);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      if (!odooLeadId) {
         throw new Error("Both Odoo and Email failed");
      }
    }

    return NextResponse.json(
      { success: true, message: 'Thank you! We will contact you soon.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstMessage = error.errors[0]?.message || 'Please check the required fields.';
      return NextResponse.json(
        { success: false, message: firstMessage, errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
