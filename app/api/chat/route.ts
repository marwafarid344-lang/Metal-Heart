import { NextResponse } from "next/server"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(request: Request) {
  try {
    const { question, answer } = await request.json()

    const prompt = `You are a super energetic, smart, and caring medical assistant helping a patient with a survey to predict their heart disease risk.
You MUST speak in EGYPTIAN ARABIC (العامية المصرية) only. 
The patient was just looking at the question: "${question}"
And they typed/chose the answer: "${answer}"
Give a short, friendly, and highly expressive 1-2 sentence real-time reaction to their answer directly. Use emojis. Keep it fun, supportive, and distinctly Egyptian.`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Fast and reliable on OpenRouter
        messages: [
          { role: "system", content: "You are a cute Egyptian robot talking to a patient. Only speak in Egyptian Arabic (العامية المصرية)." },
          { role: "user", content: prompt }
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json({
      reaction: data.choices?.[0]?.message?.content || "عاش يا بطل! كمل أنا معاك! 🤖⚡"
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ reaction: "برافو عليك يا فنان، كمل كمل! 🤖🚀" })
  }
}
