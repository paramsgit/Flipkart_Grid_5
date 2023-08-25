import express from "express";
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


const router = express.Router();

router.post('/Generator',async (req,res)=>{
    try {
    // Create an instance of ChatOpenAI
    const model = new ChatOpenAI({ temperature: 0.9, verbose: false });

    // Create a memory for chat prompts
    const chatPromptMemory = new ConversationSummaryBufferMemory({
    llm: model,
    maxTokenLimit: 10,
    returnMessages: true,
    });
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        
        SystemMessagePromptTemplate.fromTemplate(
          'you are an outfit generator which provides categories to the user based on the user conversation, location, age, etc. Give only JSON output as given below for user input. It should have all four keys topwear,bottomwear,footwear,accesories and also should have four sub keys=catagory,subcatagory,color,tags and it must be only json no other text only give one element in the evry like in color only provide one color with matching color not the multiple color "color":"Black", etc'
        ),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
      ]);

      // Going to load previous conversation so that model get well versed with past conversations 
      // so that it can suggest better recommendations
      chatPromptMemory.movingSummaryBuffer= req.body.passhistory
      const chain = new ConversationChain({
        llm: model,
        memory: chatPromptMemory,
        prompt: chatPrompt,
      });
      // Input from user 
      const input = req.body.input;
      
        // Predict using the chain
        const response = await chain.predict({ input });
    
        // Parse and log the result
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        
        console.log(chatPromptMemory.movingSummaryBuffer);
        res.json({"stat":"ok","outfit":{parsedResponse},"summary":chatPromptMemory.movingSummaryBuffer})
      } catch (error) {
        console.error(error);
        res.status(501).json({"stat":"Not_ok","outfit":{},"summary":""})
      }

      
})

export default router;
