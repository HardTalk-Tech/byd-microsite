import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME } from "@/lib/site/site-url";
import { getModelIndex, MODELS } from "@/content/models";
import { ExperienceScreen } from "@/components/experience/ExperienceScreen";
import { ScreenTransition } from "@/components/ui/ScreenTransition";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODELS.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: PageProps<"/experience/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const model = MODELS[getModelIndex(slug)];
  if (!model) return {};
  const text = model.variants[0]?.description ?? "";
  const description = text.length > 160 ? `${text.slice(0, 157).replace(/s+S*$/, "")}…` : text;
  return {
    title: model.fullName,
    description,
    alternates: { canonical: `/experience/${model.slug}` },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_LK", title: `${model.fullName} | BYD Sri Lanka`, description, url: `/experience/${model.slug}` },
    twitter: { card: "summary_large_image", title: `${model.fullName} | BYD Sri Lanka`, description },
  };
}

/** 04 Experience (one route per model) */
export default async function ExperiencePage({ params }: PageProps<"/experience/[slug]">) {
  const { slug } = await params;
  const modelIndex = getModelIndex(slug);
  if (modelIndex < 0) notFound();

  return (
    <ScreenTransition duration={800}>
      <ExperienceScreen modelIndex={modelIndex} />
    </ScreenTransition>
  );
}
