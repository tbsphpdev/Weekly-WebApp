import { Image } from "@chakra-ui/image";
import { Box, Center, Heading, Text, Stack, Flex } from "@chakra-ui/layout";

export default function Integrations() {
  return (
    <Center w="100%" bg="weekly.lightgray" px={{ base: 100, lg: 100 }} py={12}>
      <Stack
        direction={["column", "column", "row"]}
        spacing={20}
        textAlign={["center", "center", "left"]}
      >
        <Box maxW={{ base: 500, "2xl": 600 }}>
          <Heading fontSize={48} pb={6}>
            Track your time on 150+ tools
          </Heading>
          <Text>
            Weekly connects with the tools that you use daily and keep things on
            track.
          </Text>
        </Box>
        <Flex flexWrap="wrap" gap={0} justifyContent="center">
          <Image
            alt="Intercom"
            src="/images/landing-page/intercom.png"
            width={["70px", "100px"]}
            height={["70px", "100px"]}
          />
          <Image
            alt="Slack"
            src="/images/landing-page/slack.png"
            width={["70px", "100px"]}
            height={["70px", "100px"]}
          />
          <Image
            alt="SurveyMonkey"
            src="/images/landing-page/surveymonkey.png"
            width={["70px", "100px"]}
            height={["70px", "100px"]}
          />
          <Image
            alt="Dropbox"
            src="/images/landing-page/dropbox.png"
            width={["70px", "100px"]}
            height={["70px", "100px"]}
          />
          <Image
            alt="PayPal"
            src="/images/landing-page/paypal.png"
            width={["70px", "100px"]}
            height={["70px", "100px"]}
          />
          <Image
            alt="Mailchimp"
            src="/images/landing-page/mailchimp.png"
            width={["70px", "100px"]}
            height={["70px", "100px"]}
          />
          <Image
            alt="Salesforce"
            src="/images/landing-page/salesforce.png"
            width={["70px", "100px"]}
            height={["70px", "100px"]}
          />
        </Flex>
      </Stack>
    </Center>
  );
}
