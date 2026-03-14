import { groq } from "@/config/GroqModel";
import { NextRequest, NextResponse } from "next/server";

const PROMPT = `from this flow, Generate a agent instruction prompt with all details along with tools with all setting info in JSON format. Do not add any extra text just written JSON data. make sure to mentioned paramters depends on Get or Post request.
 only:{ systemPrompt:'',primaryAgentName:'', "agents": [{ "id": "ardnt-id", "name": "", "model": "", "includeHistory": true|false, 
 "output": "", "tools": ["toold-id"], "instruction": "" }, ],
  "tools": [ { "id": "id", "name": "", "description": "", "method": "GET" |'POST',

"url": "", "includeApikey": true, "apiKey": "", "parameters": { "key": "dataType" }, "usage": [ ], "assignedAgent": "" } ]}`

export async function POST(req: NextRequest) {
  try {

    const { jsonConfig } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: JSON.stringify(jsonConfig) + PROMPT
        }
      ],
      model: "llama-3.1-8b-instant",
    });

    const outputText = completion.choices[0].message.content;

    const cleaned = outputText
      ?.replace(/```json/g, "")
      ?.replace(/```/g, "")
      ?.trim();

    const parsedJson = JSON.parse(cleaned || "{}");

    return NextResponse.json({ parsedJson });

  } catch (error) {
    console.error("GROQ ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}