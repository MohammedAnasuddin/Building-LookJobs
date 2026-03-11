import fs from "fs";
import path from "path";

const COOKIE_DIR = "./cookies";

/**
 * Saves cookies from a Puppeteer page to a JSON file for the given platform.
 */
export const saveCookies = async (page, platform) => {
  if (!fs.existsSync(COOKIE_DIR)) fs.mkdirSync(COOKIE_DIR, { recursive: true });
  const cookies = await page.cookies();
  fs.writeFileSync(
    path.join(COOKIE_DIR, `${platform}.json`),
    JSON.stringify(cookies, null, 2)
  );
  console.log(`🍪 [${platform}] Cookies saved`);
};

/**
 * Loads cookies from a JSON file into a Puppeteer page.
 * Returns true if cookies were loaded, false if no saved cookies found.
 */
export const loadCookies = async (page, platform) => {
  const cookiePath = path.join(COOKIE_DIR, `${platform}.json`);
  if (!fs.existsSync(cookiePath)) {
    console.log(`⚠️  [${platform}] No saved cookies found — fresh session`);
    return false;
  }
  const cookies = JSON.parse(fs.readFileSync(cookiePath));
  await page.setCookie(...cookies);
  console.log(`✅ [${platform}] Cookies loaded`);
  return true;
};

/**
 * Clears saved cookies for a platform (call this when login fails even with cookies).
 */
export const clearCookies = (platform) => {
  const cookiePath = path.join(COOKIE_DIR, `${platform}.json`);
  if (fs.existsSync(cookiePath)) {
    fs.unlinkSync(cookiePath);
    console.log(`🗑️  [${platform}] Cookies cleared`);
  }
};
