import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getAccounts,
  Platform,
  prettyPlatformName,
  Title,
  titleFromAPIId,
  titles,
} from "../../api";
import { NoneProperties, UsernameData } from "../../properties";
import { User } from "../User";

import T from "../../i18n";

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
  const [game, setGame] = useState<
    Title<NoneProperties, NoneProperties, NoneProperties>
  >(titles[0]);

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
  const setTitleStringValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const t = e.target.value;
    if (t === undefined) {
      setGame(titles[0]);
      return;
    }
    const title = titleFromAPIId(t);
    if (title === undefined) {
      setGame(titles[0]);
      return;
    }
    setGame(title);
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
    <div>
      <div
        style={{
          width: "calc(100% - 40px)",
          backgroundColor: "#444444",
          color: "#eeeeee",
          padding: "20px",
          fontSize: "large",
          textAlign: "left",
        }}
      >
        <select
          style={{
            backgroundColor: "#222222",
            color: "#efefef",
            border: 0,
            padding: "0.5em",
            margin: "1px",
          }}
          onChange={setTitleStringValue}
          name="title"
          title={T.translate("app.components.main.selectGameTitle") as string}
        >
          {titles?.map((title) => (
            <option value={title.api}>{title.title}</option>
          ))}
        </select>
        <select
          style={{
            backgroundColor: "#222222",
            color: "#efefef",
            border: 0,
            padding: "0.5em",
            margin: "1px",
          }}
          onChange={setUsernameStringValue}
          name="userplat"
          title={T.translate("app.components.main.selectTitle") as string}
        >
          {usernames.map((u) => (
            <option value={[u.username, u.platform]}>
              {u.username} - {prettyPlatformName(u.platform)}
            </option>
          ))}
        </select>

        {username && <User user={username} cookie={props.cookie} />}
      </div>
      <div
        style={{
          padding: "20px",
        }}
      >
        Page
      </div>
    </div>
  );
};
