import type { Metadata } from "next";
import { HomeIntro } from "@/components/sections/home-intro";
import { IndependentProducts } from "@/components/sections/independent-products";
import { SelectedWork } from "@/components/sections/selected-work";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { site } from "@/lib/site";

export const metadata: Metadata = site.url
  ? { alternates: { canonical: site.url } }
  : {};

export default function Home() {
  return (
    <>
      <HomeIntro />
      <SelectedWork />
      <IndependentProducts />
      <Experience />
      <About />
    </>
  );
}
