"use client"

import React, { useActionState } from "react"

import { TPostItem } from "database"
import { BookmarkCheck, BookmarkIcon } from "lucide-react"
import { Button, cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "ui"

import { handleBookmark } from "@/actions/protect/postAction"
import { ActionState } from "@/libs/validationAction"

interface BookmarkButtonProps {
  totalBookmark: number
  isBookmarked: boolean
  showCount?: boolean
  post: TPostItem
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  showCount,
  totalBookmark,
  isBookmarked,
  post,
}) => {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(handleBookmark, {
    postId: post?.id,
    postSlug: post?.slug,
    isBookmarked: false,
  })

  return (
    <div className="flex flex-col items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <form action={formAction}>
              <Button
                variant="link"
                className={cn("no-underline hover:no-underline", {
                  "h-8 w-8 rounded p-0 hover:bg-slate-300": !showCount,
                  "hover:border-stale-300 border-stale-800 flex h-12 w-12 items-center justify-center rounded-full border bg-white p-0 text-lg hover:bg-slate-200":
                    showCount,
                })}
                disabled={pending}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="ri-bookmark-2-line text-gray-950" />
                ) : (
                  <BookmarkIcon className="ri-bookmark-3-line" />
                )}
              </Button>
            </form>
          </TooltipTrigger>
          <TooltipContent>{isBookmarked ? "Un-Bookmark" : "Bookmark"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {showCount && <span className="text-lg font-bold text-gray-600">{totalBookmark}</span>}
    </div>
  )
}

export default BookmarkButton
