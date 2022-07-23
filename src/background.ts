import { getLanguage } from "common/i18n/translation";

const lang = getLanguage();

// set the action title
chrome.action.setTitle({
  title: lang.app.action.openMenu,
});

chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});
