import { getCurrentUser } from "@/actions/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req:Request,{params}:{params:{id:string}}) {


    try {
        const user= await getCurrentUser()
        if(!user){
            return new NextResponse("Unauthorized" ,{status:401})
        }

        const template= await db.template.delete({
            where :{
                id:params.id, userId:user.id
                
            }
        })
     return NextResponse.json("Success", {status:200})
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error" ,{status:500})

    }
    
}