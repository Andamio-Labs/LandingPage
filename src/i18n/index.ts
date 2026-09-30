import { es } from "./es";
import { en } from "./en";
import type { Lang, SiteContent } from "./types";

export const content: Record<Lang, SiteContent> = { es, en };

export type { Lang, SiteContent };
