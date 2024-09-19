import { logger } from "@/logger/logger";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env["GEMINI_API_KEY"];
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat({
  generationConfig,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
  history: [],
});

async function getGeminiResponse(jobPosition: string, jobDescription: string, yearOfExp: number) {
  try {
    const prompt = `Job Position: ${jobPosition}. Job Description: ${jobDescription}. Years of Experience: ${yearOfExp}. Based on this information, provide 5 interview questions with answers in JSON format. Include 'Question' and 'Answer' as fields in the JSON.`;
    const result = await chatSession.sendMessage(prompt);
    const resData = JSON.parse(result.response.text().replace("```json", "").replace("```", ""));
    logger.log("Gemini-Api", resData);
  } catch (error: any) {
    logger.error("Gemini-Api error", { error: error.message });
  }
}

export default getGeminiResponse;
