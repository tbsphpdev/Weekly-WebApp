/* eslint-disable */
import { Box } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import NavBar from "../components/nav/NavBarInApp";

export default function Profile() {
  const router = useRouter();
  const { data } = useSession();

  let tempData: {
    authSub: string;
    isNew: boolean;
    accessToken: string;
    expires?: any;
    user?: any;
    typeCheck: string;
  } = {
    authSub: "",
    isNew: false,
    accessToken: "",
    typeCheck: "",
    ...data,
  };

  router.replace("/profile/" + tempData?.authSub);

  return (
    <Box h="100%" bg="weekly.lightgray">
      <NavBar />
    </Box>
  );
}
