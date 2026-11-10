import { readdirSync } from "node:fs";
import { join } from "node:path";
import { localAssets, shellRoutes } from "@/lib/offline/asset-list";

// Built once at build time: the pages and same-origin files the service worker precaches.
export const dynamic = "force-static";

/**
 * Every file of this build under /_next/static (JS, CSS, fonts) – including chunks
 * that only load on demand (status screen, test-drive form), which no page HTML lists.
 */
function buildFiles(): string[] {
  try {
    const dir = join(process.cwd(), ".next", "static");
    return readdirSync(dir, { recursive: true, withFileTypes: true })
      .filter((d) => d.isFile())
      .map((d) => `/_next/static/${join(d.parentPath, d.name).slice(dir.length + 1).replaceAll("\\", "/")}`);
  } catch {
    return [];
  }
}

export function GET() {
  return Response.json({ routes: shellRoutes(), assets: [...localAssets(), ...buildFiles()] });
}
