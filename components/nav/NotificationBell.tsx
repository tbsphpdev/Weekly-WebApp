/* eslint-disable */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsInfoCircle,
} from "react-icons/bs";
import axios from "axios";

import { BaseNotificationProps } from "../../pages/notification-list";
import Bell from "../svgs/Bell.svg";
import Dot from "../svgs/Dot.svg";
import { cryptoEncryption, remToPx } from "../utils/utils";
import ButtonLink from "../utils/ButtonLink";
import { API_BASE_URLS } from "../../public/constant";
import { CrossedSwords } from "../../pages/user-profile/[slug]";
import { useRouter } from "next/router";
import CompResult from "../dialogBox/CompResult";
import { useCurrentUser } from "../../hooks";

function NotificationBox({
  title,
  description,
  createdAt,
  isread,
  id,
  type,
  otherInfo,
  handleActionFriendRequest,
  action,
  onClosePopup,
}: any) {
  const toast = useToast();
  const router = useRouter();
  // positive feedback
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFeedback = async () => {
    if (message.length > 256) {
      setErrMsg("Message can't be longer than 256 characters");
    } else {
      await axios
        .post(API_BASE_URLS.baseUrl + "/api/activities/like-dislike", {
          Id: id,
          status: 1,
          comment: message,
          reason: [],
        })
        .then(() => {
          setMessage("");
          setErrMsg("");
          onClose();
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
  const [competeResultData, setCompeteResultData] = useState<any>(null);
  const { user } = useCurrentUser();

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
        .then(() => {
          setMessageNeg("");
          setErrMsgNeg("");
          setTitleNeg([]);
          onCloseNeg();
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

  // competition result
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

  // compete information
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();

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
        }
      })
      .catch((err) => {});
  };

  return (
    <Box py="0.9rem">
      <Flex flexDirection="row" alignItems="center" gap="0.5rem">
        <Box flexGrow={1}>
          <Text as="span" fontWeight="600" textColor="weekly.darkBlue">
            {title}
            {description && ":"}
          </Text>
          {description && (
            <Text as="span" fontWeight="400" textColor="black">
              {" "}
              {description}
            </Text>
          )}
        </Box>
        {isread === 0 && <Dot width="0.5rem" height="0.5rem" color="#AFE1EC" />}
      </Flex>
      <Flex
        flexDirection="row"
        alignItems="center"
        alignContent="flex-start"
        pt="0.375rem"
        justifyItems="flex-start"
        justifyContent="flex-start"
      >
        <Text
          justifySelf="start"
          fontSize="0.75rem"
          fontWeight="500"
          textColor="weekly.aqua"
        >
          {createdAt}
        </Text>
        {type === "accept_friend_request" && (
          <Button
            variant="purple"
            size="sm"
            ml="20px"
            onClick={() =>
              cryptoEncryption(otherInfo?.userId).then((x) => {
                router.push(`${window.location.origin}/user-profile/${x}`);
              })
            }
          >
            View Profile
          </Button>
        )}
        {type !== "friend_request" && type !== "new_compete" ? (
          action === 1 ? (
            <Box display="flex">
              <Box paddingLeft={2}>
                <BsHandThumbsUpFill className="custom-pointer-like" />
              </Box>
              <Box paddingLeft={2}>
                <BsHandThumbsDown />
              </Box>
            </Box>
          ) : action === 2 ? (
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
                  onClick={() => onOpen()}
                  className="custom-pointer"
                />
              </Box>
              <Box paddingLeft={2}>
                <BsHandThumbsDown
                  onClick={() => onOpenNeg()}
                  className="custom-pointer"
                />
              </Box>
            </Box>
          )
        ) : (
          action !== 1 && (
            <Box display="flex">
              <Button
                variant="purple"
                size="sm"
                ml="20px"
                className="buttonHover"
                onClick={() => {
                  if (type === "new_compete") {
                    handleAcceptDeclineCompete(otherInfo?.requestId, 1);
                    onCloseInfo();
                    handleFeedback();
                    onClosePopup();
                  } else {
                    handleActionFriendRequest(otherInfo?.userId, 1);
                    handleFeedback();
                    onClosePopup();
                  }
                }}
              >
                {type === "new_compete" ? "Compete" : "Allow"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                ml="20px"
                mr="10px"
                className="buttonHover"
                onClick={() => {
                  if (type === "new_compete") {
                    handleAcceptDeclineCompete(otherInfo?.requestId, 0);
                    onCloseInfo();
                    handleFeedback();
                    onClosePopup();
                  } else {
                    handleActionFriendRequest(otherInfo?.userId, 0);
                    handleFeedback();
                    onClosePopup();
                  }
                }}
              >
                Decline
              </Button>
            </Box>
          )
        )}
        {type === "new_compete" && (
          <Box paddingLeft={2}>
            <BsInfoCircle
              className="custom-pointer"
              onClick={() => onOpenInfo()}
            />
          </Box>
        )}

        {type === "compete_done" && (
          <Button
            variant="purple"
            size="sm"
            ml="20px"
            onClick={() => {
              competeResultDataAPI(otherInfo?.requestId);
              onCompResultOpen();
            }}
          >
            Competition Result
          </Button>
        )}

        {/* positive feedback */}
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setMessage("");
            setErrMsg("");
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
                <BsHandThumbsUp />
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
        {/* positive feedback */}

        {/* negative feedback */}
        <Modal
          isOpen={isOpenNeg}
          onClose={() => {
            onCloseNeg();
            setMessageNeg("");
            setErrMsgNeg("");
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
                <BsHandThumbsDown />
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
        {/* negative feedback */}

        {/* compete info */}
        <Modal
          isOpen={isOpenInfo}
          onClose={() => onCloseInfo()}
          isCentered
          preserveScrollBarGap
          size="lg"
        >
          <ModalOverlay />
          <ModalContent border="1px solid #000">
            <ModalHeader fontSize="2xl" display="flex" alignItems="center">
              Competition Information 🤓
            </ModalHeader>
            <ModalBody>
              <Flex>
                <Text fontSize="lg" color="#000" fontWeight="semibold">
                  Competition Type 💻:
                </Text>
                <Text
                  fontSize="lg"
                  color="#464545"
                  fontWeight="semibold"
                  ml="10px"
                >
                  {otherInfo?.category}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize="lg" color="#000" fontWeight="semibold">
                  Competition Length ⏳:
                </Text>
                <Text
                  fontSize="lg"
                  color="#464545"
                  fontWeight="semibold"
                  ml="10px"
                >
                  {otherInfo?.time === 1
                    ? "1 Day"
                    : otherInfo?.time == 7
                    ? "1 Week"
                    : "1 Month"}
                </Text>
              </Flex>
              <Flex>
                <Text
                  fontSize="lg"
                  color="#000"
                  fontWeight="semibold"
                  w="150px"
                >
                  Comments 🗣️:
                </Text>
                <Text
                  fontSize="lg"
                  color="#464545"
                  fontWeight="semibold"
                  ml="10px"
                >
                  {otherInfo?.comment}
                </Text>
              </Flex>
            </ModalBody>
            {action == 0 && (
              <ModalFooter>
                <Button
                  variant="outline"
                  mr={3}
                  w="calc(50% - 6px)"
                  onClick={() => {
                    handleAcceptDeclineCompete(otherInfo?.requestId, 0);
                    onCloseInfo();
                  }}
                >
                  Decline
                </Button>
                <Button
                  rightIcon={<CrossedSwords />}
                  variant="purple"
                  mr={3}
                  w="calc(50% - 6px)"
                  onClick={() => {
                    handleAcceptDeclineCompete(otherInfo?.requestId, 1);
                    onCloseInfo();
                  }}
                >
                  Compete
                </Button>
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
        {/* compete info */}

        {/* competition result */}
        <CompResult
          isOpenDialog={isCompResult}
          handleCloseDialog={onCompResultClose}
          competeResultData={competeResultData}
          userName={user?.firstName}
        />
        {/* competition result */}
      </Flex>
    </Box>
  );
}

function ActionNotification({
  notf,
  handleActionFriendRequest,
  onClosePopup,
}: any) {
  return (
    <NotificationBox
      title={notf.title}
      description={notf.description}
      createdAt={notf.createdAt}
      isread={notf.isread}
      id={notf._id}
      type={notf.type}
      otherInfo={notf.otherInfo}
      handleActionFriendRequest={handleActionFriendRequest}
      action={notf.action}
      onClosePopup={onClosePopup}
    />
  );
}

export default function NameItem({
  count,
  notifications,
  handleChangeNotificationData,
  handleActionFriendRequest,
}: {
  count: number;
  notifications: BaseNotificationProps[];
  handleChangeNotificationData: any;
  handleActionFriendRequest: any;
}) {
  const {
    onOpen: onOpenPopup,
    onClose: onClosePopup,
    isOpen: isOpenPopup,
  } = useDisclosure();

  return (
    <Box ps="1rem">
      <Popover
        placement="bottom-start"
        offset={[remToPx(2.75), remToPx(1.75)]}
        isOpen={isOpenPopup}
        onOpen={onOpenPopup}
        onClose={onClosePopup}
      >
        <PopoverTrigger>
          <Box
            position="relative"
            cursor="pointer"
            onClick={() => handleChangeNotificationData()}
          >
            <Bell />
            {count === 0 ? (
              <></>
            ) : (
              <Flex
                position="absolute"
                top="-0.55rem"
                right="-0.55rem"
                backgroundColor="weekly.notification"
                borderRadius="5rem"
                border="2px solid #505D6F"
                width="1.25rem"
                height="1.25rem"
                lineHeight="1rem"
                alignContent="center"
                justifyContent="center"
              >
                <Text
                  as="span"
                  fontFamily="noto-sans"
                  fontSize="0.5rem"
                  fontWeight="600"
                  color="white"
                  textAlign="center"
                  whiteSpace="nowrap"
                  userSelect="none"
                >
                  {count}
                </Text>
              </Flex>
            )}
          </Box>
        </PopoverTrigger>
        <PopoverContent width="22rem" p="0.5rem">
          <PopoverArrow />
          <PopoverHeader
            pt="0.5rem"
            pb="0.25rem"
            px="0.75rem"
            borderBottom="none"
          >
            <Heading fontSize="1rem" fontWeight="600" textColor="black">
              Notifications
            </Heading>
          </PopoverHeader>
          <PopoverBody fontSize="0.875rem">
            {notifications
              .slice(0, 3)
              .map((notf: BaseNotificationProps, i: number) => {
                return (
                  <ActionNotification
                    notf={notf}
                    key={i}
                    handleActionFriendRequest={handleActionFriendRequest}
                    onClosePopup={onClosePopup}
                  />
                );
              })}
            <ButtonLink
              href="/notification-list"
              variant="purple"
              fontSize="sm"
              fontWeight="regular"
            >
              View More
            </ButtonLink>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
