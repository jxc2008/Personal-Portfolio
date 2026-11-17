import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegion, REGIONS, t } from "@/regions";
import RegionPage from "@/regions/RegionPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return REGIONS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const region = getRegion(params.slug);
  if (!region) return {};
  return {
    title: `${t(region.name)} | Joseph Cheng`,
    description: t(region.lede),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const region = getRegion(params.slug);
  if (!region) notFound();
  return <RegionPage slug={region.slug} />;
}
