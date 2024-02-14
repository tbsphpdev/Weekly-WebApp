import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/layout";
import Link from "next/link";

interface LinkProps extends ChakraLinkProps {
  href: string;
  replace?: boolean;
}

export default function NextLink({ href, replace, ...props }: LinkProps) {
  /* eslint react/forbid-elements: 0 */
  return (
    <Link href={href} replace={replace} passHref>
      <ChakraLink {...props} />
    </Link>
  );
}
