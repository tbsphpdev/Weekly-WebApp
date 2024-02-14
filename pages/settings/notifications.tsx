/* eslint-disable */
import {
  Box,
  Text,
  Heading,
  AccordionPanel,
  Switch,
  Spacer,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/nav/NavBarInApp";
import Accordion from "../../components/accordion/Accordion";
import AccordionItem from "../../components/accordion/AccordionItem";
import AccordionButton from "../../components/accordion/AccordionButton";
import RightTriangle from "../../components/accordion/RightTriangleIcon";
import DownTriangle from "../../components/accordion/DownTriangleIcon";
import SettingsSidebar from "../../components/nav/SettingsSidebar";

import { API_BASE_URLS } from "../../public/constant";
import DrawerComp from "../../components/nav/Drawer";

export default function Notifications() {
  // const { user } = useCurrentUser();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get(API_BASE_URLS.baseUrl + "/api/user/find-user").then((res) => {
      setUser(res?.data?.data);
    });
  }, []);

  const syncSettings = async () => {
    if (!user) return;
    await axios.post(
      API_BASE_URLS.baseUrl + "/api/user/update-notification-settings",
      {
        allowfriends: user.settings.allowfriends,
        // user.settings.allowfriends !== undefined &&
        // user.settings.allowfriends.BOOL,
        newfriends: user.settings.newfriends,
        // user.settings.newfriends !== undefined &&
        // user.settings.newfriends.BOOL,
        acceptingnewreqs: user.settings.acceptingnewreqs,
        // user.settings.acceptingnewreqs !== undefined &&
        // user.settings.acceptingnewreqs.BOOL,
        messagesoff: user.settings.messagesoff,
        // user.settings.messagesoff !== undefined &&
        // user.settings.messagesoff.BOOL,
        messagereqs: user.settings.messagereqs,
        // user.settings.messagereqs !== undefined &&
        // user.settings.messagereqs.BOOL,
        reminders: user.settings.reminders,
        // user.settings.reminders !== undefined && user.settings.reminders.BOOL,
        newsemails: user.settings.newsemails,
        // user.settings.newsemails !== undefined &&
        // user.settings.newsemails.BOOL,
        reminderemails: user.settings.reminderemails,
        // user.settings.reminderemails !== undefined &&
        // user.settings.reminderemails.BOOL,
        feedbackemails: user.settings.feedbackemails,
        // user.settings.feedbackemails !== undefined &&
        // user.settings.feedbackemails.BOOL,
        supportemails: user.settings.supportemails,
        // user.settings.supportemails !== undefined &&
        // user.settings.supportemails.BOOL,
      }
    );
    // await axios
    //   .get(API_BASE_URLS.baseUrl + "/api/user/find-user")
    //   .then((res) => {
    //     setUser(res?.data?.data);
    //   });
  };

  const handleAllowFriendsChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.allowfriends = { BOOL: val };
    user.settings.allowfriends = val;
    await syncSettings();
  };
  const handleNewFriendsChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.newfriends = { BOOL: val };
    user.settings.newfriends = val;
    await syncSettings();
  };

  const handleAcceptingNewReqsChange = async (val: boolean) => {
    // user.settings.acceptingnewreqs = { BOOL: val };
    user.settings.acceptingnewreqs = val;
    await syncSettings();
  };

  const handleMessagesOffChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.messagesoff = { BOOL: val };
    user.settings.messagesoff = val;
    await syncSettings();
  };

  const handleMessageReqsChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.messagereqs = { BOOL: val };
    user.settings.messagereqs = val;
    await syncSettings();
  };

  const handleRemindersChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.reminders = { BOOL: val };
    user.settings.reminders = val;
    setUser({ ...user, settings: { ...user.settings, reminders: val } });
    await syncSettings();
  };

  const handleNewsEmailsChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.newsemails = { BOOL: val };
    user.settings.newsemails = val;
    setUser({ ...user, settings: { ...user.settings, newsemails: val } });
    await syncSettings();
  };

  const handleReminderEmailsChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.reminderemails = { BOOL: val };
    user.settings.reminderemails = val;
    setUser({ ...user, settings: { ...user.settings, reminderemails: val } });
    await syncSettings();
  };

  const handleFeedbackEmailsChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.feedbackemails = { BOOL: val };
    user.settings.feedbackemails = val;
    setUser({ ...user, settings: { ...user.settings, feedbackemails: val } });
    await syncSettings();
  };

  const handleSupportEmailsChange = async (val: boolean) => {
    if (!user) return;
    // user.settings.supportemails = { BOOL: val };
    user.settings.supportemails = val;
    setUser({ ...user, settings: { ...user.settings, supportemails: val } });
    await syncSettings();
  };

  return (
    <Box
      bg="#E5E5E5"
      height="100%"
      // display="flex"
      // flexDir="column"
      // width={["fit-content", "fit-content", "fit-content", "100%"]}
      w={"100%"}
    >
      <Navbar />
      <DrawerComp />
      <Box display="flex" flexDirection="row" h="100%">
        <SettingsSidebar />
        <Box className="settingPageBox">
          <Box className="settingPageBoxInner">
            <Heading pl="5px" mb="25px" size="lg">
              Notifications
            </Heading>
            <Box
              pl="5px"
              mb="40px"
              display="flex"
              flexDirection="row"
              alignItems="baseline"
            >
              {/* <Heading fontSize="1.3em" mr="50px">
                Pause All
              </Heading>
              <Switch /> */}
            </Box>
            <Box w={["100%", "100%", "100%", "80%"]}>
              <Accordion>
                {/* <AccordionItem>
                  {(isExpanded: any) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <strong>Friends</strong>
                          </Box>
                          <AccordionIcon />
                       
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <Box width={["100%", "55%", "85%", "75%"]} ml="-5px">
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>Allow Friends</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.allowfriends}
                              isChecked={user?.settings.allowfriends}
                              onChange={(ev) =>
                                handleAllowFriendsChange(ev.target.checked)
                              }
                            />
                          </Box>
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>New Friends</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.newfriends}
                              isChecked={user?.settings.newfriends}
                              onChange={(ev) =>
                                handleNewFriendsChange(ev.target.checked)
                              }
                            />
                          </Box>
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>Accepting New Friend Requests</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.acceptingnewreqs}
                              isChecked={user?.settings.acceptingnewreqs}
                              onChange={(ev) =>
                                handleAcceptingNewReqsChange(ev.target.checked)
                              }
                            />
                          </Box>
                        </Box>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
                <AccordionItem>
                  {(isExpanded: any) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <strong>Messages</strong>
                          </Box>
                          <AccordionIcon />                      
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <Box width={["100%", "55%", "85%", "75%"]} ml="-5px">
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>Off</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.messagesoff}
                              isChecked={user?.settings.messagesoff}
                              onChange={(ev) =>
                                handleMessagesOffChange(ev.target.checked)
                              }
                            />
                          </Box>
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>Message Requests</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.messagereqs}
                              isChecked={user?.settings.messagereqs}
                              onChange={(ev) =>
                                handleMessageReqsChange(ev.target.checked)
                              }
                            />
                          </Box>
                        </Box>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem> */}
                <AccordionItem>
                  {(isExpanded: any) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <strong>From Weekly</strong>
                          </Box>
                          <AccordionIcon />
                          {/* {isExpanded ? (
                            <DownTriangle fontSize="12px" />
                          ) : (
                            <RightTriangle fontSize="12px" />
                          )} */}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <Box width={["100%", "55%", "85%", "75%"]} ml="-5px">
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>Reminders</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.reminders}
                              isChecked={user?.settings.reminders}
                              onChange={(ev) =>
                                handleRemindersChange(ev.target.checked)
                              }
                            />
                          </Box>
                        </Box>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
                <AccordionItem>
                  {(isExpanded: any) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <strong>Email and SMS Notifications</strong>
                          </Box>
                          <AccordionIcon />
                          {/* {isExpanded ? (
                            <DownTriangle fontSize="12px" />
                          ) : (
                            <RightTriangle fontSize="12px" />
                          )} */}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <Box width={["100%", "55%", "85%", "75%"]} ml="-5px">
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>News Emails</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.newsemails}
                              isChecked={user?.settings.newsemails}
                              onChange={(ev) =>
                                handleNewsEmailsChange(ev.target.checked)
                              }
                            />
                          </Box>
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>Reminder Emails</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.reminderemails}
                              isChecked={user?.settings.reminderemails}
                              onChange={(ev) =>
                                handleReminderEmailsChange(ev.target.checked)
                              }
                            />
                          </Box>
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>Feedback Emails</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={user?.settings.feedbackemails}
                              isChecked={user?.settings.feedbackemails}
                              onChange={(ev) =>
                                handleFeedbackEmailsChange(ev.target.checked)
                              }
                            />
                          </Box>
                          <Box mb="15px" display="flex" flexDirection="row">
                            <Text>Support Emails</Text>
                            <Spacer />
                            <Switch
                              defaultChecked={
                                user?.settings.supportemails?.BOOL
                              }
                              isChecked={user?.settings.supportemails}
                              onChange={(ev) =>
                                handleSupportEmailsChange(ev.target.checked)
                              }
                            />
                          </Box>
                        </Box>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
