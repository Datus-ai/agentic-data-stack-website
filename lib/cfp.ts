import fs from "node:fs";
import path from "node:path";
export interface CfpConfig {
  status: "coming-soon" | "open" | "closed";
  formUrl: string | null;
}
export function getCfpConfig(): CfpConfig {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/cfp.json"), "utf8")) as CfpConfig;
}
export function isCfpOpen(config: CfpConfig) {
  return config.status === "open" && !!config.formUrl;
}
