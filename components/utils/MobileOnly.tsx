import { ReactNode } from "react";

import Responsive from "./Responsive";

export default function MobileOnly({ children }: { children: ReactNode }) {
  // only renders its children if the screen is smaller than "lg", e.g. when viewing on a mobile device
  return <Responsive max="lg">{children}</Responsive>;
}
