
 export const checkPasscode = (savedCode,userInput) => {
     // Join the user input array to form a string
     const userInputString = userInput.join('');
     console.log(savedCode,userInput,userInputString,'insidecheckpasscode');

  // Compare the joined string with the saved code
  if (userInputString === savedCode) {
    console.log('true');
    return true;
  } else {
    console.log('false');
    return false;
  }
}


