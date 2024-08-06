// Import modules

// For making HTTP requests to the API
const axios = require("axios");

// Load environment variables from .env file
require("dotenv").config();

// Eriting data to a file
const fs = require("fs");

// Retrieve the API key from environment variables
const apiKey = process.env.NEWS_KEY;
const url = `https://newsapi.org/v2/everything?q=elon+musk&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

// Make a GET request to the News API
axios
  .get(url)
  // If the request is successful extract relevant data from the API response
  .then((response) => {
    // Total number of articles found
    const totalResults = response.data.totalResults;

    // Array of article objects
    const articles = response.data.articles;

    // Prepare the data string to be written to the file
    let data = `Total articles about Elon Musk in the US: ${totalResults}\n\n`;
    data += "Articles:\n";

    // Iterate over each article and format the data
    articles.forEach((article, index) => {
      data += `${index + 1}. ${article.title}\n\n`;
      data += `Source: , ${article.source.name}\n\n`;
      data += `Published at: ${article.publishedAt}\n\n`;
      data += `URL: ${article.url}\n\n`;
    });

    // Write the formatted data to a file named 'articles.txt'
    fs.writeFile("articles.txt", data, (err) => {
      if (err) {
        // Log an error message if writing fails
        console.error("Error writing to file:", err);
      } else {
        // Log success message
        console.log("Data successfully written to articles.txt");
      }
    });
  })
  // If there's an error during the API request
  .catch((error) => {
    // Log the error
    console.error("Error fetching the articles:", error);
  });
