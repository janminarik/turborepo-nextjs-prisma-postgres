import { getTotalActions } from "actions/protect/postAction"
import { PostOnUserType, TPostItem } from "database"

import LikeButton from "./LikeButton"
import Liker from "./Likers"

interface LikeButtonProps {
  post: TPostItem
}

export default async function LikeButtonContainer({ post }: LikeButtonProps) {
  // Get total like
  const { total, haveAction: isLiked } = await getTotalActions({
    postId: post.id,
    actionType: PostOnUserType.LIKE,
  })

  return (
    <LikeButton
      post={post}
      totalLike={total}
      isLiked={Boolean(isLiked)}
    >
      <Liker
        totalLike={total}
        post={post}
      />
    </LikeButton>
  )
}
