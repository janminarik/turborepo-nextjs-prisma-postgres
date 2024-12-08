import { Metadata } from "next"

import { getPost } from "database"

import PostForm from "molecules/post-form"

export async function generateMetadata(props): Promise<Metadata> {
  const params = await props.params
  const post = await getPost({ postIdOrSlug: params?.postId as string })

  return {
    title: post?.data?.title,
    description: "", // post?.content.slice(0, 160),
  }
}

export default async function Page(props: { params: Promise<{ postId: string }> }) {
  const params = await props.params
  const post = await getPost({ postIdOrSlug: params?.postId as string })

  return <PostForm post={post?.data} />
}
