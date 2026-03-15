import { NextRequest, NextResponse } from "next/server";
import { generateText, tool } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {

    const { input, tools, agents, agentName } = await req.json();

    /* ---------------- Handle empty input ---------------- */

    if (!input || input.trim() === "") {
      return NextResponse.json({
        output: "Is there anything else you would like to know?"
      });
    }

    const normalized = input.toLowerCase().trim();

    if (["ok", "okay", "thanks", "thank you"].includes(normalized)) {
      return NextResponse.json({
        output: "Is there anything else you would like to know?"
      });
    }

    /* ---------------- Generate Tools ---------------- */

    const generatedTools = (tools || []).map((t: any) => {

      const paramSchema = z.object(
        Object.fromEntries(
          Object.entries(t.parameters || {}).map(([key, type]) => {
            if (type === "string") return [key, z.string()];
            if (type === "number") return [key, z.number()];
            return [key, z.any()];
          })
        )
      );

      return {
        name: t.name || "external_api",

        tool: tool({
          description: t.description,

          parameters: paramSchema,

          async execute(params: any) {

            let url = t.url;

            /* Replace placeholders */

            for (const key in params) {
              url = url.replace(
                `{{${key}}}`,
                encodeURIComponent(params[key])
              );
            }

            /* Append API key */

            if (t.includeApiKey && t.apiKey) {
              url = url.includes("?")
                ? `${url}&key=${t.apiKey}`
                : `${url}?key=${t.apiKey}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            /* Weather formatting example */

            if (data?.location && data?.current) {
              return `
Weather Update for ${data.location.name}, ${data.location.country}

Temperature: ${data.current.temp_c}°C
Condition: ${data.current.condition.text}
Humidity: ${data.current.humidity}%
Wind Speed: ${data.current.wind_kph} km/h
`;
            }

            return JSON.stringify(data);
          }
        })
      };

    });

    /* ---------------- Convert tools to object ---------------- */

    const toolsObject = Object.fromEntries(
      generatedTools.map((t) => [t.name, t.tool])
    );

    /* ---------------- Select Agent ---------------- */

    const selectedAgent =
      agents?.find((a: any) => a.name === agentName) || agents?.[0];

    /* ---------------- System Prompt ---------------- */

    const systemPrompt = `
You are ${selectedAgent?.name}, a helpful assistant.

${selectedAgent?.instructions}

Rules:

- Use tools when needed to fetch real-time data.
- If the user asks about weather but does not provide a city,
  respond with: "Please provide the city name so I can check the weather."

- If the user provides a city name, call the weather tool immediately.

- Do not say things like "I will access the tool".

- If the user says "ok", "thanks", or similar,
  respond with: "Is there anything else you would like to know?"
`;

    /* ---------------- Run Model ---------------- */

    const result = await generateText({
      model: groq("llama-3.3-70b-versatile"),

      system: systemPrompt,

      prompt: input,

      tools: toolsObject,

      toolChoice: "auto",

      maxSteps: 5
    });

    return NextResponse.json({
      output: result.text
    });

  } catch (error) {

    console.error("Agent SDK Error:", error);

    return NextResponse.json(
      { error: "Agent execution failed" },
      { status: 500 }
    );
  }
}