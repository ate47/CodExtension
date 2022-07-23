import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Main } from "components/Main";
import { getSSOCookie } from "common/api";

import T from "common/i18n";

const App = () => {
  const [cookie, setCookie] = useState<string>("");

  const loadCookie = () => {
    getSSOCookie().then((c) => setCookie(c?.value ?? ""));
  };
  const openLoginPage = () => {
    chrome.tabs.create({ url: "https://profile.callofduty.com/cod/login" });
  };

  useState(() => {
    loadCookie();
  });

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "large",
        color: "#d7d7d7",
        height: "1vh",
      }}
    >
      {cookie === "" ? (
        <div>
          <h1>{T.translate("app.noCookie.title")}</h1>
          <T.button onClick={openLoginPage} text="app.noCookie.openLogin" />
          <T.button onClick={loadCookie} text="app.noCookie.reload" />
        </div>
      ) : (
        <div>
          <Main cookie={cookie} />
        </div>
      )}
    </div>
  );
};

document.title = T.translate("app.title") as string;

ReactDOM.render(<App />, document.getElementById("app"));
