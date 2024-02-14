/* eslint-disable */
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Textarea,
  Checkbox,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BsHandThumbsDownFill,
  BsHandThumbsUpFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";

import NavBar from "../components/nav/NavBarInApp";
import { API_BASE_URLS } from "../public/constant";
import { cryptoEncryption } from "../components/utils/utils";
import { useRouter } from "next/router";
import { useCurrentUser } from "../hooks";
import CompResult from "../components/dialogBox/CompResult";

export type BaseNotificationProps = {
  comment: string;
  _id: string;
  description: string;
  isread: number;
  reason: any[];
  title: string;
  type: string;
  action: number;
  createdAt: string;
  otherInfo: any;
  userId: number;
};

export default function NotificationList() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<BaseNotificationProps[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [itemLen, serItemLen] = useState(0);

  const getNotifications = async () => {
    await axios
      .post(API_BASE_URLS.baseUrl + "/api/activities/get-notifications", {
        page: page,
      })
      .then((res) => {
        if (res?.status === 200) {
          const Items = res?.data?.data?.Items ?? [];
          setNotifications([...notifications, ...Items]);
          setPage(res?.data?.data?.LastKey);
          serItemLen(Items?.length);
        }
      });
  };

  const getNotificationsPageZero = async () => {
    await axios
      .post(API_BASE_URLS.baseUrl + "/api/activities/get-notifications", {
        page: 0,
      })
      .then((res) => {
        if (res?.status === 200) {
          const Items = res?.data?.data?.Items ?? [];
          setNotifications([...Items]);
          setPage(res?.data?.data?.LastKey);
          serItemLen(Items?.length);
        }
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const viewMore = () => {
    getNotifications();
  };

  // positive feedback
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [id, setId] = useState("");

  const handleFeedback = async (Id?: any) => {
    if (message.length > 256) {
      setErrMsg("Message can't be longer than 256 characters");
    } else {
      await axios
        .post(API_BASE_URLS.baseUrl + "/api/activities/like-dislike", {
          Id: Id ? Id : id,
          status: 1,
          comment: message,
          reason: [],
        })
        .then((res) => {
          setMessage("");
          setErrMsg("");
          onClose();
          let arrOfNot = notifications;
          arrOfNot.map((x) => x._id === id && (x.action = 1));
          setNotifications(arrOfNot);
          setId("");
        });
    }
  };

  // negitive feedback
  const {
    isOpen: isOpenNeg,
    onOpen: onOpenNeg,
    onClose: onCloseNeg,
  } = useDisclosure();
  const [messageNeg, setMessageNeg] = useState("");
  const [titleNeg, setTitleNeg] = useState<string[]>([]);
  const [errMsgNeg, setErrMsgNeg] = useState("");

  const submitNegFeedback = async () => {
    if (messageNeg.length > 256) {
      setErrMsgNeg("Message can't be longer than 256 characters");
    } else {
      await axios
        .post(API_BASE_URLS.baseUrl + "/api/activities/like-dislike", {
          Id: id,
          status: 2,
          comment: messageNeg,
          reason: titleNeg,
        })
        .then((res) => {
          setMessageNeg("");
          setErrMsgNeg("");
          setTitleNeg([]);
          onCloseNeg();
          let arrOfNot = notifications;
          arrOfNot.map((x) => x._id === id && (x.action = 2));
          setNotifications(arrOfNot);
          setId("");
        });
    }
  };

  const findCheckedIndex = (title: string) => {
    const trimmedTitle = title.trim().toLocaleLowerCase();
    const isPresentIndex = titleNeg.findIndex(
      (text: string) => text.trim().toLocaleLowerCase() === trimmedTitle
    );
    return isPresentIndex;
  };

  const handleFeedbackNeg = async (e: any, title: string) => {
    let tempTitleNeg = [...titleNeg];
    if (findCheckedIndex(title) > -1) {
      tempTitleNeg.splice(findCheckedIndex(title), 1);
    } else {
      tempTitleNeg = [...tempTitleNeg, title];
    }
    setTitleNeg(tempTitleNeg);
  };

  //handle accept and decline friend request
  const handleActionFriendRequest = (userId: number, type: number) => {
    axios
      .get(
        API_BASE_URLS.baseUrl +
          "/api/friend/action-friend-request/" +
          userId +
          "/" +
          type
      )
      .then((res) => {
        if (res?.status === 200) {
          getNotificationsPageZero();
        }
      });
  };

  const handleAcceptDeclineCompete = (requestId: number, val: number) => {
    axios
      .get(
        API_BASE_URLS.baseUrl +
          "/api/friend/action-compete-request/" +
          requestId +
          "/" +
          val
      )
      .then((res) => {
        if (res?.status === 200) {
          getNotificationsPageZero();
        }
      });
  };

  // competetition result
  const [competeResultData, setCompeteResultData] = useState<any>(null);
  const { user } = useCurrentUser();

  const {
    isOpen: isCompResult,
    onOpen: onCompResultOpen,
    onClose: onCompResultClose,
  } = useDisclosure();

  const competeResultDataAPI = (id: any) => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/compete-details/" + id)
      .then((res) => {
        if (res?.status === 200) {
          setCompeteResultData(res?.data?.data);
        }
      });
  };

  return (
    <>
      <Box w="100%" minH="100vh" bg="#f6feff">
        <NavBar />
        <Box px={[10, 10, 24]} py={10} minH="100vh" bg="white">
          <Heading mb="25px">Notification List</Heading>
          {notifications.map((notf: BaseNotificationProps, i: number) => (
            <Flex
              key={i}
              padding="15px 20px"
              bg={notf.isread === 0 ? "#fff" : "#efefef"}
              marginBlock={5}
              borderRadius={15}
            >
              <Box ml="3" flex={3}>
                <Text fontWeight="bold">{notf.title ?? ""}</Text>
                <Text fontSize="sm">{notf.description ?? ""}</Text>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box
                  paddingLeft={2}
                  flex={2}
                  display="flex"
                  alignItems="center"
                >
                  {notf?.type === "accept_friend_request" && (
                    <Button
                      variant="purple"
                      size="sm"
                      ml="20px"
                      onClick={() =>
                        cryptoEncryption(notf?.otherInfo?.userId).then((x) => {
                          router.push(
                            `${window.location.origin}/user-profile/${x}`
                          );
                        })
                      }
                    >
                      View Profile
                    </Button>
                  )}
                  {notf?.type === "compete_done" && (
                    <Button
                      variant="purple"
                      size="sm"
                      ml="20px"
                      onClick={() => {
                        competeResultDataAPI(notf?.otherInfo?.requestId);
                        onCompResultOpen();
                      }}
                    >
                      Competition Result
                    </Button>
                  )}
                  {notf?.type !== "friend_request" &&
                  notf?.type !== "new_compete" ? (
                    notf?.action === 1 ? (
                      <Box display="flex">
                        <Box paddingLeft={2}>
                          <BsHandThumbsUpFill className="custom-pointer-like" />
                        </Box>
                        <Box paddingLeft={2}>
                          <BsHandThumbsDown />
                        </Box>
                      </Box>
                    ) : notf?.action === 2 ? (
                      <Box display="flex">
                        <Box paddingLeft={2}>
                          <BsHandThumbsUp />
                        </Box>
                        <Box paddingLeft={2}>
                          <BsHandThumbsDownFill className="custom-pointer-like" />
                        </Box>
                      </Box>
                    ) : (
                      <Box display="flex">
                        <Box paddingLeft={2}>
                          <BsHandThumbsUp
                            onClick={() => {
                              onOpen();
                              setId(notf?._id);
                            }}
                            className="custom-pointer"
                          />
                        </Box>
                        <Box paddingLeft={2}>
                          <BsHandThumbsDown
                            onClick={() => {
                              onOpenNeg();
                              setId(notf?._id);
                            }}
                            className="custom-pointer"
                          />
                        </Box>
                      </Box>
                    )
                  ) : (
                    notf.action !== 1 && (
                      <Box>
                        <Button
                          variant="purple"
                          size="sm"
                          ml="20px"
                          className="buttonHover"
                          onClick={() => {
                            // handleActionFriendRequest(
                            //   notf?.otherInfo?.userId,
                            //   1
                            // );
                            // handleFeedback();
                            if (notf.type === "new_compete") {
                              handleAcceptDeclineCompete(
                                notf?.otherInfo?.requestId,
                                1
                              );
                              handleFeedback(notf?._id);
                            } else {
                              handleActionFriendRequest(
                                notf?.otherInfo?.userId,
                                1
                              );
                              handleFeedback(notf?._id);
                            }
                          }}
                        >
                          {notf?.type === "new_compete" ? "Compete" : "Allow"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          ml="20px"
                          className="buttonHover"
                          onClick={() => {
                            // handleActionFriendRequest(
                            //   notf?.otherInfo?.userId,
                            //   0
                            // );
                            // handleFeedback();
                            if (notf?.type === "new_compete") {
                              handleAcceptDeclineCompete(
                                notf?.otherInfo?.requestId,
                                0
                              );
                              handleFeedback(notf?._id);
                            } else {
                              handleActionFriendRequest(
                                notf?.otherInfo?.userId,
                                0
                              );
                              handleFeedback(notf?._id);
                            }
                          }}
                        >
                          Decline
                        </Button>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                fontWeight={notf.isread === 1 ? 400 : 700}
                flex={1}
                className="custom-notf"
              >
                {notf?.createdAt}
              </Box>
            </Flex>
          ))}
          {itemLen >= 10 && (
            <Button
              onClick={viewMore}
              variant="purple"
              fontSize="sm"
              fontWeight="regular"
            >
              View More
            </Button>
          )}
        </Box>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setMessage("");
          setErrMsg("");
          setId("");
        }}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <Box
              padding={2}
              marginRight={2}
              bgColor="#B298DC"
              borderRadius="50%"
            >
              <BsHandThumbsUpFill />
            </Box>
            Provide additional feedback
          </ModalHeader>
          <ModalBody>
            <Textarea
              placeholder="What did you like about this notification?"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrMsg("");
              }}
              mb="10px"
            />
            {errMsg && (
              <Box color="red" mb="20px">
                {errMsg}
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              w="calc(50% - 6px)"
              onClick={() => {
                onClose();
                setMessage("");
                setErrMsg("");
                setId("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="purple"
              mr={3}
              w="calc(50% - 6px)"
              onClick={() => handleFeedback()}
            >
              Submit feedback
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenNeg}
        onClose={() => {
          onCloseNeg();
          setMessageNeg("");
          setErrMsgNeg("");
          setId("");
        }}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <Box
              padding={2}
              marginRight={2}
              bgColor="#FF8A8A"
              borderRadius="50%"
            >
              <BsHandThumbsDownFill />
            </Box>
            Provide additional feedback
          </ModalHeader>
          <ModalBody>
            <Textarea
              placeholder="Please tell us in detail the issue you are having"
              value={messageNeg}
              onChange={(e) => {
                setMessageNeg(e.target.value);
                setErrMsgNeg("");
              }}
              mb="10px"
            />
            {errMsgNeg && (
              <Box color="red" mb="20px">
                {errMsgNeg}
              </Box>
            )}
            <Box display="grid">
              <Checkbox
                color="#4C4F62"
                isChecked={findCheckedIndex("This is harmful / unsafe") > -1}
                onChange={(e) =>
                  handleFeedbackNeg(e, "This is harmful / unsafe")
                }
              >
                This is harmful / unsafe
              </Checkbox>
              <Checkbox
                color="#4C4F62"
                isChecked={findCheckedIndex("This isn't helpful") > -1}
                onChange={(e) => handleFeedbackNeg(e, "This isn't helpful")}
              >
                This isn&apos;t helpful
              </Checkbox>
              <Checkbox
                color="#4C4F62"
                isChecked={findCheckedIndex("This is unwanted") > -1}
                onChange={(e) => handleFeedbackNeg(e, "This is unwanted")}
              >
                This is unwanted
              </Checkbox>
              <Checkbox
                color="#4C4F62"
                isChecked={findCheckedIndex("This isn't true") > -1}
                onChange={(e) => handleFeedbackNeg(e, "This isn't true")}
              >
                This isn&apos;t true
              </Checkbox>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              w="calc(50% - 6px)"
              onClick={() => {
                onCloseNeg();
                setMessageNeg("");
                setErrMsgNeg("");
                setTitleNeg([]);
                setId("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="purple"
              mr={3}
              w="calc(50% - 6px)"
              onClick={submitNegFeedback}
            >
              Submit feedback
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* competition result */}
      <CompResult
        isOpenDialog={isCompResult}
        handleCloseDialog={onCompResultClose}
        competeResultData={competeResultData}
        userName={user?.firstName}
      />
      {/* competition result */}
    </>
  );
}
