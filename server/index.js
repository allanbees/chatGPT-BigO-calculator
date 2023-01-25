import { createRequire } from "module";
import { ChatGPTAPIBrowser } from "chatgpt";
import * as dotenv from 'dotenv';
const require = createRequire(import.meta.url);

dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/time-complexity", async (req, res) => {
    res.json({
        message: "Hello world",
    });
    const result = await chatGPTRequest("print(0);");
    console.log(result);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const chatGPTRequest = async (prompt) => {
    const api = new ChatGPTAPIBrowser({
        email: process.env.CHAT_GPT_EMAIL,
        password: process.env.CHAT_GPT_PASSWORD,
    });

    await api.initSession();
    const timeComplexityRes = await api.sendMessage(
         `Analyze the time complexity of the following function: ${prompt}`
    );
    return timeComplexityRes.response;
} 