/* eslint-disable */
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import useUserDetails from "../../hooks/useUserDetails";
import CloseIcon from "../svgs/CloseIcon.svg";

import Search from "../svgs/Search.svg";

import SearchResult from "./SearchResult";

export default function SearchBar({
  handleFrinendRequest,
  handleFrinendRemove,
}: {
  handleFrinendRequest: any;
  handleFrinendRemove: any;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { search, setSearch, friendList } = useUserDetails();

  return (
    <Popover gutter={0} matchWidth initialFocusRef={inputRef}>
      <PopoverTrigger>
        <InputGroup
          className="mobileInputGroup"
          flex="0 1 20rem"
          height="100%"
          display="flex"
          alignItems="center"
        >
          <Input
            height="2.25rem"
            width="100%"
            backgroundColor="weekly.lightBis"
            border="1px solid #DADADA"
            borderRadius="4px"
            placeholder="Search"
            _placeholder={{
              color: "var(--chakra-colors-weekly-textSecondary)",
              fontWeight: "500",
            }}
            color="weekly.grey"
            fontWeight="500"
            ps="1rem"
            ref={inputRef}
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            onKeyPress={(event: any) => {
              if (event.key === "Enter") {
                router.push("/search-list");
              }
            }}
          />
          <InputRightElement
            mr="0.75rem"
            height="2.25rem"
            top="unset"
            onClick={() => setSearch("")}
            cursor="pointer"
          >
            {search.length > 0 ? <CloseIcon /> : <Search />}
          </InputRightElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent background="white" borderTopRadius={0}>
        <PopoverBody
          py="0"
          boxShadow="0px 8px 24px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4)"
          borderRadius="0 0 8px 8px"
          maxHeight="420px"
          overflow="auto"
          height="auto"
        >
          <Flex width="100%" px="1rem" direction="column">
            {friendList?.map(
              (
                {
                  firstName,
                  image,
                  isfollow,
                  isfriend,
                  lastName,
                  _id,
                  subscription,
                }: any,
                i: number
              ) => (
                <SearchResult
                  key={i}
                  image={image}
                  firstName={firstName}
                  lastName={lastName}
                  isfollow={isfollow}
                  isfriend={isfriend}
                  _id={_id}
                  subscription={subscription}
                  handleFrinendRequest={handleFrinendRequest}
                  handleFrinendRemove={handleFrinendRemove}
                />
              )
            )}
            {friendList.length === 0 && (
              <Flex
                alignItems="center"
                borderBottom="1px solid rgba(0, 0, 0, 0.08);"
                py="1.4rem"
              >
                No data
              </Flex>
            )}
            {/* <Text
              py="0.85rem"
              textAlign="center"
              fontWeight="semibold"
              color="weekly.purple"
              className="custom-pointer"
              onClick={() => router.push("/search-list")}
            >
              Show more
            </Text> */}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
