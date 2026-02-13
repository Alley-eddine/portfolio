import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string

  try {
    const resolved = await requestLocale
    locale =
      resolved && routing.locales.includes(resolved as "fr" | "en")
        ? resolved
        : routing.defaultLocale
  } catch {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
