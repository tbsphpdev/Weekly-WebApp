import { ButtonProps } from "@chakra-ui/button";

import ButtonLink from "./ButtonLink";

interface PlainLinkProps extends ButtonProps {
  href: string;
}

export default function PlainLink({ href, ...props }: PlainLinkProps) {
  return (
    <ButtonLink
      href={href}
      variant="link"
      _hover={{ textDecoration: "none" }}
      _focus={{}}
      _active={{ color: "black" }}
      color="black"
      {...props}
    />
  );
}
