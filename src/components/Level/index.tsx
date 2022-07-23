import React, { ChangeEvent, useEffect, useState } from "react";

import { Mode, Title } from "common/api";
import { NoneProperties } from "common/properties";
import T from "common/i18n";

export interface LevelProps {
  title: Title<NoneProperties, NoneProperties, NoneProperties>;
  prestige: number;
  level: number;
  mode: Mode;
}

export const Level = (props: LevelProps) => {
  const [img, setImg] = useState<string | undefined>(undefined);
  useEffect(() => {
    setImg(props.title.cdnLevelRead(props.prestige, props.level, props.mode));
  }, [props.prestige, props.level, props.mode, props.title]);
  return (
    <div>
      {img && (
        <img
          style={{
            width: "128px",
            height: "128px",
          }}
          alt="level"
          src={img}
        />
      )}
      <T.div
        text={{
          key: "app.components.level.level",
          level: Math.floor(props.level),
        }}
      />
      <T.div
        text={{
          key: "app.components.level.prestige",
          prestige: Math.floor(props.prestige),
        }}
      />
    </div>
  );
};
