import { getCurrentUser } from "@/actions/user"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PUT(req: Request) {
  try {
    const { creatorName, replyTo, senderEmail, senderName } = await req.json()

    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const updateUser = await db.user.update({
      where: { id: user.id },
      data: { creatorName, replyTo, senderEmail, senderName }
    })

    return NextResponse.json(updateUser, { status: 200 })
  } catch (error) {
    console.error("Error updating user settings:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}