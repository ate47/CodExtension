import React, { useEffect, useState } from "react";

import T from "common/i18n";

import { Mode, Title } from "common/api";
import { NoneProperties, StatsResponse } from "common/properties";
import { UsernamePlatform } from "components/Main";
import { Level } from "components/Level";
import { AdvancedStats } from "components/AdvancedStats";

export interface GameProps {
  title: Title<NoneProperties, NoneProperties, NoneProperties>;
  username: UsernamePlatform;
  cookie: string;
}

export const Game = (props: GameProps) => {
  const [level, setLevel] = useState<number>(-1);
  const [mode, setMode] = useState<Mode>(Mode.Multiplayer);
  const [stats, setStats] = useState<StatsResponse<NoneProperties> | undefined>(
    undefined
  );

  useEffect(() => {
    props.title
      .stats(
        props.cookie,
        props.username.username,
        props.username.platform,
        mode
      )
      .then((apiResponse) => {
        if (apiResponse.status === "error") {
          setStats(undefined);
          setLevel(-1);
        } else {
          const data = apiResponse.data as StatsResponse<NoneProperties>;
          setStats(data);
          if (data.paragonRank > 1) {
            setLevel(data.paragonRank);
          } else {
            setLevel(data.level);
          }
        }
      });
  }, [props.cookie, props.title, props.username, mode]);
  const setModeClick = (mode: Mode) => () => setMode(mode);

  return (
    <div>
      <h2>{props.title.title}</h2>
      <div>
        {props.title.modes.map((modeLine) => (
          <div
            style={{
              display: "inline",
              cursor: "pointer",
              margin: "4px",
            }}
            onClick={setModeClick(modeLine)}
          >
            <span
              style={
                mode === modeLine
                  ? {
                      fontWeight: "bold",
                      color: "#FFFFFF",
                    }
                  : {
                      color: "#E7E7E7",
                    }
              }
            >
              {T.translate("app.common.mode." + modeLine)}
            </span>
          </div>
        ))}
        {stats && (
          <Level
            level={level}
            prestige={stats.prestige}
            mode={mode}
            title={props.title}
          />
        )}
        {stats && <AdvancedStats stats={stats} />}
      </div>
    </div>
  );
};
