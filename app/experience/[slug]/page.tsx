import { notFound } from "next/navigation";
import { getModelIndex, MODELS } from "@/content/models";
import { ExperienceScreen } from "@/components/experience/ExperienceScreen";
import { ScreenTransition } from "@/components/ui/ScreenTransition";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODELS.map((model) => ({ slug: model.slug }));
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
