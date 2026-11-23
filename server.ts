import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

interface ValidatedContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

// Keep recent validated inquiries in memory when no external relay is configured
const recentInquiries: ValidatedContact[] = [];

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      emailRelayConfigured: Boolean(process.env.CONTACT_WEBHOOK_URL?.trim()),
    });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const body = (req.body ?? {}) as ContactPayload;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    const fieldErrors: Record<string, string> = {};
    if (name.length < 2) {
      fieldErrors.name = 'Please enter your first and last name.';
    } else if (name.length > 120) {
      fieldErrors.name = 'Name must be 120 characters or fewer.';
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      fieldErrors.email = 'Please enter a valid email address.';
    }

    if (subject.length < 2) {
      fieldErrors.subject = 'Please provide a brief subject for your enquiry.';
    } else if (subject.length > 180) {
      fieldErrors.subject = 'Subject must be 180 characters or fewer.';
    }

    if (message.length < 10) {
      fieldErrors.message = 'Please enter a message of at least 10 characters.';
    } else if (message.length > 4000) {
      fieldErrors.message = 'Message must be 4,000 characters or fewer.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({
        ok: false,
        error: 'Please check the highlighted fields and try again.',
        fieldErrors,
      });
    }

    const record: ValidatedContact = {
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

    if (webhookUrl) {
      try {
        const upstream = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(record),
        });

        if (!upstream.ok) {
          return res.status(502).json({
            ok: false,
            error:
              'The configured email relay could not accept this message right now. Please email us directly at hello@thelaunchpadcommunity.com.',
          });
        }

        return res.status(200).json({
          ok: true,
          delivery: 'forwarded',
          submittedAt: record.submittedAt,
        });
      } catch {
        return res.status(502).json({
          ok: false,
          error:
            'Unable to reach the configured email relay. Please email us directly at hello@thelaunchpadcommunity.com.',
        });
      }
    }

    // Honest local capture when no external email provider / webhook is configured
    recentInquiries.push(record);
    if (recentInquiries.length > 100) {
      recentInquiries.shift();
    }

    return res.status(200).json({
      ok: true,
      delivery: 'unconfigured_relay',
      submittedAt: record.submittedAt,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Launchpad Community server listening on http://localhost:${PORT}`);
  });
}

startServer();
