import { getUserById } from "@/actions/public/authors"
import UserProfile from "@/molecules/follower/user-profile"
import PostItem from "@/molecules/posts/post-item"

export const metadata = {
  title: "Author",
  description: "A list of posts by the author",
}

export default async function Page({ params }: { params: { authorId: string } }) {
  const author = await getUserById(params?.authorId as string)

  return (
    <div className="grid grid-cols-12 gap-10">
      <UserProfile author={author} />
      <div className="col-span-8 rounded-md">
        {author?.post?.map((post) => (
          <PostItem
            key={post?.id}
            post={post}
          />
        ))}
      </div>
    </div>
  )
}
