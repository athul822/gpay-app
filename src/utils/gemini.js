const axios = require('axios');

// Replace with your actual Gemini AI API key
const API_KEY = 'AIzaSyCYN5NsiP88GiTepXWgsrBGHkROdkv5QL4';

// Make the API request
async function identifyPhysicalObjects() {
  const prompt = `Generate a list of 10 random physical, tangible objects with the following criteria:
- Each object must be something that can be physically held or touched
- Objects should vary in size from small (e.g., paperclip) to large (e.g., refrigerator)
- Include common everyday objects,
- do not send words like a coffee table
- Exclude digital items, concepts, or intangible things, Return the words separated by commas`;
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
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    console.log('Physical objects identified:');
    console.log(data.candidates[0].content.parts[0].text);

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
  }
}

export default identifyPhysicalObjects;
// Run the function
