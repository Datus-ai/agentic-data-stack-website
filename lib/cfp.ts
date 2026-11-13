import fs from "node:fs";
import path from "node:path";
import type { Locale } from "./community";
export interface CfpConfig {
  status: "coming-soon" | "open" | "closed";
  formUrls: Record<Locale, string | null>;
}
export function getCfpConfig(): CfpConfig {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/cfp.json"), "utf8")) as CfpConfig;
}
export function isCfpOpen(config: CfpConfig, locale: Locale = "en") {
  return config.status === "open" && !!config.formUrls[locale];
}
