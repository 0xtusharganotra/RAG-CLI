import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const args = process.argv[2];
  const chatCompletion = await getGroqChatCompletion(args);
  const toolcall = chatCompletion.choices[0].message.tool_calls;
  if (!toolcall) {
    console.log(chatCompletion.choices[0].message.content);
    return;
  }

  for (let tool of toolcall) {
    console.log(tool);
  }
}

async function websearch({ query }) {
  return "You have got your reply";
}

async function getGroqChatCompletion(args) {
  return groq.chat.completions.create({
    // temperature: form range 0 to 2
    // top_p (nuclear sampling): from range 0 to 1
    model: "moonshotai/kimi-k2-instruct-0905",
    messages: [
      {
        role: "system",
        content: `You are a smart assistant.
          Respond to the user question and use tools if needed to answer the query.

`,
      },
      {
        role: "user",
        content: `${args}`,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "websearch",
          description:
            "Use this tool ONLY for real-time, latest, or current information.",
          parameters: {
            // JSON Schema object
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query to perform search on",
              },
            },
            required: [`query`],
          },
        },
      },
    ],
    tool_choice: "auto",
  });
}

main();
