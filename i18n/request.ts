import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const SUPPORTED = ["es", "en"] as const;
type Locale = (typeof SUPPORTED)[number];

export default getRequestConfig(async () => {
  const store = await cookies();

  const raw =
    store.get("NEXT_LOCALE")?.value || store.get("locale")?.value || "es";

  const locale = (SUPPORTED.includes(raw as Locale) ? raw : "es") as Locale;

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
