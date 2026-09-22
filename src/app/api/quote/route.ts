import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createCRMLead, updateCRMLead } from '@/lib/odoo';

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
    const body = await request.json();
    const { action } = body;

    const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_TO || DEFAULT_NOTIFY_EMAIL;
    const sender = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@billabongsolar.com.au';

    // =========================================================================
    // STEP 1: Immediate Lead Creation (Name, Phone, Email & Quote Type)
    // Saved the moment customer clicks Continue, drop-off proof!
    // =========================================================================
    if (action === 'create') {
      const name = (body.name || '').trim();
      const phone = (body.phone || '').trim();
      const email = (body.email || '').trim();
      const quoteType = body.quoteType === 'commercial' ? 'Commercial Solar' : 'Home Solar';

      if (!name) {
        return NextResponse.json({ success: false, message: 'Please enter your name.' }, { status: 400 });
      }
      if (!phone || phone.replace(/\D/g, '').length < 8) {
        return NextResponse.json({ success: false, message: 'Please enter a valid phone number.' }, { status: 400 });
      }
      if (!email || !email.includes('@')) {
        return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
      }

      const leadId = `BLB-QTE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      let odooLeadId: number | null = null;

      // 1. Immediately create lead in Odoo CRM
      try {
        odooLeadId = await createCRMLead({
          name: name,
          email: email,
          phone: phone,
          address: 'Victoria, Australia',
          message: `[Website Quote - Step 1 Captured Lead]\nCategory: ${quoteType}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nStatus: Captured immediately on Step 1 Continue so customer contact is never lost even if they do not complete subsequent questions.`,
          source: `Website Quote Wizard (Step 1 Initial Lead)`,
        });
        console.log('[Quote API] Odoo lead created successfully on Step 1:', odooLeadId);
      } catch (odooErr) {
        console.error('[Quote API] Odoo CRM lead creation error (graceful degradation):', odooErr);
      }

      // 2. Immediately send notification email to the sales team
      try {
        const transporter = getEmailTransporter();
        await transporter.sendMail({
          from: `"Billabong Solar Quotes" <${sender}>`,
          to: recipient,
          subject: `⚡ [Early Quote Lead]: ${name} (${phone}) - ${quoteType}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #171D4D; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #FF5E00; padding: 18px 24px; color: white;">
                <h2 style="margin: 0; font-size: 20px;">⚡ New Early Quote Lead Captured</h2>
                <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.95;">Customer filled contact info on Step 1 and moved to property details.</p>
              </div>
              <div style="padding: 24px;">
                <p style="color: #4b5563; font-size: 14px; margin-top: 0;">
                  This lead was saved instantly. Even if the customer leaves the site before completing the remaining steps, you have their contact details:
                </p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #374151;">Quote Type:</td>
                    <td style="padding: 10px 0; color: #FF5E00; font-weight: bold; font-size: 15px;">${quoteType}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Customer Name:</td>
                    <td style="padding: 10px 0; color: #111827; font-weight: bold;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Phone Number:</td>
                    <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #FF5E00; font-weight: bold; text-decoration: none; font-size: 16px;">${phone}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Email Address:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Reference:</td>
                    <td style="padding: 10px 0; font-family: monospace; color: #6b7280;">${leadId} ${odooLeadId ? `(Odoo Lead ID: #${odooLeadId})` : ''}</td>
                  </tr>
                </table>
                <div style="margin-top: 24px; padding: 12px; background-color: #f9fafb; border-radius: 6px; font-size: 12px; color: #6b7280;">
                  Visitor is currently on Step 2 filling out property and power bill specifics. If they complete it, an updated confirmation will follow.
                </div>
              </div>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error('[Quote API] Step 1 immediate notification email error:', mailErr);
      }

      return NextResponse.json({
        success: true,
        leadId,
        odooLeadId,
      });
    }

    // =========================================================================
    // STEP 2: Full Quote Submission (Property / Commercial Details)
    // =========================================================================
    if (action === 'complete') {
      const {
        leadId,
        odooLeadId,
        name,
        phone,
        email,
        quoteType,
        propertyType,
        billAmount,
        systemInterest,
        powerSupply,
        address,
        notes,
      } = body;

      const isCommercial = quoteType === 'commercial';
      const quoteTypeLabel = isCommercial ? 'Commercial Solar' : 'Home Solar';
      const cleanAddress = (address || '').trim() || 'Victoria, Australia';

      const fullSummaryText = `[Website Quote - Completed Submission]
Category: ${quoteTypeLabel}
Customer: ${name}
Phone: ${phone}
Email: ${email}
Installation Address: ${cleanAddress}
${isCommercial ? `Building / Facility Type: ${propertyType || 'Not specified'}` : `Home Property Type: ${propertyType || 'Not specified'}`}
Estimated Electricity Bill: ${billAmount || 'Not specified'}
${isCommercial ? `Power Supply: ${powerSupply || 'Not specified'}` : `System Interest: ${systemInterest || 'Not specified'}`}
${notes ? `Additional Notes: ${notes}` : ''}
Reference: ${leadId || 'N/A'}`;

      // 1. Update Odoo CRM Lead or create if needed
      if (odooLeadId && typeof odooLeadId === 'number') {
        try {
          await updateCRMLead(odooLeadId, {
            name: `${quoteTypeLabel} Quote - ${name}`,
            email: email,
            phone: phone,
            address: cleanAddress,
            message: fullSummaryText,
          });
          console.log('[Quote API] Updated existing Odoo lead:', odooLeadId);
        } catch (odooErr) {
          console.error('[Quote API] Failed to update Odoo CRM lead:', odooErr);
        }
      } else {
        // Fallback: create fresh Odoo lead
        try {
          await createCRMLead({
            name: `${quoteTypeLabel} Quote - ${name}`,
            email: email,
            phone: phone,
            address: cleanAddress,
            message: fullSummaryText,
            source: `Website Quote Wizard (Completed)`,
          });
        } catch (odooErr) {
          console.error('[Quote API] Failed to create completed Odoo lead:', odooErr);
        }
      }

      // 2. Dispatch full completed notification email
      try {
        const transporter = getEmailTransporter();
        await transporter.sendMail({
          from: `"Billabong Solar Quotes" <${sender}>`,
          to: recipient,
          subject: `📋 [Full Quote Request Received]: ${name} (${phone}) - ${quoteTypeLabel}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #171D4D; max-width: 640px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #171D4D; padding: 20px 24px; color: white;">
                <h2 style="margin: 0; font-size: 22px; color: #FF5E00;">📋 Full Solar Quote Request Received</h2>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #d1d5db;">Customer has completed all steps of the website quote wizard.</p>
              </div>
              <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; width: 160px; color: #374151;">Quote Type:</td>
                    <td style="padding: 10px 0; color: #FF5E00; font-weight: bold; font-size: 16px;">${quoteTypeLabel}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Customer Name:</td>
                    <td style="padding: 10px 0; color: #111827; font-weight: bold; font-size: 15px;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Phone:</td>
                    <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #FF5E00; font-weight: bold; text-decoration: none; font-size: 16px;">${phone}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Installation Address:</td>
                    <td style="padding: 10px 0; color: #111827;">${cleanAddress}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">${isCommercial ? 'Facility / Building' : 'Property Type'}:</td>
                    <td style="padding: 10px 0; color: #111827;">${propertyType || 'Not specified'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Estimated Power Bill:</td>
                    <td style="padding: 10px 0; color: #111827; font-weight: bold;">${billAmount || 'Not specified'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">${isCommercial ? 'Power Supply' : 'System Interest'}:</td>
                    <td style="padding: 10px 0; color: #111827;">${(isCommercial ? powerSupply : systemInterest) || 'Not specified'}</td>
                  </tr>
                  ${notes ? `
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Additional Notes:</td>
                    <td style="padding: 10px 0; color: #111827;">${notes}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #374151;">Lead Reference:</td>
                    <td style="padding: 10px 0; font-family: monospace; color: #6b7280;">${leadId || 'N/A'} ${odooLeadId ? `(Odoo Lead ID: #${odooLeadId})` : ''}</td>
                  </tr>
                </table>

                <div style="margin-top: 24px; padding: 14px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; font-size: 13px; color: #065f46;">
                  ✅ <strong>Next Action:</strong> System sizing assessment ready for review by the engineering & sales team.
                </div>
              </div>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error('[Quote API] Completed notification email error:', mailErr);
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid action provided.' }, { status: 400 });
  } catch (error) {
    console.error('[Quote API] Unexpected server error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
