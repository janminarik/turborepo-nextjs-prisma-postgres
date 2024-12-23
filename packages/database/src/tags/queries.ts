"use server"

import { Prisma, Tag } from "@prisma/client"
import slugify from "slugify"

import { LIMIT_PER_PAGE } from "../constant"
import prisma from "../prisma"
import { DEFAULT_LIMIT, DEFAULT_PAGE, IActionReturn, IGetListResponse } from "../shared/type"
import { tagItemSelect, tagListSelect, TTagItem, TTagListItem } from "./selects"

export const getTags = async (
  tagsFindManyArgs: Prisma.TagFindManyArgs = {
    take: LIMIT_PER_PAGE,
    skip: DEFAULT_LIMIT * (DEFAULT_PAGE - 1),
  }
): Promise<IActionReturn<IGetListResponse<TTagListItem>>> => {
  try {
    const [data, total] = await Promise.all([
      prisma.tag.findMany({
        ...tagsFindManyArgs,
        select: tagListSelect,
      }),
      prisma.tag.count({
        where: tagsFindManyArgs?.where || {},
      }),
    ])

    return {
      data: {
        data,
        total,
        limit: tagsFindManyArgs?.take || DEFAULT_LIMIT,
      },
    }
  } catch (error) {
    throw {
      data: {
        data: [],
        total: 0,
        limit: DEFAULT_LIMIT,
      },
      error,
    }
  }
}

type GetTagProps = {
  tagIdOrSlug: string
}

export const getTag = async ({
  tagIdOrSlug,
}: GetTagProps): Promise<IActionReturn<TTagItem | null>> => {
  try {
    const data = await prisma.tag.findFirst({
      where: {
        OR: [
          {
            id: tagIdOrSlug,
          },
          {
            slug: tagIdOrSlug,
          },
        ],
      },
      select: tagItemSelect,
    })

    return {
      data,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const createTag = async (tag: Prisma.TagCreateInput): Promise<TTagItem> => {
  return prisma.tag.create({
    data: {
      ...tag,
      slug: tag.slug || slugify(tag.name.toLocaleLowerCase()) + "-" + Date.now(),
    },
    select: tagItemSelect,
  })
}

export const updateTag = async ({
  tagId,
  tag,
}: {
  tagId: string
  tag: Prisma.TagUpdateArgs["data"]
}): Promise<TTagItem> => {
  return prisma.tag.update({
    where: {
      id: tagId,
    },
    data: tag,
    select: tagItemSelect,
  })
}

export const deleteTag = async (tagId: string): Promise<TTagItem> => {
  return prisma.tag.delete({
    where: {
      id: tagId,
    },
    select: tagItemSelect,
  })
}
