import { NextRequest } from "next/server";
import { tool } from "ai";
import { z } from "zod";

export async function POST(req: NextRequest) {

  const { input, tools, agents, conversationId } = await req.json();

  const generatedTools = tools.map((t: any) => {

    const paramSchema = z.object(
      Object.fromEntries(
        Object.entries(t.parameters).map(([key, type]) => {
          if (type === "string") return [key, z.string()];
          if (type === "number") return [key, z.number()];
          return [key, z.any()];
        })
      )
    );

    return tool({
      description: t.description,
      parameters: paramSchema,
      execute: async (params: any) => {

        let url = t.url;

        for (const key in params) {
          url = url.replace(`{{${key}}}`, encodeURIComponent(params[key]));
        }

        if (t.includeApiKey && t.apiKey) {
          url += url.includes("?")
            ? `&key=${t.apiKey}`
            : `?key=${t.apiKey}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        return data;
      }
    } as any);

  });

  


}