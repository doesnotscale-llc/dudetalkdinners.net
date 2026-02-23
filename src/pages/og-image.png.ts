import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { buildMarkup } from "../lib/og-markup";

async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer> {
  // No User-Agent causes Google Fonts to return TTF (not woff2), which satori supports
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
  ).then((r) => r.text());

  const match = css.match(/src: url\((.+?)\) format/);
  if (!match) throw new Error(`No font URL found for ${family} ${weight}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export const GET: APIRoute = async () => {
  const [antonFont, frauncesFont] = await Promise.all([
    loadGoogleFont("Anton", 400),
    loadGoogleFont("Fraunces", 400),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(buildMarkup() as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Anton", data: antonFont, weight: 400, style: "normal" },
      { name: "Fraunces", data: frauncesFont, weight: 400, style: "normal" },
    ],
    tailwindConfig: {
      theme: {
        extend: {
          colors: {
            primary: "#0e3855",
            secondary: "#53638e",
            accent: "#bd1a30",
          },
          fontFamily: {
            anton: ["Anton", "sans-serif"],
            fraunces: ["Fraunces", "serif"],
          },
        },
      },
    },
  });

  const png = new Resvg(svg).render().asPng();

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
