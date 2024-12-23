import React from "react"

import { TPostItem } from "database"
import reactHtmlParser from "react-html-parser"

interface PostContentProps {
  post: TPostItem
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return <div className="mt-8">{reactHtmlParser(post?.content)}</div>
}

export default PostContent
