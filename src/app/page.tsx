import type { Metadata } from "next";
import { HomeIntro } from "@/components/sections/home-intro";
import { IndependentProducts } from "@/components/sections/independent-products";
import { SelectedWork } from "@/components/sections/selected-work";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Toolkit } from "@/components/sections/toolkit";
import { Now } from "@/components/sections/now";
import { Contact } from "@/components/sections/contact";
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
      <Toolkit />
      <div className="about-now-cluster">
        <Now />
        <About />
      </div>
      <Contact />
    </>
  );
}
