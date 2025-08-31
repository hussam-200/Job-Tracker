require("dotenv").config();
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI  } =require("@google/generative-ai");
const path = require("path");


const gemini = new GoogleGenerativeAI  (process.env.GEMINI_API_KEY);

router.post("/resume-feedback", async (req, res) => {
  try {
    const { resumeText } = req.body;

  
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

   
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `You are a career coach. Please provide detailed feedback on this resume:\n${resumeText}` },
          ],
        },
      ],
    });

   
    const feedback = result.response.text() || "No feedback returned";

    res.json({ feedback });
  } catch (error) {
    console.error("Resume Feedback Error:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/job-analysis", async (req, res) => {
  try {
    const { jobDescription } = req.body;

    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `You are a job application assistant. Analyze this job description and suggest improvements:\n${jobDescription}` }
          ]
        }
      ]
    });

    const feedback = result.response.text() || "No feedback returned";
    res.json({ feedback });

  } catch (error) {
    console.error("Job Analysis Error:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/career-insights", async (req, res) => {
  try {
    const { field } = req.body;

    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `You are a career advisor. Give me career insights, trends, and advice for the field: ${field}` }
          ]
        }
      ]
    });

    const feedback = result.response.text() || "No feedback returned";
    res.json({ feedback });
  } catch (error) {
    console.error("Career Insights Error:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `You are an AI career assistant. ${message}` }
          ]
        }
      ]
    });

    const reply = result.response.text() || "No reply returned";
    res.json({ reply });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports=router;