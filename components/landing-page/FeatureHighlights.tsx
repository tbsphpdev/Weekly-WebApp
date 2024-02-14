import { Image } from "@chakra-ui/image";
import { VStack, Stack, Heading, Text, Center } from "@chakra-ui/layout";

import NextLink from "../utils/NextLink";

interface FeatureHighlightProps {
  headline: string;
  body: string;
  image: string;
  width: number;
  alignRight?: boolean;
}

function FeatureHighlight({
  headline,
  body,
  image,
  width,
  alignRight,
}: FeatureHighlightProps) {
  const imageComponent = (
    <Image w={["70%", "70%", width]} src={image} alt={headline} />
  );
  const featureDetails = (
    <Stack spacing={8}>
      <Heading fontSize="4xl">{headline}</Heading>
      <Text fontSize={16}>{body}</Text>
      <NextLink
        href="/register"
        w="fit-content"
        color={alignRight ? "weekly.aqua" : "weekly.purple"}
        fontWeight="bold"
      >
        Get started →
      </NextLink>
    </Stack>
  );
  return (
    <Center>
      <Stack direction={["column", "column", "row"]} spacing={24}>
        {alignRight ? (
          <Stack
            direction={["column", "column", "row"]}
            alignItems="center"
            justifyContent="center"
          >
            {imageComponent}
            {featureDetails}
          </Stack>
        ) : (
          <Stack
            direction={["column-reverse", "column-reverse", "row"]}
            alignItems="center"
            justifyContent="center"
          >
            {featureDetails}
            {imageComponent}
          </Stack>
        )}
      </Stack>
    </Center>
  );
}

export default function FeatureHighlights() {
  return (
    <VStack py={20} px="10%" spacing={20}>
      <FeatureHighlight
        headline="Auto track your productivity"
        body="We evaluate so that you can take action. Start your FREE membership today and start tracking where your data is taking you."
        image="/images/landing-page/productivity.svg"
        width={400}
        alignRight
      />
      <FeatureHighlight
        headline="Choose your habits"
        body="Hone in on the screen time that matters most. That's accountability. That's building habits."
        image="/images/landing-page/habits.png"
        width={500}
      />
      <FeatureHighlight
        headline="Discover your time"
        body="Before taking action, peer into how you utilize your screen time by checking out your personalized productivity overview."
        image="/images/landing-page/insights.png"
        width={500}
        alignRight
      />
      <FeatureHighlight
        headline="Control your privacy"
        body="We take your privacy seriously. Choose who can see or interact with you on the Weekly platform. Let us know how we can improve!"
        image="/images/landing-page/contol.png"
        width={500}
      />
    </VStack>
  );
}
