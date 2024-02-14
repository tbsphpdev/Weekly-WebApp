import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Stack,
  Center,
} from "@chakra-ui/react";

import NextLink from "../utils/NextLink";

export default function KeyFeatures() {
  return (
    <Center w="100%" paddingX="10%" bg="weekly.lightgray">
      <VStack alignItems="left" py="64px">
        <Heading fontSize={48} pl={0} textAlign={["center", "center", "left"]}>
          Discover the key features
        </Heading>
        <Stack
          direction={["column", "column", "row"]}
          spacing={30}
          pt="36px"
          maxW={1600}
        >
          <Feature
            imageName="clock.png"
            headline="Track productivity"
            description="Take control of your productive life. Measure the time you spend on productive vs. non-productive websites and apps."
          />
          <Feature
            imageName="megaphone.png"
            headline="Compete with friends"
            description="Start growing with your friends and family! Who do you think uses their screen time more productively? Find out together!"
          />
          <Feature
            imageName="chat.png"
            headline="Control your privacy"
            description="You decide who is able to see your profile and who isn’t. Take full control of your Weekly experience. "
          />
        </Stack>
      </VStack>
    </Center>
  );
}

interface FeatureData {
  imageName: string;
  headline: string;
  description: string;
}

function Feature({ imageName, headline, description }: FeatureData) {
  return (
    <Box>
      <Image
        src={"/images/landing-page/" + imageName}
        alt=""
        h="55px"
        w="55px"
      />
      <Text fontSize={24} fontWeight={600} mt="24px">
        {headline}
      </Text>
      <Text fontSize={16} mt="8px">
        {description}
      </Text>
      <HStack color="weekly.lavender" mt="24px">
        <NextLink
          href="/register"
          fontSize={14}
          fontWeight="bold"
          color="weekly.lavender"
        >
          Know more →
        </NextLink>
      </HStack>
    </Box>
  );
}
