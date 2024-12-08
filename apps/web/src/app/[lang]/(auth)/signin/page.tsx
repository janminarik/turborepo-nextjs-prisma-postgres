import React from "react"
import { redirect } from "next/navigation"

import { auth } from "configs/auth"
import SignIn from "molecules/auth/sign-in"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations()

  return {
    title: t("auth.sign_in.title"),
    description: t("auth.sign_in.description"),
  }
}

export default async function Page() {
  const session = await auth()

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  )
}
