/* eslint-disable */
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";

import FriendsPlus from "../svgs/FriendsPlus.svg";
import Friends from "../svgs/Friends.svg";
import { capitalizeFirstLetter, cryptoEncryption } from "../utils/utils";
import { BsLightningChargeFill } from "react-icons/bs";
import DialogBox from "../dialogBox/DialogBox";
import { useRouter } from "next/router";

export default function SearchResult({
  image,
  firstName,
  lastName,
  isfollow,
  isfriend,
  _id,
  subscription,
  handleFrinendRequest,
  handleFrinendRemove,
}: {
  firstName: string;
  image: string;
  isfollow: string;
  isfriend: any;
  lastName: string;
  _id: number;
  subscription: number;
  handleFrinendRequest: any;
  handleFrinendRemove: any;
}) {
  const {
    isOpen: isRemoveFriendOpen,
    onOpen: onRemoveFriendOpen,
    onClose: onRemoveFriendClose,
  } = useDisclosure();

  function handleRemove() {
    onRemoveFriendClose();
    handleFrinendRemove(_id);
  }

  const router = useRouter();

  return (
    <Flex
      alignItems="center"
      borderBottom="1px solid rgba(0, 0, 0, 0.08);"
      py="3px"
    >
      <Box
        display="flex"
        alignItems="center"
        className={
          isfriend === "-"
            ? "search-unfrnd-hover"
            : isfriend === 1
            ? "search-frnd-hover"
            : "search-unfrnd-hover"
        }
        w="100%"
        py="1.4rem"
      >
        <Box
          width="2rem"
          mx="0.75rem"
          borderRadius="10rem"
          style={{
            border: subscription === 1 ? "2px solid #FFCB3D" : "none",
            position: "relative",
          }}
        >
          <Image
            layout="responsive"
            src={image}
            alt={`${firstName}'s Profile Image`}
            height={20}
            width={20}
            style={{ borderRadius: "100%", cursor: "pointer" }}
            onClick={() => {
              // router.push({
              //   pathname: "/profile",
              //   query: { id: _id },
              // });
              cryptoEncryption(_id).then((x) => {
                router.push(`${window.location.origin}/user-profile/${x}`);
              });
            }}
          />
          {subscription === 1 && (
            <BsLightningChargeFill
              color="#FFCB3D"
              style={{ position: "absolute", right: "-3px", bottom: "-4px" }}
            />
          )}
        </Box>
        <Box
          fontWeight="medium"
          flexGrow={1}
          cursor="pointer"
          onClick={() => {
            // router.push({
            //   pathname: "/profile",
            //   query: { id: _id },
            // });
            cryptoEncryption(_id).then((x) => {
              router.push(`${window.location.origin}/user-profile/${x}`);
            });
          }}
        >
          {capitalizeFirstLetter(firstName)} {capitalizeFirstLetter(lastName)}
        </Box>
        <Flex direction="row" alignItems="center" mx="0.75rem">
          {isfriend === "-" ? (
            <Box
              className="custom-pointer"
              onClick={() => handleFrinendRequest(_id)}
            >
              <FriendsPlus />
            </Box>
          ) : isfriend === 1 ? (
            <Box
              className="custom-pointer"
              onClick={() => onRemoveFriendOpen()}
            >
              <Friends />
            </Box>
          ) : (
            <Button
              size="sm"
              variant="outline"
              borderColor="#407AEA"
              color="purple"
              fontWeight="normal"
              onClick={
                () => handleRemove()
                // onRemoveFriendOpen()
              }
            >
              Invited
            </Button>
          )}

          {/* remove friend dialbox */}
          <DialogBox
            isOpenDialog={isRemoveFriendOpen}
            handleCloseDialog={() => onRemoveFriendClose()}
            handleBtn1Click={() => handleRemove()}
            headerColor="red"
            headerText="Remove Friend"
            discriptionText={`Do you want to remove ${firstName} as a friend?`}
            btnName1="Yes"
            btnName2="Cancel"
          />
          {/* remove friend dialbox */}
        </Flex>
      </Box>
    </Flex>
  );
}
