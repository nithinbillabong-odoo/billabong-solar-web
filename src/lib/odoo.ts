export interface OdooLeadData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  source?: string;
}

export interface OdooResponse {
  id?: number | null;
  error?: {
    code: number;
    message: string;
    data: any;
  };
}

const ODOO_URL = (process.env.ODOO_URL || '').replace(/\/+$/, '');
const ODOO_DB = process.env.ODOO_DB || '';
const ODOO_USERNAME = process.env.ODOO_USERNAME || '';
const ODOO_API_KEY = process.env.ODOO_API_KEY || '';

export async function authenticateOdoo(): Promise<number | null> {
  try {
    const response = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'common',
          method: 'authenticate',
          args: [ODOO_DB, ODOO_USERNAME, ODOO_API_KEY, {}],
        },
        id: Math.floor(Math.random() * 1000000000),
      }),
    });

    const data = await response.json();
    if (data.error) {
      console.error('Odoo Authentication Error:', data.error);
      return null;
    }
    return data.result as number;
  } catch (error) {
    console.error('Failed to authenticate with Odoo:', error);
    return null;
  }
}

export async function createCRMLead(data: OdooLeadData): Promise<number> {
  const uid = await authenticateOdoo();
  if (!uid) {
    throw new Error('Failed to authenticate with Odoo');
  }

  try {
    const response = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'object',
          method: 'execute_kw',
          args: [
            ODOO_DB,
            uid,
            ODOO_API_KEY,
            'crm.lead',
            'create',
            [{
              name: `Website Lead - ${data.name}`,
              contact_name: data.name,
              email_from: data.email,
              phone: data.phone,
              street: data.address,
              description: data.message || '',
              type: 'opportunity',
            }],
          ],
        },
        id: Math.floor(Math.random() * 1000000000),
      }),
    });

    const result = await response.json();
    if (result.error) {
      console.error('Odoo Create Lead Error:', result.error);
      throw new Error(result.error.message || 'Failed to create lead in Odoo');
    }
    
    const leadIds = result.result;
    return Array.isArray(leadIds) ? leadIds[0] : leadIds;
  } catch (error) {
    console.error('Error creating CRM lead:', error);
    throw error;
  }
}

export async function sendLeadEmail(leadId: number | null, data: OdooLeadData): Promise<void> {
  console.log(`[Email Mock] Logging email for lead ${leadId || 'Failed-Odoo-Lead'}`, data);
  // Implementation will be handled in the route using nodemailer
}
