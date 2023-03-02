export default function useRetry(retries = 3, delay = 1000) {
  async function retry(func) {
    let retryCount = 0;

    while (retryCount < retries) {
      try {
        const data = await func();
        return data;
      } catch (err) {
        retryCount++;
        console.log(`Retrying... (${retryCount} of ${retries})`);
        // eslint-disable-next-line no-loop-func
        await new Promise((resolve) => setTimeout(resolve, delay * retryCount));
      }
    }

    throw new Error(`Maximum retries exceeded (${retries})`);
  }

  return { retry };
}
