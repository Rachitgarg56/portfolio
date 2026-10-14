import type { Metadata } from "next";
import { HomeIntro } from "@/components/sections/home-intro";
import { IndependentProducts } from "@/components/sections/independent-products";
import { SelectedWork } from "@/components/sections/selected-work";
import { Journey } from "@/components/sections/journey";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { site } from "@/lib/site";

export const metadata: Metadata = site.url
  ? { alternates: { canonical: site.url } }
  : {};

export default function Home() {
  return (
    <div className="home-page">
      <HomeIntro />
      <SelectedWork />
      <IndependentProducts />
      <Journey />
      <About />
      <Contact />
    </div>
  );
}
