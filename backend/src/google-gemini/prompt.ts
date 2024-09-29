const jobInterviewQuestions = (jobPosition: string, jobDescription: string, yearOfExp: number) => {
  return `Provide 5 interview questions based on the following information in JSON format.
  Job Position: ${jobPosition}. 
  Job Description: ${jobDescription}. 
  Years of Experience: ${yearOfExp}. 
  The JSON format should include an array of questions with each entry containing a 'Question' field.`;
};

const jobInterviewResult = (questionsAndAnswers: { answer: string }[]) => {
  const promptObj = {
    prompt:
      "For each of the following answers, give a rating out of 10 and provide feedback in 4-5 lines, including suggestions for improvement if applicable. The response should be in JSON format with each entry containing the following fields: 'answer', 'rating', and 'feedback'.",
    questions_and_answers: questionsAndAnswers,
  };

  return JSON.stringify(promptObj);
};

const createMCQs = (jobRole: string, yearsOfExperience: number, jobDescription: string) => {
  const promptObj = {
    prompt: `Generate 10 multiple choice questions (MCQs) based on the provided job role, years of experience, and job description. Each MCQ should include the following fields: 'question', an array of 'options', the 'correctAnswer', and a 'reason' explaining why the answer is correct. Additionally, extract key tags from the job description and return them in an array. The response should be in JSON format.`,
    input: {
      jobRole: jobRole,
      yearsOfExperience: yearsOfExperience,
      jobDescription: jobDescription,
    },
  };

  return JSON.stringify(promptObj);
};

const prompt = {
  jobInterviewQuestions,
  jobInterviewResult,
  createMCQs,
};

export default prompt;
