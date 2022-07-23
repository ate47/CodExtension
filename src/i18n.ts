import { MDText } from "i18n-react";

export default new MDText(
  {
    notFound: (key: any) => `${key}`,
    app: {
      title: "COD API Read",
      common: {},
      noCookie: {
        title: "No cookie set",
        reload: "Reload cookies",
        openLogin: "Open login page",
      },
      components: {
        main: {
          selectTitle: "Select your platform",
          selectGameTitle: "Select your game",
        },
        user: {
          greeting: "Hello **{username}**! ",
          codPoints: "*{value}* cp",
        },
      },
    },
  },
  { MDFlavor: 1 }
);
