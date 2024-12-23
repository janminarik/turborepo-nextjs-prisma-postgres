import { Image, Prisma } from "@prisma/client"

import { IActionReturn, IGetListResponse } from "../shared/type"

export type ImageOrderBys = "createdAt" | "name"

export interface IImageFilter {
  page?: number
  limit?: number
  userId?: string
  search?: string
  where?: Prisma.ImageWhereInput
  order?: Prisma.ImageOrderByRelevanceInput
}

export interface IListImageResponse extends IActionReturn<IGetListResponse<Image>> {}
