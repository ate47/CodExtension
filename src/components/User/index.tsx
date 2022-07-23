import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getAccounts,
  getCodPoints,
  Platform,
  prettyPlatformName,
} from "../../api";
import { UsernameData } from "../../properties";
import { UsernamePlatform } from "../Main";

import T from "../../i18n";

export interface UserProps {
  user: UsernamePlatform;
  cookie: string;
}

export const User = (props: UserProps) => {
  const [codPoints, setCodPoints] = useState<number>(-1);

  // fetch the cod points
  useEffect(() => {
    getCodPoints(props.cookie, props.user.username, props.user.platform).then(
      (codPoints) => {
        if (codPoints) {
          setCodPoints(codPoints);
        } else {
          setCodPoints(-1);
        }
      }
    );
  }, [props.user]);

  return (
    <div
      style={{
        display: "inline",
        padding: "0 4px",
      }}
    >
      <T.span
        text={{
          key: "app.components.user.greeting",
          username: props.user.username,
        }}
      />
      {codPoints < 0 ? (
        <span></span>
      ) : (
        <T.span
          text={{
            key: "app.components.user.codPoints",
            value: codPoints.toLocaleString(),
          }}
        />
      )}
    </div>
  );
};
