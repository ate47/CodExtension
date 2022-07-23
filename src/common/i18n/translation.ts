export interface Translation {
  notFound: (key: any) => string;
  languageName: string;
  app: {
    title: string;
    action: {
      openMenu: string;
    };
    common: {
      mode: {
        mp: string;
        zombies: string;
        wz: string;
        blackout: string;
      };
    };
    noCookie: {
      title: string;
      reload: string;
      openLogin: string;
    };
    components: {
      main: {
        selectTitle: string;
        selectGameTitle: string;
      };
      user: {
        greeting: string;
        codPoints: string;
      };
      level: {
        level: string;
        prestige: string;
      };
      advancedStats: {
        show: string;
        hide: string;
        search: string;
      };
    };
  };
}

export const english: Translation = {
  notFound: (key: any) => `${key}`,
  languageName: "English",
  app: {
    title: "COD API Read",
    action: {
      openMenu: "Open menu",
    },
    common: {
      mode: {
        mp: "Multiplayer",
        zombies: "Zombies",
        wz: "Battle royale",
        blackout: "Battle royale",
      },
    },
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
      level: {
        level: "Level {level}",
        prestige: "Prestige {prestige}",
      },
      advancedStats: {
        show: "Show advanced stats",
        hide: "Hide advanced stats",
        search: "Search",
      },
    },
  },
};

export const french: Translation = {
  notFound: (key: any) => `${key}`,
  languageName: "Français",
  app: {
    title: "COD API Read",
    action: {
      openMenu: "Ouvrir menu",
    },
    common: {
      mode: {
        mp: "Multijoueur",
        zombies: "Zombies",
        wz: "Battle royale",
        blackout: "Battle royale",
      },
    },
    noCookie: {
      openLogin: "Ouvrir page de connexion",
      reload: "Recharger cookies",
      title: "Aucun cookie trouvé",
    },
    components: {
      main: {
        selectTitle: "Selectionner votre plateform",
        selectGameTitle: "Selectionner votre jeu",
      },
      user: {
        greeting: "Bonjour **{username}** ! ",
        codPoints: "*{value}* cp",
      },
      level: {
        level: "Niveau {level}",
        prestige: "Prestige {prestige}",
      },
      advancedStats: {
        show: "Afficher stats advancées",
        hide: "Cacher stats advancées",
        search: "Chercher",
      },
    },
  },
};

// TODO: better implementation
export const getLanguage = () => english;
