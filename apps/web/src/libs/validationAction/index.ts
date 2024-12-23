// Based on https://next-saas-start.vercel.app/
import { Session } from "next-auth"
import { z } from "zod"

import { auth } from "@/configs/auth"

export type ActionState = {
  error?: string
  success?: string
  [key: string]: any // This allows for additional properties
}

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(Object.fromEntries(formData))
    if (!result.success) {
      return { error: result.error.errors[0].message } as T
    }

    return action(result.data, formData)
  }
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  session: Session
) => Promise<T>

type ValidatedActionWithUserProps<S extends z.ZodType<any, any>, T> = {
  schema?: S
  action: ValidatedActionWithUserFunction<S, T>
}

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>({
  schema,
  action,
}: ValidatedActionWithUserProps<S, T>) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const session = await auth()

    if (!session) {
      throw new Error("User is not authenticated")
    }

    if (!schema) {
      return action(prevState, formData, session)
    }

    const result = schema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
      return { error: result.error.errors[0].message } as T
    }

    return action(result.data, formData, session)
  }
}

export function withUser<T>(action: (prevState: ActionState, formData: FormData) => Promise<T>) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const session = await auth()

    if (!session) {
      throw new Error("User is not authenticated")
    }

    return action(prevState, formData)
  }
}
