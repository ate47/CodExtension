import React, { ChangeEvent, useEffect, useState } from "react";
import { getAccounts, Platform, prettyPlatformName } from "../../api";
import { UsernameData } from "../../properties";
import { User } from "../User";

export interface AppProps {
  cookie: string;
}

export interface UsernamePlatform {
  username: string;
  platform: Platform;
}

export const Main = (props: AppProps) => {
  const [usernames, setUsernames] = useState<UsernamePlatform[]>([]);
  const [username, setUsername] = useState<UsernamePlatform>();

  // fetch the accounts
  useEffect(() => {
    getAccounts(props.cookie)
      .then((accounts) => {
        return Object.entries(accounts).map((value) => {
          const [platform, { username }] = value as [Platform, UsernameData];
          return {
            username,
            platform,
          } as UsernamePlatform;
        });
      })
      .then((usernamesThen) => {
        setUsernames(usernamesThen);
      });
  }, [props.cookie]);

  const setUsernameStringValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const u = e.target.value;
    if (u === undefined) {
      setUsername(undefined);
      return;
    }
    const [user, pf] = u.split(",");
    const usernamePlatform: UsernamePlatform = {
      username: user,
      platform: pf as Platform,
    };
    setUsername(usernamePlatform);
  };

  // callback to set username
  useEffect(() => {
    if (usernames.length === 0) {
      setUsername(undefined);
    } else {
      setUsername(usernames[0]);
    }
  }, [usernames]);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <select onChange={setUsernameStringValue}>
        {usernames?.map((u) => (
          <option value={[u.username, u.platform]}>
            {u.username} - {prettyPlatformName(u.platform)}
          </option>
        ))}
      </select>

      {
        username && (
          <User user={username}/>
        )
      }
    </div>
  );
};
