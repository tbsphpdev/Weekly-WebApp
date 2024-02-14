import { Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NameItem({
  name,
  to,
  hover = true,
  color = "weekly.grey",
  children,
  onClick,
  ...rest
}: React.PropsWithChildren<{
  name: string;
  to?: string;
  hover?: boolean;
  color?: string;
  onClick?: () => void;
}>) {
  return (
    <NextLink href={to ?? ""} passHref>
      <ChakraLink
        fontSize="0.875rem"
        fontWeight="500"
        color={color}
        onClick={onClick}
      >
        <Flex
          p="0.75rem"
          gap="0.625rem"
          {...(hover && { _hover: { backgroundColor: "#f2f2f2" } })}
          {...rest}
        >
          {children}
          <Text whiteSpace="nowrap">{name}</Text>
        </Flex>
      </ChakraLink>
    </NextLink>
  );
}
