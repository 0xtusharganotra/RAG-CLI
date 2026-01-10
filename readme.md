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

To use the tool, run the following command in your terminal, replacing `"Your question"` with the question you want to ask:

```bash
npm run dev "Your question"
```

### Example

```bash
npm run dev "When was the iPhone 12 launched? I want to know the exact date."
```

## How it works

This tool takes your question as a command-line argument and uses the Groq API to get a response from the Kimi language model. The model is configured to use a `websearch` tool if it needs real-time or current information to answer your question.

If the model decides to use the `websearch` tool, the script will call the Tavily API to perform a web search. The search results are then sent back to the model, which uses them to generate a final answer.

The tool can perform up to 5 tool calls in a loop to gather information before providing the final answer. If no tool is needed, the model will answer your question directly.
