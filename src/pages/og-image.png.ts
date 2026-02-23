import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { join } from "path";

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
  const imageBuffer = readFileSync(
    join(process.cwd(), "public/mt-blue-sky.jpg"),
  );
  const imageDataUrl = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  const [antonFont, frauncesFont] = await Promise.all([
    loadGoogleFont("Anton", 400),
    loadGoogleFont("Fraunces", 400),
  ]);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: `url("${imageDataUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        },
        children: [
          // Content row, with gradient applied directly as background
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                padding: 60,
                gap: 40,
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.95) 10%, rgba(255,255,255,0.80) 70%, rgba(255,255,255,0.7))",
              },
              children: [
                // Title: Dude / Talk / Dinners
                {
                  type: "div",
                  props: {
                    style: { display: "flex", flexDirection: "column" },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            fontFamily: "Anton",
                            fontSize: 100,
                            color: "#0e3855",
                            textTransform: "uppercase",
                            lineHeight: 1.05,
                          },
                          children: "Dude",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontFamily: "Anton",
                            fontSize: 100,
                            color: "#53638e",
                            textTransform: "uppercase",
                            lineHeight: 1.05,
                          },
                          children: "Talk",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontFamily: "Anton",
                            fontSize: 100,
                            color: "#0e3855",
                            textTransform: "uppercase",
                            lineHeight: 1.05,
                          },
                          children: "Dinners",
                        },
                      },
                    ],
                  },
                },
                // Tagline: right-aligned
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      alignItems: "flex-end",
                      gap: 6,
                    },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            fontFamily: "Fraunces",
                            fontSize: 60,
                            color: "#0e3855",
                            lineHeight: 1,
                            textAlign: "right",
                          },
                          children: "Free food and",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontFamily: "Fraunces",
                            fontSize: 60,
                            color: "#0e3855",
                            lineHeight: 1,
                            textAlign: "right",
                          },
                          children: "a space to talk.",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontFamily: "Fraunces",
                            fontSize: 50,
                            color: "#53638e",
                            textAlign: "right",
                            marginTop: 10,
                          },
                          children: "Bailey, CO",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Anton", data: antonFont, weight: 400, style: "normal" },
        { name: "Fraunces", data: frauncesFont, weight: 400, style: "normal" },
      ],
    },
  );

  const png = new Resvg(svg).render().asPng();

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
