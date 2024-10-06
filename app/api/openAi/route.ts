import { NextResponse } from "next/server";
import OpenAi from "openai"

const openai = new OpenAi({
    apiKey: 'sk-proj-sMn554QCtfwZ1dxVb3m8T3BlbkFJnH35e2J2Jip3ziksN6y5',
  });
export async function POST(req:Request) {

    try {

        const { prompt } = await req.json();
        console.log(prompt)

        const completion = await openai.completions.create({
            model:"babbage-002",
            prompt: prompt,
            max_tokens: 150
          });

          console.log("Completionnnnnnnnnnnnn",completion)
      
          return NextResponse.json({text: completion.choices[0].text}, {status:200})
        //   res.status(200).json({ text: completion.data.choices[0].text.trim() });
        
    } catch (error) {

        console.log(error)
        return new NextResponse("Error",{status:500})
        
    }
    
}