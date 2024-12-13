"use client"

import { onTogglePost } from "actions/protect/postAction"
import { PostStatus, TPostItem, updatePost } from "database"
import { useTranslations } from "next-intl"
import { useFormState, useFormStatus } from "react-dom"
import { Button } from "ui"

export default function TogglePost({ post }: { post: TPostItem }) {
  const t = useTranslations()

  const [state, formAction] = useFormState(onTogglePost, {
    post,
  })

  console.log(state)

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant={post.postStatus === PostStatus.DRAFT ? "destructive" : "default"}
        // disabled={state}
      >
        {t(post.postStatus === PostStatus.DRAFT ? "common.turn_publish" : "common.turn_draft")}
      </Button>
    </form>
  )
}
