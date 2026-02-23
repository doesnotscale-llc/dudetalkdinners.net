/** @jsx h */

// Minimal JSX factory — produces the plain objects satori expects
export function h(
  type: string,
  props: Record<string, unknown> | null,
  ...children: unknown[]
): unknown {
  const flat = children.flat();
  return {
    type,
    props: {
      ...props,
      children:
        flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat,
    },
  };
}

declare namespace JSX {
  interface IntrinsicElements {
    [tag: string]: Record<string, unknown>;
  }
}

export function buildMarkup() {
  return (
    <div
      tw="flex w-full h-full bg-primary p-16 flex-row items-center"
      style={{ gap: 40 }}
    >
      {/* Title */}
      <div tw="flex flex-col">
        <span tw="font-anton text-[150px] uppercase leading-[1.05] text-white">
          Dude
        </span>
        <span tw="font-anton text-[150px] uppercase leading-[1.05] text-accent">
          Talk
        </span>
        <span tw="font-anton text-[150px] uppercase leading-[1.05] text-white">
          Dinners
        </span>
      </div>

      {/* Tagline */}
      <div tw="flex flex-col flex-1 items-end" style={{ gap: 8 }}>
        <span tw="font-fraunces text-[60px] leading-none text-white text-right">
          Free food and
        </span>
        <span tw="font-fraunces text-[60px] leading-none text-white text-right">
          a space to talk.
        </span>
        <span tw="font-fraunces text-[50px] text-white/70 text-right mt-3">
          Bailey, CO
        </span>
      </div>
    </div>
  );
}
