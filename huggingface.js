const axios = require('axios');

// Replace with your actual HuggingFace API key
// const API_KEY = 'hu_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// Array of words (replace this with your actual array of 300 words)
const words = [
  'apple',
  'idea',
  'chair',
  'love',
  'computer',
  'happiness',
  'table',
  'freedom',
  'book',
  'justice',
];

// Construct the prompt
const prompt = `Given the following list of words, identify which ones represent physical, tangible objects that can be seen or touched. Return only the words that are physical objects, separated by commas: ${JSON.stringify(
  words,
)}`;

// Make the API request
async function identifyPhysicalObjects() {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',
      {inputs: prompt},
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Physical objects identified:');
    console.log(response.data[0].generated_text.trim());
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
  }
}

// Run the function
identifyPhysicalObjects();
