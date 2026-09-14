import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createCRMLead, updateCRMLead, attachFileToLead } from '@/lib/odoo';

const DEFAULT_NOTIFY_EMAIL = 'info@billabongsolar.com.au';

function getEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Handle Multipart for Step 3 (Uploads)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const leadId = (formData.get('leadId') as string) || `LEAD-${Date.now()}`;
      const odooLeadIdRaw = formData.get('odooLeadId') as string;
      const odooLeadId = odooLeadIdRaw ? parseInt(odooLeadIdRaw, 10) : null;
      const name = (formData.get('name') as string) || '';
      const phone = (formData.get('phone') as string) || '';
      const email = (formData.get('email') as string) || '';
      const address = (formData.get('address') as string) || '';
      const category = (formData.get('category') as string) || 'Residential Solar';

      const billFile = formData.get('billFile') as File | null;
      const switchboardFile = formData.get('switchboardFile') as File | null;

      const emailAttachments: Array<{ filename: string; content: Buffer; contentType?: string }> = [];

      if (billFile && billFile.size > 0) {
        const billBuffer = Buffer.from(await billFile.arrayBuffer());
        const filename = billFile.name || 'electricity-bill.pdf';
        emailAttachments.push({
          filename: `Bill-${filename}`,
          content: billBuffer,
          contentType: billFile.type,
        });

        if (odooLeadId) {
          try {
            await attachFileToLead(
              odooLeadId,
              `Bill-${filename}`,
              billBuffer.toString('base64'),
              billFile.type || 'application/octet-stream'
            );
          } catch (e) {
            console.error('Failed to attach bill to Odoo lead:', e);
          }
        }
      }

      if (switchboardFile && switchboardFile.size > 0) {
        const swBuffer = Buffer.from(await switchboardFile.arrayBuffer());
        const filename = switchboardFile.name || 'switchboard-photo.jpg';
        emailAttachments.push({
          filename: `Switchboard-${filename}`,
          content: swBuffer,
          contentType: switchboardFile.type,
        });

        if (odooLeadId) {
          try {
            await attachFileToLead(
              odooLeadId,
              `Switchboard-${filename}`,
              swBuffer.toString('base64'),
              switchboardFile.type || 'image/jpeg'
            );
          } catch (e) {
            console.error('Failed to attach switchboard photo to Odoo lead:', e);
          }
        }
      }

      // Send finalized email with attachments
      try {
        const transporter = getEmailTransporter();
        const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_TO || DEFAULT_NOTIFY_EMAIL;
        const sender = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@billabongsolar.com.au';

        const fileSummary = emailAttachments.length > 0
          ? emailAttachments.map((f) => `<li>📎 <strong>${f.filename}</strong> (${Math.round(f.content.length / 1024)} KB)</li>`).join('')
          : '<li><em>No files uploaded (customer skipped upload step)</em></li>';

        await transporter.sendMail({
          from: `"Billabong Chat Assistant" <${sender}>`,
          to: recipient,
          subject: `📎 [Chat Lead Step 3 Finalized]: ${name || 'Customer'} - ${category} (${phone})`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #171D4D;">
              <h2 style="color: #FF5E00; margin-bottom: 4px;">Chat Assistant Lead Complete with Documents</h2>
              <p style="margin-top: 0; color: #555;">Lead Reference: <strong>${leadId}</strong> ${odooLeadId ? `(Odoo Lead ID: #${odooLeadId})` : ''}</p>
              
              <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px; font-weight: bold; width: 140px; border-bottom: 1px solid #eee;">Category:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${category}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Customer Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email ? `<a href="mailto:${email}">${email}</a>` : 'Not provided'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Property Address:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${address || 'Not provided'}</td></tr>
              </table>

              <h4 style="margin-top: 20px; margin-bottom: 8px; color: #171D4D;">Uploaded Files Attached:</h4>
              <ul style="padding-left: 20px; color: #333;">
                ${fileSummary}
              </ul>

              <p style="font-size: 12px; color: #777; margin-top: 24px;">Lead source: Billabong Solar Web Chat Assistant (Route B - Enquiry)</p>
            </div>
          `,
          attachments: emailAttachments,
        });
      } catch (err) {
        console.error('Failed to send Step 3 email:', err);
      }

      return NextResponse.json({ success: true, leadId, odooLeadId });
    }

    // Handle JSON payloads for Step 1 (Create) and Step 2 (Update)
    const body = await request.json();
    const { action } = body;

    // STEP 1: Immediate Lead Creation (Phone is required)
    if (action === 'create') {
      const phone = (body.phone || '').trim();
      const name = (body.name || '').trim();
      const category = (body.category || 'Residential Solar').trim();

      if (!phone || phone.length < 8) {
        return NextResponse.json(
          { success: false, message: 'Please provide a valid phone number.' },
          { status: 400 }
        );
      }

      const leadId = `BLB-CHAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      let odooLeadId: number | null = null;

      // 1. Create Odoo Lead immediately
      try {
        odooLeadId = await createCRMLead({
          name: name || `Customer (${phone})`,
          email: '',
          phone: phone,
          address: 'Victoria, Australia',
          message: `[Chat Assistant Route B - Step 1 Lead Captured]\nCategory: ${category}\nPhone: ${phone}\nName: ${name || 'Not provided'}\nStatus: Saved immediately on Step 1 Continue.`,
          source: 'Website Chat Assistant (Route B)',
        });
      } catch (e) {
        console.error('Graceful degradation: Odoo lead creation failed:', e);
      }

      // 2. Dispatch immediate email to info@billabongsolar.com.au
      try {
        const transporter = getEmailTransporter();
        const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_TO || DEFAULT_NOTIFY_EMAIL;
        const sender = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@billabongsolar.com.au';

        await transporter.sendMail({
          from: `"Billabong Chat Assistant" <${sender}>`,
          to: recipient,
          subject: `⚡ [New Chat Lead - Step 1]: ${name || 'Customer'} - ${category} (${phone})`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #171D4D;">
              <h2 style="color: #FF5E00; margin-bottom: 4px;">⚡ Immediate Lead Captured (Step 1)</h2>
              <p style="margin-top: 0; color: #555;">Saved instantly on continue so this lead is never lost, even if the visitor stops here.</p>
              
              <table style="width: 100%; max-width: 500px; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px; font-weight: bold; width: 140px; border-bottom: 1px solid #eee;">Category:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${category}</strong></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong style="font-size: 16px; color: #FF5E00;"><a href="tel:${phone}">${phone}</a></strong></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Customer Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name || 'Not provided yet'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Lead Ref:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${leadId}</td></tr>
                ${odooLeadId ? `<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Odoo Lead ID:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">#${odooLeadId}</td></tr>` : ''}
              </table>

              <p style="margin-top: 20px; font-size: 13px; color: #666;">
                <em>Note: The visitor is currently progressing through optional Step 2 (Email/Address) and Step 3 (Bill/Switchboard uploads). Any further details submitted will follow shortly.</em>
              </p>
            </div>
          `,
        });
      } catch (err) {
        console.error('Failed to send Step 1 immediate notification email:', err);
      }

      return NextResponse.json({
        success: true,
        leadId,
        odooLeadId,
      });
    }

    // STEP 2: Update existing lead with Email & Address (Optional Nudge)
    if (action === 'update_step2') {
      const { leadId, odooLeadId, name, phone, category, email, address } = body;

      if (odooLeadId && typeof odooLeadId === 'number') {
        try {
          await updateCRMLead(odooLeadId, {
            email: email || '',
            address: address || '',
            message: `[Chat Assistant Route B - Step 2 Update]\nEmail: ${email || 'Skipped'}\nAddress: ${address || 'Skipped'}`,
          });
        } catch (e) {
          console.error('Failed to update Odoo lead on Step 2:', e);
        }
      }

      // Send update email only if they entered email or address
      if (email || address) {
        try {
          const transporter = getEmailTransporter();
          const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_TO || DEFAULT_NOTIFY_EMAIL;
          const sender = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@billabongsolar.com.au';

          await transporter.sendMail({
            from: `"Billabong Chat Assistant" <${sender}>`,
            to: recipient,
            subject: `📝 [Chat Lead Update - Step 2]: ${name || 'Customer'} (${phone})`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #171D4D;">
                <h3 style="color: #FF5E00; margin-bottom: 4px;">Chat Lead Updated (Step 2 Details)</h3>
                <p style="margin-top: 0; color: #555;">Lead Reference: <strong>${leadId}</strong></p>
                
                <table style="width: 100%; max-width: 500px; border-collapse: collapse; margin-top: 12px;">
                  <tr><td style="padding: 8px; font-weight: bold; width: 140px; border-bottom: 1px solid #eee;">Customer:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name || 'Customer'} (<a href="tel:${phone}">${phone}</a>)</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email ? `<a href="mailto:${email}">${email}</a>` : 'Skipped'}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Address:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${address || 'Skipped'}</td></tr>
                </table>
              </div>
            `,
          });
        } catch (err) {
          console.error('Failed to send Step 2 update email:', err);
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action provided.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Chat Lead API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
