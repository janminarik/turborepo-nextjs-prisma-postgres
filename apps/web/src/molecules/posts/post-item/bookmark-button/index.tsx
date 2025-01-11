import React from "react"

import { PostOnUserType, TPostItem } from "database"

import { getTotalActions } from "@/actions/protect/postAction"

import BookmarkButton from "./BookmarkButton"

type BookmarkButtonContainerProps = {
  post: TPostItem
  showCount?: boolean
}

const BookmarkButtonContainer = async ({ post, showCount }: BookmarkButtonContainerProps) => {
  const { total, haveAction } = await getTotalActions({
    postId: post.id,
    actionType: PostOnUserType.BOOKMARK,
  })

  return (
    <BookmarkButton
      post={post}
      totalBookmark={total}
      isBookmarked={Boolean(haveAction)}
      showCount={showCount}
    />
  )
}

export default BookmarkButtonContainer
