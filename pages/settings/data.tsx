/* eslint-disable */
import {
  Box,
  Text,
  Heading,
  Switch,
  Spacer,
  Radio,
  RadioGroup,
  Select,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/nav/NavBarInApp";
import DownTriangle from "../../components/accordion/DownTriangleIcon";
import SettingsSidebar from "../../components/nav/SettingsSidebar";

import { API_BASE_URLS } from "../../public/constant";
import DrawerComp from "../../components/nav/Drawer";

export default function Data() {
  // const { user } = useCurrentUser();
  const [user, setUser] = useState<any>(null);

  const hours: string[] = [
    "12:00 am",
    "1:00 am",
    "2:00 am",
    "3:00 am",
    "4:00 am",
    "5:00 am",
    "6:00 am",
    "7:00 am",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
    "7:00 pm",
    "8:00 pm",
    "9:00 pm",
    "10:00 pm",
    "11:00 pm",
  ];

  // const [showData, setShowData] = useState<string>(
  //   String(
  //     2 -
  //       (user?.settings.showdatanoone != undefined &&
  //         user?.settings.showdatanoone.BOOL)
  //   ).toString()
  // );

  useEffect(() => {
    axios.get(API_BASE_URLS.baseUrl + "/api/user/find-user").then((res) => {
      setUser(res?.data?.data);
    });
  }, []);

  // console.log(user);
  const syncSettings = async () => {
    if (!user) return;
    // console.log(user);
    // let startW = { S: "" };
    // if (user.settings.startworking !== undefined) {
    //   startW = user.settings.startworking;
    // }
    // let stopW = { S: "" };
    // if (user.settings.stopworking !== undefined) {
    //   stopW = user.settings.stopworking;
    // }
    // console.log("start");
    // console.log(startW);
    // console.log("stop");
    // console.log(stopW);

    await axios.post(API_BASE_URLS.baseUrl + "/api/user/update-settings-data", {
      pausetimetracking: user.settings.pausetimetracking,
      troubleshooting: user.settings.troubleshooting,
      showdatanoone: user.settings.showdatanoone,
      startworking: user.settings.startworking,
      stopworking: user.settings.stopworking,
    });

    await axios
      .get(API_BASE_URLS.baseUrl + "/api/user/find-user")
      .then((res) => {
        setUser(res?.data?.data);
      });
  };
  const handlePauseTimeTrackingChange = async (val: boolean) => {
    if (!user) return;
    user.settings.pausetimetracking = val;
    await syncSettings();
  };

  const handleTroubleshootingChange = async (val: boolean) => {
    if (!user) return;
    user.settings.troubleshooting = val;
    await syncSettings();
  };

  const handleShowDataNoOneChange = async (val: string) => {
    if (!user) return;
    if (val == "1") {
      user.settings.showdatanoone = true;
    } else {
      user.settings.showdatanoone = false;
    }
    // setShowData(val);
    await syncSettings();
  };

  const handleStartWorkingChange = async (val: string) => {
    if (!user) return;
    user.settings.startworking = val;
    await syncSettings();
  };

  const handleStopWorkingChange = async (val: string) => {
    if (!user) return;
    user.settings.stopworking = val;
    await syncSettings();
  };

  return (
    <Box
      bg="#E5E5E5"
      height="100%"
      // display="flex"
      // flexDirection="column"
      // w={["fit-content", "fit-content", "fit-content", "100%"]}
      w={"100%"}
    >
      <Navbar />
      <DrawerComp />
      <Box flex="1" display="flex" flexDirection="row">
        <SettingsSidebar />
        <Box className="settingPageBox">
          <Box className="settingPageBoxInner">
            <Box>
              <Heading mb="25px">Data</Heading>
            </Box>
            <Box>
              <Box>
                <Heading mb="20px" fontSize="1.5em" mr="40px">
                  Time Tracking
                </Heading>
              </Box>
              <Box
                mb="30px"
                display="flex"
                flexDirection="row"
                alignItems="baseline"
                w={["340px", "375px"]}
              >
                <Heading fontSize="lg">Pause Time Tracking</Heading>
                <Spacer />
                <Switch
                  defaultChecked={user?.settings.pausetimetracking}
                  isChecked={user?.settings.pausetimetracking}
                  onChange={(ev) =>
                    handlePauseTimeTrackingChange(ev.target.checked)
                  }
                />
              </Box>
              <Box
                mb="40px"
                display="flex"
                flexDirection="row"
                alignItems="baseline"
                w={["340px", "375px"]}
              >
                <Heading maxW="300px" fontSize="lg" mr="50px">
                  Weekly support can access your data for troubleshooting
                </Heading>
                <Spacer />
                <Switch
                  defaultChecked={user?.settings.troubleshooting}
                  isChecked={user?.settings.troubleshooting}
                  onChange={(ev) =>
                    handleTroubleshootingChange(ev.target.checked)
                  }
                />
              </Box>
              <Box
                fontSize="0.9em"
                display="flex"
                flexDirection="row"
                w={["340px", "340px"]}
                justifyContent="space-between"
                mb="30px"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  p="10px"
                  h="100px"
                  justifyContent="space-between"
                >
                  <Text>When do you start working</Text>
                  <Select
                    icon={<DownTriangle />}
                    iconSize="10px"
                    fontSize="0.98em"
                    w={["150px", "115px"]}
                    bg="#F6F6F6"
                    value={
                      user?.settings.startworking
                        ? user?.settings.startworking
                        : "9:00 am"
                    }
                    onChange={(ev) => handleStartWorkingChange(ev.target.value)}
                  >
                    {hours.map((hour, id) => (
                      <option key={id} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  p="10px"
                  h="100px"
                  justifyContent="space-between"
                >
                  <Text>When do you stop working</Text>
                  <Select
                    icon={<DownTriangle />}
                    iconSize="10px"
                    fontSize="0.98em"
                    w={["150px", "115px"]}
                    bg="#F6F6F6"
                    value={
                      user?.settings.stopworking
                        ? user?.settings.stopworking
                        : "5:00 pm"
                    }
                    onChange={(ev) => handleStopWorkingChange(ev.target.value)}
                  >
                    {hours.map((hour, id) => (
                      <option key={id} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Box>
            </Box>
            {/* <Box>
              <Heading mb="20px" fontSize="1.5em" mr="50px">
                Data Visualization
              </Heading>
              <Box>
                <Heading mb="20px" fontSize="lg" mr="100px">
                  Show Data
                </Heading>
                <RadioGroup
                  colorScheme="purple"
                  name="showdatanoone"
                  onChange={(ev) => handleShowDataNoOneChange(ev)}
                  value={user?.settings?.showdatanoone == true ? "1" : "2"}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    fontSize="0.9em"
                  >
                    <HStack
                      w={["340px", "375px"]}
                      mb="10px"
                      justifyContent="space-between"
                    >
                      <Text>No one</Text>
                      <Radio value="1" />
                    </HStack>
                    <HStack
                      w={["340px", "375px"]}
                      mb="10px"
                      justifyContent="space-between"
                    >
                      <Text>Only your friends</Text>
                      <Radio value="2" />
                    </HStack>
                  </Box>
                </RadioGroup>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
