import React from "react";
import GenerateSecretKey from "../Features/User/UserKeys/GenerateSecretKey";
import MyKeys from "../Features/User/UserKeys/MyKeys";
import { useFetchData } from "../utils/FetchData";

export default function AccountPage({ session }) {
  const key = useFetchData("/api/users/public");
  return (
    <div>
      <MyKeys publicKey={key} />
    </div>
  );
}
