import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Main } from "./components/Main";
import { getSSOCookie } from "./api";

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

  return cookie === "" ? (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>No cookie set</h1>
      <button onClick={openLoginPage}>Open login page</button>
      <button onClick={loadCookie}>Reload cookies</button>
    </div>
  ) : (
    <Main cookie={cookie} />
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
