
/**
 * Retry wrapper for async functions
 */
export const safeAsync = async (fn, retries = 2, delay = 1000) => {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;

      console.error(`❌ Attempt ${attempt} failed:`, err.message);

      if (attempt > retries) {
        throw err;
      }

      // wait before retry
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

/**
 * Timeout wrapper (prevents hanging)
 */
export const withTimeout = (promise, ms = 30000) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("⏰ Timeout exceeded")), ms)
  );

  return Promise.race([promise, timeout]);
};