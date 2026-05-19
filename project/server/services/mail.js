const nodemailer = require('nodemailer');

let transporter = null;

function emailLayout(inner) {
  return `<motionEmailWrapper>${inner}</motionEmailWrapper>`.replace(
    /<motionEmailWrapper>/,
    '<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;">'
  ).replace(/<\/motionEmailWrapper>/, '</div>');
}

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });

  return transporter;
}

async function sendMail({ to, subject, html, text }) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || 'noreply@medicare.ps';
  const transport = getTransporter();

  if (!transport) {
    console.log(`📧 [mail skipped — no SMTP] To: ${to} | ${subject}`);
    return { ok: true, skipped: true };
  }

  await transport.sendMail({ from, to, subject, html, text });
  return { ok: true, skipped: false };
}

function applicationAcceptedEmail(app) {
  const name = app.full_name || 'Applicant';
  const position = app.position || 'the open role';
  return {
    subject: 'MediCare Pharmacy — Application Accepted',
    text: `Hello ${name},\n\nCongratulations! Your application for ${position} has been accepted. We will contact you soon.\n\nMediCare Pharmacy`,
    html: emailLayout(`
      <h2 style="color:#1D9E75;margin:0 0 12px;">Congratulations, ${name}!</h2>
      <p>Your application for <strong>${position}</strong> has been <strong style="color:#1D9E75;">accepted</strong>.</p>
      <p>We will contact you shortly with onboarding details.</p>
      <p style="color:#64748b;font-size:13px;margin-top:24px;">MediCare Pharmacy</p>
    `),
  };
}

function applicationRejectedEmail(app) {
  const name = app.full_name || 'Applicant';
  const position = app.position || 'the open role';
  return {
    subject: 'MediCare Pharmacy — Application Update',
    text: `Hello ${name},\n\nThank you for applying for ${position}. We will not proceed with your application at this time.\n\nMediCare Pharmacy`,
    html: emailLayout(`
      <h2 style="color:#2a3835;margin:0 0 12px;">Hello ${name},</h2>
      <p>Thank you for your interest in <strong>${position}</strong>.</p>
      <p>After review, we are unable to proceed with your application at this time.</p>
      <p style="color:#64748b;font-size:13px;margin-top:24px;">MediCare Pharmacy</p>
    `),
  };
}

function applicationReviewedEmail(app) {
  const name = app.full_name || 'Applicant';
  return {
    subject: 'MediCare Pharmacy — Application Under Review',
    text: `Hello ${name},\n\nYour application is under review. We will notify you when a decision is made.\n\nMediCare Pharmacy`,
    html: emailLayout(`
      <h2 style="color:#2a3835;margin:0 0 12px;">Hello ${name},</h2>
      <p>Your application is now <strong>under review</strong>.</p>
      <p style="color:#64748b;font-size:13px;margin-top:24px;">MediCare Pharmacy</p>
    `),
  };
}

async function notifyApplicationStatus(app, status) {
  if (!app?.email) return;

  let payload;
  if (status === 'Accepted') payload = applicationAcceptedEmail(app);
  else if (status === 'Rejected') payload = applicationRejectedEmail(app);
  else if (status === 'Reviewed') payload = applicationReviewedEmail(app);
  else return;

  try {
    await sendMail({ to: app.email, ...payload });
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
}

module.exports = { sendMail, notifyApplicationStatus };
