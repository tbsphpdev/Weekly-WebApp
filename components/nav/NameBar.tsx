/* eslint-disable */
import {
  Box,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Avatar,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { signOut, useSession } from "next-auth/react";

import Down from "../svgs/Down.svg";
import Up from "../svgs/Up.svg";
import FriendsPlus from "../svgs/FriendsPlus.svg";
import inviteImage from "../../public/images/invite.png";

import NameItem from "./NameItem";
import { useCurrentUser } from "../../hooks";
import Image from "next/image";
import { LinkIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { cryptoEncryption } from "../utils/utils";
import { BsLightningChargeFill } from "react-icons/bs";

export default function NameBar({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: any;
}) {
  const { data } = useSession();
  const { user } = useCurrentUser();
  const {
    isOpen: isOpenInvite,
    onOpen: onOpenInvite,
    onClose: onCloseInvite,
  } = useDisclosure();

  const [copyTxt, setCopyTxt] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    cryptoEncryption(user?._id).then((x) => {
      setCopyTxt(`${window.location.origin}/user-profile/${x}`);
    });
  }, [user]);

  const copyHandle = async () => {
    await navigator.clipboard.writeText(copyTxt);
    setShowTooltip(true);
  };

  useEffect(() => {
    if (showTooltip == true) {
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  }, [showTooltip]);

  return (
    <>
      <Popover
        isOpen={isEditing}
        onOpen={() => setIsEditing(!isEditing)}
        onClose={() => setIsEditing(!isEditing)}
      >
        <PopoverTrigger>
          <Button variant="unstyled" className="button-box">
            <Flex
              direction="row"
              textColor="weekly.light"
              alignItems="center"
              pe="2rem"
              height="100%"
              cursor="pointer"
              {...(isEditing
                ? {
                    backgroundColor: "#B298DC",
                    borderRadius: "8px 8px 0 0",
                  }
                : {})}
            >
              <Box
                width="2rem"
                ml="1rem"
                mr="0.5rem"
                borderRadius="5rem"
                position="relative"
              >
                <Avatar
                  src={data?.user?.image as string}
                  boxSize={8}
                  border={
                    user?.subscriptionId === 1 ? "1px solid #FFCB3D" : "none"
                  }
                />
                {user?.subscriptionId === 1 && (
                  <BsLightningChargeFill
                    color="#FFCB3D"
                    style={{
                      position: "absolute",
                      right: "-3px",
                      bottom: "-4px",
                    }}
                  />
                )}
              </Box>
              <Box px="0.5rem">{isEditing ? <Up /> : <Down />}</Box>
            </Flex>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          background="white"
          borderTopRadius={0}
          w="100%"
          className="button-box"
        >
          <PopoverBody
            p="0"
            boxShadow="0px 8px 24px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4)"
            borderRadius="0 0 8px 8px"
          >
            <Flex direction="column" width="100%">
              <NameItem name="My Profile" to={"/profile/" + user?.authSub} />
              <NameItem name="Habits" to="/habits" />
              <NameItem name="Change Data" to="/activities" />
              <NameItem name="Settings" to="/settings/about" />
              <NameItem
                name="Sign Out"
                onClick={() => signOut({ callbackUrl: "/" })}
              />
              <NameItem
                name="Invite New Friends"
                onClick={() => onOpenInvite()}
                color="#407AEA"
                {...{
                  backgroundColor: "#407AEA1A",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <FriendsPlus />
              </NameItem>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Modal
        isOpen={isOpenInvite}
        onClose={() => onCloseInvite()}
        isCentered
        preserveScrollBarGap
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent border="1px solid #000">
          <Image src={inviteImage} />
          <ModalCloseButton />
          <ModalHeader fontWeight="bold">Invite Friends</ModalHeader>
          <ModalBody mb={4}>
            <Box color="#464545" fontWeight="semibold">
              Invite your connections to Weekly!
            </Box>
            <Box borderBottomWidth="1px" my={3} mx={2} />
            <Box flex="row" display="flex" alignItems="center">
              <Button
                leftIcon={<LinkIcon />}
                variant="unstyled"
                onClick={() => copyHandle()}
                width={130}
                mr={"3"}
              >
                Copy Link
              </Button>
              <Box
                bg="weekly.lightgray"
                w="100%"
                h={45}
                py={2}
                color="weekly.gray"
                fontSize={13}
                fontWeight="normal"
                borderWidth={2}
                borderColor="weekly.gray"
                borderStyle="dashed"
                m="0.5"
                display="flex"
                alignItems="center"
                pl={3}
              >
                {copyTxt}
              </Box>
            </Box>
            {showTooltip && (
              <Text mt="5" fontWeight="semibold" color="#464545">
                The link has been copied to clipboard!
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
