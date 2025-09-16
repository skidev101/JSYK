export const getWelcomeTemplate = (toName) => {
  return {
    html: `
      <div style="font-family:Arial,sans-serif;background:#f9fafb;padding:40px;color:#111;">
        <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.05);">
          <h1 style="color:#2563eb;text-align:center;">Welcome to JSYK 🎉</h1>
          <p>Hi <strong>${toName}</strong>,</p>
          <p>We're so excited to have you on board!</p>
          <div style="text-align:center;margin:30px 0;">
            <a href="https://jsyk.pxxl.click/u/${toName}" style="background:#2563eb;color:#fff;padding:12px 20px;text-decoration:none;border-radius:8px;">
              View Profile
            </a>
          </div>
          <p>Thanks, <br>Monaski from JSYK</p>
        </div>
      </div>
    `,
    text: `
Welcome to JSYK 🎉

Hi ${toName},

We're so excited to have you on board! Your anonymous link is ready.

View it: https://jsyk.app/u/${toName}

Thanks,  
The JSYK Team
    `
  };
};
