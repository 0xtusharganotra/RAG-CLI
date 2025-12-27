import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const args = process.argv;
  const chatCompletion = await getGroqChatCompletion();

  console.log(chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    // temperature: form range 0 to 2
    // top_p (nuclear sampling): from range 0 to 1
    messages: [
      {
        role: "user",
        content:
          "Explain the importance of fast language models in 3 concise lines",
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

main();
