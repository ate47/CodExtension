import React, { ChangeEvent, useEffect, useState } from "react";
import { getAccounts, Platform, prettyPlatformName } from "../../api";
import { UsernameData } from "../../properties";
import { UsernamePlatform } from "../Main";

export interface UserProps {
  user: UsernamePlatform;
}

export const User = (props: UserProps) => {
  return (
    <div>
      hello {props.user.username} from {prettyPlatformName(props.user.platform)}
      .
    </div>
  );
};
