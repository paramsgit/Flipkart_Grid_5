import ora from "ora";
import readlineSync from "readline-sync";

import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationSummaryBufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

// Create an instance of ChatOpenAI
const model = new ChatOpenAI({ temperature: 0.9, verbose: false });

// Create a memory for chat prompts
const chatPromptMemory = new ConversationSummaryBufferMemory({
  llm: model,
  maxTokenLimit: 10,
  returnMessages: true,
});

// Create a chat prompt template
const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    'you are an outfit generator which provides categories to the user based on the user conversation, location, age, etc. Give only JSON output as given below for user input. It should have all four keys topwear,bottomwear,footwear,accesories and also should have four sub keys=catagory,subcatagory,color,tags and it must be only json no other text only give one element in the evry like in color only provide one color with matching color not the multiple color "color":"Black", etc'
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

// Create a ConversationChain instance
const chain = new ConversationChain({
  llm: model,
  memory: chatPromptMemory,
  prompt: chatPrompt,
});

// Function to predict and print results
async function predictAndPrint(input) {
    // Create a spinner with the loading message
    console.log('\n')
    const spinner = ora(`Finding the outfit from store -`).start();
  
    try {
      // Predict using the chain
      const response = await chain.predict({ input });
  
      // Parse and log the result
      const parsedResponse = JSON.parse(response);
      console.log(parsedResponse);
      
      console.log("\n\nTill Now conversation summary\n");
      console.log(chatPromptMemory.movingSummaryBuffer);
      // Stop the spinner and indicate success
      
    } catch (error) {
      // If an error occurs, stop the spinner and indicate failure
      spinner.fail("Failed to find outfit");
      console.error(error);
    }
  }

// Main loop to take user input and predict

while (true) {
  const userInput = readlineSync.question('\nI am a fashion outfit generator, how can I assist you: \n\nuser: ');
  await predictAndPrint(userInput);
}
