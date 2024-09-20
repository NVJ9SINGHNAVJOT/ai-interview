const jobInterview = (jobPosition: string, jobDescription: string, yearOfExp: number) => {
  return `Job Position: ${jobPosition}. Job Description: ${jobDescription}. Years of Experience: ${yearOfExp}. Based on this information, provide 5 interview questions with answers in JSON format. Include 'Question' and 'Answer' as fields in the JSON.`;
};

const prompt = {
  jobInterview,
};

export default prompt;
