import { Text, Center, Stack, HStack, Heading, Image } from "@chakra-ui/react";

import ButtonLink from "../utils/ButtonLink";

export default function TryNow() {
  return (
    <Center
      bg="weekly.lavender"
      overflow="hidden"
      position="relative"
      backgroundImage="/images/landing-page/gradient-background.svg"
      backgroundSize="cover"
      backgroundBlendMode="lighten"
      flexDirection="column"
      padding="10vw"
      textAlign="center"
    >
      <Heading fontSize={[40, 40, 64]} color="white">
        Start tracking today
      </Heading>
      <Text fontSize={18} py="27px" maxW={600} align="center">
        Start changing the way you interact with the digital world by measuring
        your computer screen time.
      </Text>
      <ButtonLink
        href="/register"
        variant="black"
        fontSize={14}
        px="42px"
        py="24px"
      >
        Try Now
      </ButtonLink>
      <Stack
        direction={["column", "column", "row"]}
        spacing={[5, 5, 40]}
        pt="39px"
      >
        <Highlight text="Fully organized" />
        <Highlight text="License to use on multiple projects" />
        <Highlight text="Clean, Minimal & Modern Design" />
      </Stack>
      {/*
      <Image
        src="/images/landing-page/gradient-background.svg"
        alt=""
        mixBlendMode="lighten"
        userSelect="none"
      /> <VStack position="absolute">
        <VStack>
          <Heading fontSize={[40, 40, 64]} color="white">
            Start tracking today
          </Heading>
          <Text fontSize={18} py="27px" maxW={600} align="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum
            diam orci pretium a pharetra, feugiat cursus.
          </Text>
          <ButtonLink
            href="/register"
            variant="black"
            fontSize={14}
            px="42px"
            py="24px"
          >
            Try Now
          </ButtonLink>
        </VStack>
        <HStack spacing={40} pt="39px">
          <Highlight text="Fully organized" />
          <Highlight text="License to use on multiple projects" />
          <Highlight text="Clean, Minimal & Modern Design" />
        </HStack>
  </VStack>*/}
    </Center>
  );
}

interface HighlightProps {
  text: string;
}

export function Highlight({ text }: HighlightProps) {
  return (
    <HStack spacing={[3, 3, 3, 1]}>
      <Image src="/images/checkmark.svg" alt="" />
      <Text fontSize="14px" color="white">
        {text}
      </Text>
    </HStack>
  );
}
