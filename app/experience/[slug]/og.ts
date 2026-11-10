import { getModelIndex, MODELS } from "@/content/models";
import { renderOgImage, OG_SIZE } from "@/lib/og/og-image";

export { OG_SIZE };

export function generateStaticParams() {
  return MODELS.map((model) => ({ slug: model.slug }));
}

/** Shared by opengraph-image and twitter-image for each model. */
export async function renderModelOgImage(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const model = MODELS[getModelIndex(slug)] ?? MODELS[0];
  return renderOgImage({
    eyebrow: "Experience",
    title: model.fullName,
    subtitle: "Inside and out, day and night",
    accent: model.accent,
    carSlug: model.slug,
  });
}
