import React, { useState } from "react";
import { StatsResponse } from "common/properties";

import T from "common/i18n";

export interface AdvancedStatsProps {
  stats: StatsResponse<any>;
}

export const AdvancedStats = (props: AdvancedStatsProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <T.div
        onClick={() => setDisplay(!display)}
        text={
          display
            ? "app.components.advancedStats.hide"
            : "app.components.advancedStats.show"
        }
        style={{
          maxWidth: "400px",
          width: "100%",
          borderTop: "1px solid #666666",
          borderBottom: "1px solid #666666",
          margin: "4px auto",
          backgroundColor: "#222222",
          color: "#ffffff",
          cursor: "pointer",
        }}
      />
      {display && (
        <div
          style={{
            backgroundColor: "#888888",
            borderBottom: "1px solid #666666",
            padding: "4px 10px",
            margin: "4px auto",
            width: "100%",
            maxWidth: "900px",
            color: "#ffffff",
          }}
        >
          <T.span text="app.components.advancedStats.search" />:
          <input
            style={{
              marginLeft: "4px",
              border: "0",
              backgroundColor: "#222222",
              color: "#efefef",
            }}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <br />
          <table
            style={{
              textAlign: "left",
              width: "100%",
            }}
          >
            <tbody>
              {props.stats.lifetime.all.properties &&
                Object.entries(props.stats.lifetime.all.properties)
                  .filter(([key, obj]) => {
                    return (
                      key.toLowerCase().search(search) !== -1 ||
                      `${obj}`.toLowerCase().search(search) !== -1
                    );
                  })
                  .map(([key, obj]) => (
                    <tr>
                      <td>{key}</td>
                      <td>{obj as string}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
