/* eslint-disable */
import { Box, Center, Flex, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { AdvProfileComp } from "../../components/adv/AdvComp";
import DialogBox from "../../components/dialogBox/DialogBox";
import NavBar from "../../components/nav/NavBarInApp";
import {
  capitalizeFirstLetter,
  deleteAllCookies,
  getCookie,
} from "../../components/utils/utils";
import Competitions from "../../components/your-profile/Competitions";
import LastComponent from "../../components/your-profile/LastComponent";
import TopComponent from "../../components/your-profile/TopComponent";
import { useCurrentUser } from "../../hooks";
import { API_BASE_URLS } from "../../public/constant";

export default function Profile() {
  const { user } = useCurrentUser();
  const [displayCookies, setDisplayCookies] = useState(true);
  const [friendList, setFriendList] = useState([]);
  const [lab, setLab] = useState([]);
  const [val, setVal] = useState([]);

  const {
    isOpen: isDeactiveOpen,
    onOpen: onDeactiveOpen,
    onClose: onDeactiveClose,
  } = useDisclosure();

  const { update } = useSession();

  useEffect(() => {
    checkCookie();
    getMyFriendList();
  }, []);

  useEffect(() => {
    if (user && user._id > 0) {
      getTodayOverviewAPI();
    }
  }, [user]);

  useEffect(() => {
    if (user?.isdeactive === 1) {
      onDeactiveOpen();
    }
  }, [user]);

  function checkCookie() {
    let displayCks = getCookie("displayProfileAdv");
    setDisplayCookies(!displayCks);
  }

  //get user today overview api
  const getTodayOverviewAPI = () => {
    axios
      .get(
        API_BASE_URLS.baseUrl + "/api/friend/user-today-overview/" + user?._id
      )
      .then((res) => {
        if (res?.status === 200) {
          delete res?.data?.data?.total;
          let a: any = Object.keys(res?.data?.data);
          setLab(a.map((x: string) => capitalizeFirstLetter(x)));
          let b: any = Object.values(res?.data?.data);
          let c = b?.map((x: any) => Math.round(x / 3600));
          setVal(c);
        }
      });
  };

  //get my friend list API
  const getMyFriendList = () => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/my-friends-list")
      .then((res) => {
        if (res?.status === 200) {
          setFriendList(res?.data?.data);
        }
      });
  };

  const handleReactiveAccount = () => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/user/recover-account")
      .then((res) => {
        onDeactiveClose();
      });
  };

  const handleNo = async () => {
    onDeactiveClose();
    await update((prev: any) => ({}));
    deleteAllCookies();
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Flex w="100%" height="100%" flexDirection="column">
        <NavBar />
        <Box flexGrow={1} bg="weekly.lightgray">
          <TopComponent
            friendCount={friendList?.length}
            competeCount={user?.competecount}
          />
        </Box>
        {user?.subscriptionId === 0 && displayCookies && (
          <Center w="85%" alignSelf="center" mt="10px">
            <AdvProfileComp />
          </Center>
        )}
        {/* {friend ? <FriendTopComponent /> : <TopComponent />} */}

        {/* {user?.subscriptionId === 1 && (
          <> */}
        <Competitions type="own_profile" />
        {lab.length > 0 && val.length > 0 && (
          <LastComponent
            friendList={friendList}
            setFriendList={setFriendList}
            lab={lab}
            val={val}
          />
        )}
        {/* </>
        )} */}
      </Flex>
      <DialogBox
        isOpenDialog={isDeactiveOpen}
        handleCloseDialog={handleNo}
        handleBtn1Click={handleReactiveAccount}
        headerColor="red"
        headerText="Activate your account"
        discriptionText="Are you sure you want to activate your account?"
        btnName1="Yes"
        btnName2="No"
        headerclosebtn={false}
        closeOnOverlayClick={false}
      />
    </>
  );
}
