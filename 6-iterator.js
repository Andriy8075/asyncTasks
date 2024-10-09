// Async generator that yields random numbers and sleeps for 10 seconds
async function* randomNumberGenerator(signal) {
  while (true) {
    if (signal.aborted) {
      console.log("Aborted! Stopping the generator.");
      return; // Stop the generator if the signal is aborted
    }

    const randomNum = Math.random(); // Generate a random number

    // Sleep for 10 seconds, checking if aborted during the wait
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, 1000);
      signal.addEventListener("abort", () => {
        clearTimeout(timeout); // Stop the timeout
        reject(new Error("Aborted during sleep"));
      });
    });

    yield randomNum; // Yield the number to the caller
  }
}

// Iterator that uses the async generator with an abort controller
async function iterateRandomNumbers() {
  const controller = new AbortController();

  const { signal } = controller;

  // Start the generator
  const generator = randomNumberGenerator(signal);

  setTimeout(() => {
    controller.abort();
  }, 10050);
  // Iterate over the generator
  try {
    for await (const num of generator) {
      console.log(`Generated number: ${num}`);

      // Simulate aborting after the first iteration
    }
  } catch (err) {
    console.log(`Caught error: ${err.message}`);
  }
}

iterateRandomNumbers();
