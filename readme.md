# RAG-CLI

This is a command-line interface (CLI) that uses a large language model to answer questions, with the ability to perform web searches for up-to-date information. It uses the Groq API for language model inference and the Tavily API for web searches.

This is a learning project I am currently building. So it's not ready yet, but feel free to use it and contribute if you think you can do some valuable contribution. Thanks!

## Requirements

- Node.js
- npm

## Installation

1. Clone this repository to your local machine.
2. Open a terminal in the project directory.
3. Install the required dependencies by running:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root of the project directory.
2. Add your API keys to the `.env` file as follows:

   ```
   GROQ_API_KEY="your_groq_api_key"
   TAVILY_KEY="your_tavily_api_key"
   ```

   Replace `"your_groq_api_key"` and `"your_tavily_api_key"` with your actual API keys.

## Usage

Run the following command in your terminal to start the interactive chat interface:

```bash
npm run dev
```

The tool will start an interactive chat session where you can:

- Type your questions and get real-time answers
- The AI will automatically perform web searches when needed for current information
- Type `exit` to quit the application

### Example Session

```
=============================================================================================
  ██████╗  █████╗  ██████╗      ██████╗ ██╗      ██████████╗
  ██╔══██╗██╔══██╗██╔════╝     ██╔════╝ ██║          ██║═══╝
  ██████╔╝███████║██║  ███╗    ██║      ██║          ██║
  ██╔══██╗██╔══██║██║   ██║    ██║      ██║          ██║
  ██║  ██║██║  ██║╚██████╔╝    ╚██████╗ ███████╗ ██████████╗
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝      ╚═════╝ ╚══════╝ ╚═════════╝

RAG-CLI — Personal AI Assistant with Real-Time Search
Type your question to begin | Type "exit" to quit
=============================================================================================
You: When was the iPhone 12 launched? I want to know the exact date.

----Tool call detected, invoking external tool----
 -----Results from external tool call is retrieved---

Assistant: The iPhone 12 was launched on October 13, 2020...
```

## How it works

This tool starts an interactive chat session using the Groq API with the Kimi language model. The model is configured to use a `websearch` tool if it needs real-time or current information to answer your questions.

If the model decides to use the `websearch` tool, the script will call the Tavily API to perform a web search. The search results are then sent back to the model, which uses them to generate a final answer.

The tool can perform up to 5 tool calls per question to gather information before providing the final answer. If no tool is needed, the model will answer your question directly. The conversation continues until you type `exit`
