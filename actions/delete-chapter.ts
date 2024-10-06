"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "./user"



export const deleteChapter = async (courseId:string, chapterId: string) =>{

try {

    const user= await getCurrentUser()

    if(!user){

        return {error:"Unauthorize"}
    }

    const chapter= await db.chapter.findUnique({
        where:{id: chapterId, courseId}
    })

    if(!chapter){
        return {error:"Chapter not found"}
    }

   const chapterDelete = await db.chapter.delete({
    where:{id:chapter.id, courseId}
   }) 

   return {success:"Success"}

    
} catch (error) {
    console.log(error)
}

}