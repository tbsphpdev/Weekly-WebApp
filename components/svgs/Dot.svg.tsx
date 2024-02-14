import { SVGAttributes } from "react";

export default function Clock({
  width,
  height,
  color,
}: {
  width: SVGAttributes<SVGSVGElement>["width"];
  height: SVGAttributes<SVGSVGElement>["height"];
  color: SVGAttributes<SVGSVGElement>["fill"];
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="5" />
    </svg>
  );
}
