/* eslint-disable */
import { Box, Heading } from "@chakra-ui/react";
import DrawerComp from "../../components/nav/Drawer";

import Navbar from "../../components/nav/NavBarInApp";
import SettingsSidebar from "../../components/nav/SettingsSidebar";

export default function About() {
  return (
    <Box
      bg="#E5E5E5"
      minHeight="100%"
      // width={["fit-content", "fit-content", "fit-content", "100%"]}
      width={"100%"}
    >
      <Navbar />
      <DrawerComp />
      <Box display="flex" flexDirection="row" minH="100vh">
        <SettingsSidebar />
        <Box className="settingPageBox">
          <Box className="settingPageBoxInner">
            <Box>
              <Heading mb="25px">About</Heading>
            </Box>
            <Box>
              <Box>
                <a href="/tos.pdf" target={"_blank"} style={{ fontSize: "lg" }}>
                  Terms of Use
                </a>
              </Box>
              <Box paddingTop={4}>
                <a
                  href="/privacy-policy.pdf"
                  target={"_blank"}
                  style={{ fontSize: "lg" }}
                >
                  Privacy Policy
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
