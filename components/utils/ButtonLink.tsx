import { Button, ButtonProps } from "@chakra-ui/button";
import Link from "next/link";

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

export default function ButtonLink({ href, ...props }: ButtonLinkProps) {
  /* eslint react/forbid-elements: 0 */
  return (
    <Link href={href} passHref>
      <Button {...props} />
    </Link>
  );
}
