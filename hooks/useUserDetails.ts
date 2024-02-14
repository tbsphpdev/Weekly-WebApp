import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useUserDetails = () => {
  const userDetails: any = useContext(UserContext);
  return userDetails;
};

export default useUserDetails;
