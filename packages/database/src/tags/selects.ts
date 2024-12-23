import { Prisma } from "@prisma/client"

export const tagListSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  image: {
    select: {
      id: true,
      url: true,
    },
  },
  type: true,
  totalFollowers: true,
  updatedAt: true,
  createdAt: true,
} satisfies Prisma.TagSelect

export const tagItemSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  type: true,
  totalFollowers: true,
  updatedAt: true,
  createdAt: true,
  image: {
    select: {
      id: true,
      url: true,
    },
  },
  // _count: {
  //   select: {
  //     tagOnPost: true,
  //   },
  // },
} satisfies Prisma.TagSelect

export type TTagItem = Prisma.TagGetPayload<{
  select: typeof tagItemSelect
}>

export type TTagListItem = Prisma.TagGetPayload<{
  select: typeof tagListSelect
}>
