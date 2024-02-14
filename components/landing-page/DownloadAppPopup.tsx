import { VStack, Image, Text, Button, StackDivider } from "@chakra-ui/react";

import AppleLogo from "../svgs/AppleLogo.svg";
// import WindowsLogo from "../svgs/WindowsLogo.svg";

export default function DownloadAppPopup() {
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
        To start tracking your time, install the Weekly Desktop App
      </Text>
      <Text fontSize="sm">
        In order for Weekly to display your daily activities and productivity,
        you’ll need to{" "}
        <strong>download and install the desktop application.</strong> 😄
      </Text>
      <VStack
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Button
          width="48%"
          colorScheme="purple"
          onClick={() => handleDownloadMAC()}
        >
          Mac OS
          <StackDivider width="5px" />
          <AppleLogo />
        </Button>

        {/* <Button
          className="removeMargin"
          width="48%"
          colorScheme="purple"
          onClick={() => handleDownload()}
          margin={0}
        >
          Windows OS
          <StackDivider width="8px" />
          <WindowsLogo />
        </Button> */}
      </VStack>
    </VStack>
  );
}
