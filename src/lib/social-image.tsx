import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { brand } from "@/lib/brand";

export const socialImageSize = { width: 1200, height: 630 };

// Server-only image generation, with Next's bundled font and no remote fetches.
export function createSocialImage(title: string, label: string) {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 72px", background: brand.canvas, color: brand.ink, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 25, borderBottom: `1px solid ${brand.line}`, paddingBottom: 24 }}>
        <span>{profile.name}</span><span style={{ color: brand.accent }}>Engineering portfolio</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 22, color: brand.accent, marginBottom: 20 }}>{label}</span>
        <span style={{ fontSize: title.length > 35 ? 76 : 88, lineHeight: 1.1, letterSpacing: "-3px", maxWidth: 1040 }}>{title}</span>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: brand.muted }}>Frontend / Product Engineer</div>
    </div>,
    socialImageSize,
  );
}
