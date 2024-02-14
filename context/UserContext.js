import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URLS } from "../public/constant";
import { useCurrentUser } from "../hooks/index";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const { user, updateCurrentUser } = useCurrentUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    if (!!user) {
      axios.get(API_BASE_URLS.baseUrl + "/api/user/find-user").then((res) => {
        setCurrentUser(res?.data?.data);
      });
      getFriendListAPI();
    }
  }, [user]);

  const addNotification = () => {
    setCurrentUser({
      ...currentUser,
      notification_count: currentUser.notification_count + 1,
    });
  };

  const readNotification = () => {
    setCurrentUser({ ...currentUser, notification_count: 0 });
    updateCurrentUser(
      {
        ...user,
        notification_count: 0,
      },
      axios.get(API_BASE_URLS.baseUrl + "/api/user/find-user").then((res) => {
        // setCount(res?.data?.data?.notification_count);
      })
    );
  };

  //for searchbar
  useEffect(() => {
    if (!!user) {
      getFriendListAPI();
    }
  }, [search]);

  //get frient list api
  const getFriendListAPI = () => {
    axios
      .post(API_BASE_URLS.baseUrl + "/api/friend/user-list", {
        search: search !== "" ? search : "",
        page: 0,
      })
      .then((res) => {
        if (res?.status === 200) {
          setFriendList(res?.data?.data?.data);
        }
      });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        addNotification,
        readNotification,
        search,
        setSearch,
        friendList,
        getFriendListAPI,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
