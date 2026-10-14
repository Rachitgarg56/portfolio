import { createSocialImage } from "@/lib/social-image";

export const alt = "Rachit Garg — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createSocialImage("I build, improve and ship real products.", "Software engineering / Product systems");
}
