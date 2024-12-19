"use client"

import { useActionState } from "react"

import { onTogglePost } from "actions/protect/postAction"
import { PostStatus, TPostItem } from "database"
import { useTranslations } from "next-intl"
import { Button } from "ui"

export default function TogglePost({ post }: { post: TPostItem }) {
  const t = useTranslations()

  const [_, formAction, pending] = useActionState(onTogglePost, {
    post,
  })

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant={post.postStatus === PostStatus.DRAFT ? "destructive" : "default"}
        disabled={pending}
      >
        {t(post.postStatus === PostStatus.DRAFT ? "common.turn_publish" : "common.turn_draft")}
      </Button>
    </form>
  )
}
