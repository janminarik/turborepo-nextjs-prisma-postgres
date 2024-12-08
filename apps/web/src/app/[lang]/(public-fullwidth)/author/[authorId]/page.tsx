import { getUser } from "database"
import UserProfile from "molecules/follower/user-profile"
import PostList from "molecules/posts/post-list"

export const generateMetadata = async (props) => {
  const params = await props.params
  const { data: author, error } = await getUser({
    where: {
      id: params?.authorId,
    },
  })

  return {
    title: author?.name,
    description: author?.bio,
  }
}

export default async function Page(props) {
  const searchParams = await props.searchParams
  const params = await props.params
  return (
    <div className="grid grid-cols-12 gap-10">
      <UserProfile authorId={params?.authorId} />
      <PostList
        containerClassName="mt-0 col-span-8"
        getPostParams={{
          authorId: params?.authorId,
          ...searchParams,
        }}
      />
    </div>
  )
}
