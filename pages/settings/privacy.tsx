/* eslint-disable */
import {
  Box,
  Text,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Switch,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DrawerComp from "../../components/nav/Drawer";

import Navbar from "../../components/nav/NavBarInApp";
import SettingsSidebar from "../../components/nav/SettingsSidebar";

import { API_BASE_URLS } from "../../public/constant";

export default function Privacy() {
  // const { user } = useCurrentUser();
  const [user, setUser] = useState<any>(null);

  // const [showData, setShowData] = useState<string>(
  //   String(
  //     2 -
  //       (user?.settings.onlypeopleyoufollow != undefined &&
  //         user?.settings.onlypeopleyoufollow.BOOL)
  //   ).toString()
  // );
  // console.log(showData);

  useEffect(() => {
    axios.get(API_BASE_URLS.baseUrl + "/api/user/find-user").then((res) => {
      setUser(res?.data?.data);
    });
  }, []);

  const syncSettings = async () => {
    if (!user) return;
    await axios.post(
      API_BASE_URLS.baseUrl + "/api/user/update-privacy-settings",
      {
        competitions: user.settings.competitions,
        privateaccount: user.settings.privateaccount,
        onlypeopleyoufollow: user.settings.onlypeopleyoufollow,
      }
    );

    await axios
      .get(API_BASE_URLS.baseUrl + "/api/user/find-user")
      .then((res) => {
        setUser(res?.data?.data);
      });
  };

  const handleCompetitionsChange = async (val: boolean) => {
    if (!user) return;
    user.settings.competitions = val;
    await syncSettings();
  };

  const handlePrivateAccountChange = async (val: boolean) => {
    if (!user) return;
    user.settings.privateaccount = val;
    await syncSettings();
  };

  const handleOnlyPeopleYouFollowChange = async (val: string) => {
    if (!user) return;
    if (val == "1") {
      user.settings.onlypeopleyoufollow = true;
    } else {
      user.settings.onlypeopleyoufollow = false;
    }
    // setShowData(val);
    await syncSettings();
  };

  return (
    <Box bg="#E5E5E5" minHeight="100%" w="100%">
      <Navbar />
      <DrawerComp />
      <Box display="flex" flexDirection="row" minH="100vh">
        <SettingsSidebar />
        <Box className="settingPageBox">
          <Box className="settingPageBoxInner">
            <Box>
              <Heading mb="25px">Privacy</Heading>
            </Box>
            <Box>
              <Box>
                <Heading mb="20px" fontSize="1.5em">
                  Interactions
                </Heading>
              </Box>
              <Box className="boxPrivacy">
                <Heading fontSize="lg">Private Account</Heading>
                {/* <Spacer /> */}
                <Switch
                  defaultChecked={user?.settings.privateaccount}
                  isChecked={user?.settings.privateaccount}
                  onChange={(ev) =>
                    handlePrivateAccountChange(ev.target.checked)
                  }
                />
              </Box>
              <Box className="boxPrivacy">
                <Heading maxW="300px" fontSize="lg">
                  Competitions
                </Heading>
                {/* <Spacer /> */}
                <Switch
                  defaultChecked={user?.settings.competitions}
                  isChecked={user?.settings.competitions}
                  onChange={(ev) => handleCompetitionsChange(ev.target.checked)}
                />
              </Box>
              <RadioGroup
                className="boxPrivacyRadioGroup"
                colorScheme="purple"
                name="onlypeopleyoufollow"
                onChange={(ev) => handleOnlyPeopleYouFollowChange(ev)}
                value={user?.settings?.onlypeopleyoufollow == true ? "1" : "2"}
                paddingBottom={10}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  fontSize="0.9em"
                >
                  <HStack mb="10px" justifyContent="space-between">
                    <Text>Only People you follow on Weekly</Text>
                    <Radio value="1" />
                  </HStack>
                  <HStack mb="10px" justifyContent="space-between">
                    <Text>No one</Text>
                    <Radio value="2" />
                  </HStack>
                </Box>
              </RadioGroup>
            </Box>
            <Box>
              <Heading maxW="300px" fontSize="lg" mr="50px">
                Blocked Accounts
              </Heading>
              <Box>
                <Text mb="20px" fontSize="md" paddingTop={4}>
                  Complete protect yourself from unwanted communication [they
                  won't know | they will have no access to your account or
                  activity | you will be unable to view their profile]
                </Text>
              </Box>
              <Box>
                <Input placeholder="Username Search" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
