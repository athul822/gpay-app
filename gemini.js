const axios = require('axios');

// Replace with your actual Gemini AI API key

// Make the API request
async function identifyPhysicalObjects(words) {
  const API_KEY = 'Gemini API Key';
  const prompt = `Given the following list of words, identify which ones represent physical, tangible objects that can be seen or touched. Return only the words that are physical objects, separated by commas: ${JSON.stringify(
    words,
  )}`;
  console.log(words, 'prompt');

  // Construct the request payload
  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  console.log(payload, 'payload');
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Physical objects identified:');
    console.log(response.data.candidates[0].content.parts[0].text);

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
  }
}

identifyPhysicalObjects();
// export default identifyPhysicalObjects;
// Run the function
