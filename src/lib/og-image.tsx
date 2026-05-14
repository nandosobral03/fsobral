import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

type OgImageOptions = {
  title: string;
  subtitle?: string;
  footer?: string;
  centered?: boolean;
};

export function renderOgImage({ title, subtitle, footer = site.domain, centered = false }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: centered ? "center" : "flex-start",
          backgroundColor: "#d5d0c3",
          color: "#171717",
          padding: 64,
          position: "relative",
        }}
      >
        <div style={{ fontSize: centered ? 64 : 56, fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1 }}>
          {title}
        </div>
        {subtitle && <div style={{ fontSize: 28, opacity: 0.8, marginTop: 12, maxWidth: 900 }}>{subtitle}</div>}
        {footer && (
          <div style={{ position: "absolute", bottom: 32, right: 48, fontSize: 28, fontWeight: 700 }}>
            {footer}
          </div>
        )}
      </div>
    ),
    { ...ogImageSize }
  );
}
