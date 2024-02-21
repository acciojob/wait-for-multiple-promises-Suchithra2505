//your JS code here. If required.
// Get the tbody element
const output = document.getElementById("output");

// Function to generate a random delay between 1 and 3 seconds
function getRandomDelay() {
  return Math.floor(Math.random() * 3000) + 1000;
}

// Function to create a promise that resolves after a random delay
function createPromise(index) {
  return new Promise(resolve => {
    const delay = getRandomDelay();
    setTimeout(() => {
      resolve({ name: `Promise ${index}`, time: delay });
    }, delay);
  });
}

// Array to store the promises
const promises = [];

// Create and push 3 promises into the array
for (let i = 1; i <= 3; i++) {
  promises.push(createPromise(i));
}

// Add a row with loading text
output.innerHTML += `<tr><td colspan="2">Loading...</td></tr>`;

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then(results => {
    // Remove the loading text
    output.innerHTML = '';

    // Populate the table with the results
    results.forEach(result => {
      output.innerHTML += `<tr><td>${result.name}</td><td>${(result.time / 1000).toFixed(3)}</td></tr>`;
    });

    // Calculate and display the total time taken to resolve all promises
    const totalTime = results.reduce((total, result) => total + result.time, 0);
    output.innerHTML += `<tr><td>Total</td><td>${(totalTime / 1000).toFixed(3)}</td></tr>`;
  });
