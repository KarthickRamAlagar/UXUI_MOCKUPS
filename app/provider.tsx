"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailsContext } from "@/context/UserDetailsContext";

const Provider = ({ children }: any) => {
  const[userDetails,setUserDetails]= useState()
  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const result = await axios.post("/api/user", {});
    setUserDetails(result.data)
  };
  return (
    <UserDetailsContext.Provider value={{userDetails,setUserDetails}}>
      <div>{children}</div>;
    </UserDetailsContext.Provider>
  );
  

};

export default Provider;
