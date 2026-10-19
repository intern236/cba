/* eslint-disable @next/next/no-img-element */
import { type Img, src, srcSet } from "@/lib/images";

/** Pre-sized WebP with intrinsic width/height (no layout shift) and lazy loading by default. */
export function Photo({
  img,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  priority = false,
  position,
}: {
  img: Img;
  sizes?: string;
  className?: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <img
      src={src(img)}
      srcSet={srcSet(img)}
      sizes={sizes}
      width={img.w}
      height={img.h}
      alt={img.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
