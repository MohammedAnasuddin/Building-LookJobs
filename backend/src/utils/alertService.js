import dotenv from "dotenv";
dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const sendCaptchaAlert = async (platform = "LinkedIn") => {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("❌ [Alert] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in .env");
      return;
    }

    const message = `🚨 *LookJobs Alert*\n\n*${platform} reCAPTCHA detected!*\n\n📌 What to do:\n1. Open your machine\n2. Look at the browser window\n3. Solve the CAPTCHA manually\n4. Scraper resumes automatically\n\n⏰ ${new Date().toLocaleString()}\n⏳ Scraper waiting 5 minutes...`;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      console.log("📱 [Alert] Telegram message sent successfully!");
    } else {
      console.error("❌ [Alert] Telegram error:", data.description);
    }
  } catch (err) {
    console.error("❌ [Alert] Failed to send Telegram alert:", err.message);
  }
};
