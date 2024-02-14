import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useRouter } from "next/router";

import MenuIcon from "../svgs/MenuIcon.svg";
import ButtonLink from "../utils/ButtonLink";

import { routes } from "./SettingsSidebar";

function DrawerComp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  return (
    <Box display={["block", "block", "none"]} className="drawerSetting">
      <Button onClick={onOpen}>
        <MenuIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box className="customDrawer">
            <Button
              variant="ghost"
              textAlign="left"
              className="removeCss"
              color="#304854"
            >
              Account Settings
            </Button>
            {routes.map(([route, name], i) => (
              <ButtonLink
                textAlign="left"
                key={route}
                href={route}
                bg={
                  router.pathname === route &&
                  i === routes.map((item) => item[0]).lastIndexOf(route)
                    ? "weekly.paleblue"
                    : "white"
                }
              >
                {name}
              </ButtonLink>
            ))}
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default DrawerComp;
