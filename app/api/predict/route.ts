import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const features = data.features || []

    const predictionUrl = process.env.PREDICTION_API_URL || "";
    const response = await fetch(predictionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features }),
    })

    if (!response.ok) {
      throw new Error(`External API error: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to process the prediction request." },
      { status: 400 }
    )
  }
}
