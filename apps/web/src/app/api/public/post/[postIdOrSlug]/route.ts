import { NextRequest } from "next/server"

import prisma from "database"

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ postIdOrSlug: string }> }
) {
  const params = await props.params
  try {
    const post = await prisma.post.findUnique({
      where: {
        // postStatus: PostStatus.PUBLISHED,
        // id: params.postIdOrSlug,
        slug: params.postIdOrSlug,
        // OR: [
        //   {
        //     id: params.postIdOrSlug,
        //   },
        //   {
        //     slug: params.postIdOrSlug,
        //   },
        // ],
      },
      // select: postSelect,
    })

    if (!post)
      return Response.json({
        status: 404,
        message: "Post not found",
      })

    return Response.json(post, { status: 200 })
  } catch (error) {
    return Response.error()
  }
}
