const requiredEnv = [
  // Database
  "DB_USER",
  "DB_HOST",
  "DB_NAME",
  "DB_PASS",
  "DB_PORT",

  // Server
  "PORT",

  // Auth0
  "AUTH0_DOMAIN",
  "AUTH0_AUDIENCE",
  "AUTH0_CLIENT_ID",

  // AI
  "GROQ_API_KEY",
];

const optionalEnv = [
  "JOB_SCRAPE_CRON",
  "HEADLESS_SCRAPER",
  "ENABLE_LINKEDIN",
  "LINKEDIN_MAIL",
  "LINKEDIN_PASSWORD",
  "AUTH0_REDIRECT_URI",
];

export const validateEnv = () => {
  const missing = [];

  // =========================
  // REQUIRED ENV CHECK
  // =========================

  for (const env of requiredEnv) {
    if (!process.env[env]) {
      missing.push(env);
    }
  }

  if (missing.length > 0) {
    console.error("\n❌ Missing required environment variables:\n");

    missing.forEach((env) => console.error(`   - ${env}`));

    process.exit(1);
  }

  // =========================
  // LINKEDIN VALIDATION
  // =========================

  if (process.env.ENABLE_LINKEDIN === "true") {
    const linkedinMissing = [];

    if (!process.env.LINKEDIN_MAIL) {
      linkedinMissing.push("LINKEDIN_MAIL");
    }

    if (!process.env.LINKEDIN_PASSWORD) {
      linkedinMissing.push("LINKEDIN_PASSWORD");
    }

    if (linkedinMissing.length > 0) {
      console.error(
        "\n❌ LinkedIn scraping enabled but credentials missing:\n",
      );

      linkedinMissing.forEach((env) => console.error(`   - ${env}`));

      process.exit(1);
    }

    console.log("✅ LinkedIn scraping enabled");
  } else {
    console.log("⏭️ LinkedIn scraping disabled");
  }

  // =========================
  // OPTIONAL ENV WARNINGS
  // =========================

  optionalEnv.forEach((env) => {
    if (!process.env[env]) {
      console.warn(`⚠️ Optional env missing: ${env}`);
    }
  });

  console.log("\n✅ Environment variables validated\n");
};
