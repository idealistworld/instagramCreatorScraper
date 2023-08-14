const url = 'https://example.com';

// Fetch the HTML content
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(htmlContent => {
    // Process the HTML content
    console.log(htmlContent);
  })
  .catch(error => {
    console.error('There was a problem fetching the HTML:', error);
  });