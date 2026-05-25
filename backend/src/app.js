const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const interviewRouter = require('./routes/interview.routes');

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://harsh-interviewmentor-ai.vercel.app",
    credentials: true
}))


app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)





module.exports = app;