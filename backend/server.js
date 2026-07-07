require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express    = require('express');
const path       = require('path');
const cors       = require('cors');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

app.use(cors({ origin: isProd
  ? (process.env.CORS_ORIGIN || true)
  : ['http://localhost:5173', 'http://localhost:4173']
}));
app.use(express.json());

// Serve built frontend in production
if (isProd) {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
}

const transporter = nodemailer.createTransport({
  host:   process.env.BREVO_SMTP_HOST,
  port:   Number(process.env.BREVO_SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Champs requis manquants.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Email invalide.' });
  }

  const nom = `${firstName} ${lastName}`;
  const now = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' });

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D0618;color:#fff;padding:32px;border-radius:12px;">
      <h2 style="color:#A855F7;margin-top:0;">Nouveau message de contact — BrandX</h2>
      <hr style="border-color:#2d1a4a;margin:16px 0"/>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#C084FC;width:130px;vertical-align:top"><strong>Nom</strong></td><td>${escapeHtml(nom)}</td></tr>
        <tr><td style="padding:8px 0;color:#C084FC;vertical-align:top"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}" style="color:#A855F7">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#C084FC;vertical-align:top"><strong>Téléphone</strong></td><td>${phone ? escapeHtml(phone) : '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#C084FC;vertical-align:top"><strong>Sujet</strong></td><td>${subject ? escapeHtml(subject) : '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#C084FC;vertical-align:top"><strong>Message</strong></td><td style="white-space:pre-line">${escapeHtml(message)}</td></tr>
      </table>
      <hr style="border-color:#2d1a4a;margin:16px 0"/>
      <p style="font-size:12px;color:#6b7280">Reçu le : ${now}</p>
    </div>
  `;

  const text = `Nouveau contact BrandX\n\nNom: ${nom}\nEmail: ${email}\nTél: ${phone || '—'}\nSujet: ${subject || '—'}\n\nMessage:\n${message}\n\nReçu le: ${now}`;

  try {
    await transporter.sendMail({
      from:    '"BrandX Contact" <Tamazertywiem@gmail.com>',
      to:      ['Tamazertywiem@gmail.com', 'dalilahmer1212@gmail.com'],
      replyTo: email,
      subject: `Nouveau contact BrandX${subject ? ' : ' + subject : ''} — ${nom}`,
      text,
      html,
    });
    console.log(`[Contact] Email envoyé pour ${email}`);
    return res.json({ success: true, message: 'Message envoyé avec succès.' });
  } catch (err) {
    console.error('[Contact] Erreur envoi email :', err.message);
    return res.status(500).json({ success: false, message: "Échec de l'envoi. Veuillez réessayer." });
  }
});

app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Email invalide.' });
  }

  const now = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' });
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D0618;color:#fff;padding:32px;border-radius:12px;">
      <h2 style="color:#A855F7;margin-top:0;">Nouvel abonné Newsletter — BrandX</h2>
      <hr style="border-color:#2d1a4a;margin:16px 0"/>
      <p><span style="color:#C084FC"><strong>Email :</strong></span> <a href="mailto:${escapeHtml(email)}" style="color:#A855F7">${escapeHtml(email)}</a></p>
      <hr style="border-color:#2d1a4a;margin:16px 0"/>
      <p style="font-size:12px;color:#6b7280">Reçu le : ${now}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from:    '"BrandX Newsletter" <Tamazertywiem@gmail.com>',
      to:      ['Tamazertywiem@gmail.com', 'dalilahmer1212@gmail.com'],
      subject: `Nouvel abonné Newsletter BrandX — ${email}`,
      text:    `Nouvel abonné newsletter BrandX\nEmail: ${email}\nReçu le: ${now}`,
      html,
    });
    console.log(`[Newsletter] Abonnement reçu pour ${email}`);
    return res.json({ success: true, message: 'Merci pour votre inscription !' });
  } catch (err) {
    console.error('[Newsletter] Erreur :', err.message);
    return res.status(500).json({ success: false, message: "Échec de l'inscription. Réessayez." });
  }
});

// SPA fallback — serve index.html for all non-API routes
if (isProd) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Backend BrandX listening on http://localhost:${PORT}`));
}

module.exports = app;
