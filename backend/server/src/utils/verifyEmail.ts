// Function to verify email using the initialized Arcjet instance
export const verifyEmail = (email: string) => {
  // Define a regex pattern to check if the email ends with '@gmail.com'
  const gmailComRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  // Test the email against the pattern
  return gmailComRegex.test(email);
};
