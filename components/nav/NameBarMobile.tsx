import { useState } from "react";
import { Box, Text, Avatar } from "@chakra-ui/react";
import { VStack, StackDivider } from "@chakra-ui/layout";
import { signOut, useSession } from "next-auth/react";

import PlainLink from "../utils/PlainLink";
import { useCurrentUser } from "../../hooks";

export default function NameBarMobile() {
  const [open, setOpen] = useState(false);
  const { data } = useSession();
  const { user } = useCurrentUser();
  return (
    <>
      <Box
        width="40px"
        borderRadius="5rem"
        onClick={() => setOpen((p) => !p)}
        display={["block"]}
      >
        <Avatar src={data?.user?.image as string} boxSize={10} />
        {/* {open ? <CloseIcon /> : <Avatar src={data?.user?.image as string} boxSize={10} />} */}
      </Box>
      {open && (
        <VStack
          className="vstackMobile"
          position="absolute"
          top="100%"
          left={0}
          zIndex={999}
          width="100vw"
          height="100vh"
          bgColor="weekly.lightgray"
        >
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
          <PlainLink
            href="/overview"
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              Overview
            </Text>
          </PlainLink>
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
          <PlainLink
            href="/activities"
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              Change Data
            </Text>
          </PlainLink>
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
          {/* <PlainLink
            href="/activities"
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              Report Problem
            </Text>
          </PlainLink>
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" /> */}
          <PlainLink
            href={"/profile/" + user?.authSub}
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              My Profile
            </Text>
          </PlainLink>
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
          <PlainLink
            href="/habits"
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              Habits
            </Text>
          </PlainLink>
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
          <PlainLink
            href="/activities"
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              Change Data
            </Text>
          </PlainLink>
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
          <PlainLink
            href="/settings/about"
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              Settings
            </Text>
          </PlainLink>
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
          <PlainLink
            href="javascript:;"
            onClick={() => signOut({ callbackUrl: "/" })}
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              Sign Out
            </Text>
          </PlainLink>
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
          {/* <PlainLink
            href="javascript:void(0)"
            width="100%"
            paddingY="10px"
            justifyContent="left"
          >
            <Text
              marginLeft="40px"
              fontSize={["xs", "xs", "sm"]}
              color="weekly.black"
              textAlign="left"
            >
              Invite New Friends
            </Text>
          </PlainLink> */}
          <StackDivider height="1px" bg="weekly.cardOutlineGrey" />
        </VStack>
      )}
    </>
  );
}
