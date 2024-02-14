import { VStack, Image, Text, Button, StackDivider } from "@chakra-ui/react";
// import { useRouter } from "next/router";

import AppleLogo from "../svgs/AppleLogo.svg";
// import WindowsLogo from "../svgs/WindowsLogo.svg";

export default function DownloadPopup() {
  // const router = useRouter();
  const macOSUrl = "/weekly-0.1.8.dmg";
  // const windowsUrl = "/Weekly-0.1.0-setup-windows.zip";

  // const handleDownload = () => {
  //   const fileURL = windowsUrl;
  //   const absoluteURL = new URL(fileURL, window.location.origin);
  //   const link: any = document.createElement("a");
  //   link.href = absoluteURL;
  //   link.download = "Weekly-0.1.0-setup-windows.zip";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleDownloadMAC = () => {
    const fileURL = macOSUrl;
    const absoluteURL = new URL(fileURL, window.location.origin);
    const link: any = document.createElement("a");
    link.href = absoluteURL;
    link.download = "weekly-0.1.8.dmg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <VStack padding={25} spacing={5}>
      <Image
        alt="Weekly Image"
        rounded="md"
        src="images/logo.png"
        width="35%"
      />
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        You&rsquo;re almost set. Last step is to install your Assistant Software
      </Text>
      <Text fontSize="sm">
        In order for Weekly to learn about your daily activities and
        productivity, you&quot;ll need to
        <strong>&nbsp;Download and install the Assistant</strong>
      </Text>
      <Text fontSize="sm">
        This will help to guide you to the your habits and achieve your goals
      </Text>
      <VStack width="100%">
        <Button
          width="100%"
          colorScheme="purple"
          // onClick={() => router.push(macOSUrl)}
          onClick={() => handleDownloadMAC()}
        >
          <AppleLogo />
          <StackDivider width="5px" />
          Download for MacOS
        </Button>

        {/* <Button
          width="100%"
          colorScheme="purple"
          // onClick={() => router.push(windowsUrl)}
          onClick={() => handleDownload()}
        >
          <WindowsLogo />
          <StackDivider width="8px" />
          Download for Windows
        </Button> */}
      </VStack>
    </VStack>
  );
}
