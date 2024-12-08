import TagDetail from "molecules/tag/tag-detail"

import { getTagById } from "@/actions/public/tags"

export const metadata = {
  title: "Tags",
  description: "A list of tags used in the blog posts",
}

export default async function Page(props: { params: Promise<{ tagId: string }> }) {
  const params = await props.params
  const tag = await getTagById(params?.tagId as string)

  return (
    <div className="grid grid-cols-12 gap-10">
      <TagDetail tag={tag} />
    </div>
  )
}
