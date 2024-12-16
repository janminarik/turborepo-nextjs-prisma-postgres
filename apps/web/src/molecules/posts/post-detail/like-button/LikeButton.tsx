"use client"

import { useActionState } from "react"

import {
  addRelation,
  onToggleLikePost,
  onTogglePost,
  removeRelation,
} from "actions/protect/postAction"
import { PostOnUserType, TPostItem } from "database"
import { Heart } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button, cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "ui"

type LikeButtonProps = {
  post: TPostItem
  totalLike: number
  isLiked: boolean
  children: React.ReactNode
}

const LikeButton: React.FC<LikeButtonProps> = ({ children, post, isLiked }: LikeButtonProps) => {
  const t = useTranslations()

  const [{ isLiked: likeStatus, postId, postSlug }, toggleLikePost, pending] = useActionState(
    onToggleLikePost,
    {
      isLiked,
      postId: post.id,
      postSlug: post.slug,
    }
  )

  // const toggleLike = () => {
  //   ;(isLiked ? removeRelation : addRelation)({
  //     postId: post.id,
  //     postSlug: post.slug,
  //     action: PostOnUserType.LIKE,
  //   })
  // }

  return (
    <div className="flex flex-col items-center">
      <form action={toggleLikePost}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                disabled={pending}
                className={cn(
                  "hover:border-stale-300 border-stale-800 flex h-12 w-12 items-center justify-center rounded-full border bg-white p-0 text-2xl hover:bg-slate-200"
                )}
              >
                <Heart
                  fill={isLiked ? "tomato" : "gray"}
                  color={isLiked ? "tomato" : "gray"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t(isLiked ? "common.unlike" : "common.like")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
      {children}
    </div>
  )
}

export default LikeButton
