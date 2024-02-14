import { ReactNode } from "react";

import Responsive from "./Responsive";

export default function DesktopOnly({ children }: { children: ReactNode }) {
  // only renders its children if the screen is bigger than "lg", e.g. when viewing on a computer
  return <Responsive min="lg">{children}</Responsive>;
}
