/**
 * Beautiful, branded HTML email templates for BookHub OTP emails.
 */

const getOtpEmailHtml = (otp, purpose, userName) => {
  const otpDigits = otp.split("");
  const isVerify = purpose === "verify";

  const title = isVerify ? "Verify Your Email" : "Reset Your Password";
  const subtitle = isVerify
    ? "Welcome to BookHub! Enter this code to verify your email address."
    : "We received a request to reset your password. Use this code to proceed.";
  const footerNote = isVerify
    ? "If you didn't create an account on BookHub, you can safely ignore this email."
    : "If you didn't request a password reset, please ignore this email. Your password will remain unchanged.";

  const digitBoxes = otpDigits
    .map(
      (digit) => `
      <td style="padding: 0 4px;">
        <div style="
          width: 48px;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: inline-block;
          line-height: 56px;
          text-align: center;
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          font-family: 'Segoe UI', Roboto, monospace;
          letter-spacing: 0;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.35);
        ">${digit}</div>
      </td>
    `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — BookHub</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="
          max-width: 480px;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
        ">

          <!-- Header Gradient -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
              padding: 36px 32px 28px;
              text-align: center;
            ">
              <div style="
                font-size: 28px;
                font-weight: 800;
                color: #ffffff;
                letter-spacing: -0.5px;
                margin-bottom: 4px;
              ">📚 BookHub</div>
              <div style="
                font-size: 13px;
                color: rgba(255, 255, 255, 0.6);
                letter-spacing: 0.5px;
                text-transform: uppercase;
                font-weight: 500;
              ">${title}</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px 20px; text-align: center;">
              <!-- Greeting -->
              <p style="
                font-size: 18px;
                font-weight: 600;
                color: #0f172a;
                margin: 0 0 8px;
              ">Hi${userName ? " " + userName : ""} 👋</p>
              <p style="
                font-size: 14.5px;
                color: #64748b;
                line-height: 1.6;
                margin: 0 0 28px;
              ">${subtitle}</p>

              <!-- OTP Code -->
              <div style="margin: 0 0 12px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    ${digitBoxes}
                  </tr>
                </table>
              </div>

              <!-- Expiry Badge -->
              <div style="
                display: inline-block;
                background: #fef3c7;
                color: #92400e;
                font-size: 12.5px;
                font-weight: 600;
                padding: 6px 16px;
                border-radius: 20px;
                margin: 8px 0 0;
                letter-spacing: 0.2px;
              ">⏱ Expires in 10 minutes</div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 32px;">
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 12px 0;" />
            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="padding: 16px 32px 28px; text-align: center;">
              <div style="
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 16px 20px;
              ">
                <p style="
                  font-size: 13px;
                  color: #475569;
                  line-height: 1.55;
                  margin: 0 0 6px;
                ">🔒 <strong>Security tip:</strong> Never share this code with anyone. BookHub will never ask for your OTP via phone or chat.</p>
                <p style="
                  font-size: 12.5px;
                  color: #94a3b8;
                  margin: 0;
                  line-height: 1.5;
                ">${footerNote}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background: #f8fafc;
              border-top: 1px solid #e2e8f0;
              padding: 20px 32px;
              text-align: center;
            ">
              <p style="
                font-size: 12px;
                color: #94a3b8;
                margin: 0 0 4px;
                line-height: 1.5;
              ">© ${new Date().getFullYear()} BookHub. All rights reserved.</p>
              <p style="
                font-size: 11.5px;
                color: #cbd5e1;
                margin: 0;
              ">Built with ❤️ for book lovers</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

module.exports = { getOtpEmailHtml };
