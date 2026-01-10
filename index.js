import Groq from "groq-sdk";
import dotenv from "dotenv";
import { tavily } from "@tavily/core";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_KEY });

async function main() {
  const maxsteps = 5;
  let steps = 0;
  const args = process.argv[2];
  const message = [
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
  ];
  const chatCompletion = await getGroqChatCompletion(message);
  message.push(chatCompletion.choices[0].message);
  let llmres = chatCompletion;

  while (steps < maxsteps) {
    const toolcall = llmres.choices[0].message.tool_calls;
    if (!toolcall) {
      break;
    }

    console.log("\nTool call detected, invoking external tool...\n");

    for (let tool of toolcall) {
      const fnname = tool.function.name;
      const functionarg = JSON.parse(tool.function.arguments);

      const query = functionarg.query;

      if (fnname === "websearch") {
        let finalmessage = await websearch({ query });
        console.log(" \n Result from external tool is retrieved... \n");
        message.push({
          role: "tool",
          tool_call_id: tool.id,
          content: finalmessage,
        });
      }
    }
    steps++;
    llmres = await getGroqChatCompletion(message);
    message.push(llmres.choices[0].message);
  }

  if (steps === maxsteps) {
    console.log("Max tool usage limit reached");
    return;
  }

  console.log(" \n Gnerating output... \n");
  console.log(llmres.choices[0].message.content);
  return;
}

async function websearch({ query }) {
  console.log(" \n External tool is called... \n");
  const response = await tvly.search(query);

  const finalres = response.results.map((res) => res.content);
  const finalresstr = finalres.join("\n\n");
  // console.log(finalresstr);
  return finalresstr;
}

async function getGroqChatCompletion(message) {
  return groq.chat.completions.create({
    // temperature: form range 0 to 2
    // top_p (nuclear sampling): from range 0 to 1
    model: "moonshotai/kimi-k2-instruct-0905",
    messages: message,
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
