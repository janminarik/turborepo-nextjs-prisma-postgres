import { NextRequest } from "next/server"

import prisma from "database"

export async function GET(request: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params
  const { userId } = params

  try {
    const user = await prisma.user.findMany({
      where: {
        followers: {
          some: {
            followingId: userId,
          },
        },
      },
    })

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    return Response.json(user, { status: 200 })
  } catch (error) {
    return Response.error()
  }
}
