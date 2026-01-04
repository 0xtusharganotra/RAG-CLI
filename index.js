import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const args = process.argv[2];
  const chatCompletion = await getGroqChatCompletion(args);

  console.log(chatCompletion.choices[0].message.content);
}

async function websearch({ query }) {
  return "You have got your reply";
}

async function getGroqChatCompletion(args) {
  return groq.chat.completions.create({
    // temperature: form range 0 to 2
    // top_p (nuclear sampling): from range 0 to 1
    messages: [
      {
        role: "assistant",
        content:
          "When giving output make sure its humble, clear and should end in max 5 lines in the form that first line contain only ---------------- the in next line output and then once output ends in next line -----------------",
      },
      {
        role: "user",
        content: `${args}`,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

main();
