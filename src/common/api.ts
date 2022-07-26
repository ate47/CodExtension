import axios from "axios";
import {
  BlackOps3MpProperties,
  BlackOps4BlackoutProperties,
  BlackOps4MpProperties,
  BlackOps4ZombiesProperties,
  BlackOpsColdWarProperties,
  InfiniteWarfareMpProperties,
  ModernWarfare2019MpProperties,
  ModernWarfare2019WarzoneProperties,
  VanguardMpProperties,
  VanguardZombiesPropertties,
  WorldWar2MpProperties,
  NoneProperties,
  StatsResponse,
  CurrencyResponse,
  ApiResponse,
  AccountData,
  ErrorData,
} from "./properties";

interface FakeResponse<Data> {
  data: ApiResponse<Data>;
}

const debugMode = false;

const apiCall = async (ssoCookie: string, path: string) => {
  if (debugMode) {
    console.log(path);
    switch (path) {
      case "https://my.callofduty.com/api/papi-client/crm/cod/v2/accounts":
        return {
          data: {
            status: "success",
            data: {
              battle: {
                username: "ATE47#2581",
              },
              xbl: {
                username: "ATE48",
              },
              uno: {
                username: "ATE48",
              },
              steam: {
                username: "ATE47",
              },
            },
          },
        } as FakeResponse<AccountData>;

      default:
        if (
          path.startsWith(
            "https://my.callofduty.com/api/papi-client/inventory/v1/title/"
          )
        ) {
          return {
            data: {
              status: "success",
              data: {
                codPoints: 99999,
              },
            },
          } as FakeResponse<CurrencyResponse>;
        }
        if (
          path.startsWith(
            "https://my.callofduty.com/api/papi-client/stats/cod/v1/title/"
          )
        ) {
          return {
            data: {
              status: "success",
              data: {
                title: "bo4",
                platform: "xbl",
                username: "ATE48",
                type: "mp",
                level: 55.0,
                maxLevel: 0.0,
                levelXpRemainder: 0.0,
                levelXpGained: 55600.0,
                prestige: 11.0,
                prestigeId: 0.0,
                maxPrestige: 0.0,
                totalXp: 1457200.0,
                paragonRank: 1000.0,
                paragonId: 0.0,
                s: 0.0,
                p: 0.0,
              },
            },
          } as FakeResponse<StatsResponse<NoneProperties>>;
        }
        return {
          data: {
            status: "error",
            data: {
              message: "no msg",
              type: "Whatever",
            },
          },
        } as FakeResponse<ErrorData>;
    }
  }
  return axios.get(path, {
    headers: {
      Authorization: "Bearer " + ssoCookie,
    },
  });
};

/**
 * Game mode
 */
export enum Mode {
  Multiplayer = "mp",
  BattleRoyale = "wz",
  Zombies = "zombies",
}
/**
 * Platform
 */
export enum Platform {
  XboxLive = "xbl",
  BattleNet = "battle",
  Steam = "steam",
  PlaystationNetwork = "psn",
  Crossplay = "uno",
}

export const prettyPlatformName = (platform: Platform) => {
  switch (platform) {
    case "xbl":
      return "Xbox Live";
    case "battle":
      return "BattleNet";
    case "steam":
      return "Steam";
    case "psn":
      return "Playstation Network";
    case "uno":
      return "Crossplay";
    default:
      return platform;
  }
};

type CDNLevelRead = (
  prestige: number,
  level: number,
  mode: Mode
) => string | undefined;

const padding = (n: number) => {
  if (n > 10) {
    return `${Math.floor(n)}`;
  } else {
    return `0${Math.floor(n)}`;
  }
};

const CDNLevelReadValue: (uno: boolean, title: string) => CDNLevelRead =
  (uno: boolean, title: string) =>
  (prestige: number, level: number, mode: Mode) => {
    let modeId: string;
    if (mode === Mode.Zombies) {
      modeId = "zm";
    } else {
      modeId = mode;
    }
    if (prestige > 0) {
      const n = padding(prestige);
      if (uno) {
        return (
          "https://www.callofduty.com/cdn/app/icons/vg/prestige/mp/ui_icon_mp_prestige_" +
          n +
          ".png"
        );
      } else {
        return (
          "https://www.callofduty.com/cdn/app/icons/" +
          title +
          "/prestige/" +
          modeId +
          "/ui_icon_" +
          modeId +
          "_prestige_" +
          n +
          "_large.png"
        );
      }
    } else {
      const n = padding(level);
      if (uno) {
        return (
          "https://www.callofduty.com/cdn/app/icons/" +
          title +
          "/ranks/mp/icon_rank_" +
          n +
          ".png"
        );
      } else {
        return (
          "https://www.callofduty.com/cdn/app/icons/" +
          title +
          "/ranks/" +
          modeId +
          "/ui_icon_rank_" +
          modeId +
          "_level" +
          n +
          "_large.png"
        );
      }
    }
  };
const CDNLevelNoRead: CDNLevelRead = () => undefined;

/**
 * Game title
 */
export class Title<MpProperties, WzProperties, ZmProperties> {
  static Vanguard = new Title<
    VanguardMpProperties,
    NoneProperties,
    VanguardZombiesPropertties
  >(
    "Call of Duty: Vanguard",
    "vg",
    [Mode.Multiplayer, Mode.Zombies],
    [
      Platform.BattleNet,
      Platform.XboxLive,
      Platform.PlaystationNetwork,
      Platform.Crossplay,
    ],
    CDNLevelReadValue(true, "vg"),
    true,
    true,
    false
  );
  static BlackOpsColdWar = new Title<
    BlackOpsColdWarProperties,
    NoneProperties,
    NoneProperties
  >(
    "Call of Duty: Black Ops Cold War",
    "cw",
    [Mode.Multiplayer],
    [
      Platform.BattleNet,
      Platform.XboxLive,
      Platform.PlaystationNetwork,
      Platform.Crossplay,
    ],
    CDNLevelReadValue(true, "cw"),
    true,
    true,
    false
  );
  static ModernWarfare2019 = new Title<
    ModernWarfare2019MpProperties,
    ModernWarfare2019WarzoneProperties,
    NoneProperties
  >(
    "Call of Duty: Modern Warfare 2019",
    "mw",
    [Mode.Multiplayer, Mode.BattleRoyale],
    [
      Platform.BattleNet,
      Platform.XboxLive,
      Platform.PlaystationNetwork,
      Platform.Crossplay,
    ],
    CDNLevelReadValue(true, "mw"),
    true,
    false,
    true
  );
  static BlackOps4 = new Title<
    BlackOps4MpProperties,
    BlackOps4BlackoutProperties,
    BlackOps4ZombiesProperties
  >(
    "Call of Duty: Black Ops 4",
    "bo4",
    [Mode.Multiplayer, Mode.BattleRoyale, Mode.Zombies],
    [Platform.BattleNet, Platform.XboxLive, Platform.PlaystationNetwork],
    CDNLevelReadValue(false, "bo4"),
    true,
    true,
    true
  );
  static WorldWarII = new Title<
    WorldWar2MpProperties,
    NoneProperties,
    NoneProperties
  >(
    "Call of Duty: World War II",
    "ww2",
    [Mode.Multiplayer, Mode.Zombies],
    [Platform.Steam, Platform.XboxLive, Platform.PlaystationNetwork],
    CDNLevelNoRead,
    true,
    true,
    false
  );
  static InfiniteWarfare = new Title<
    InfiniteWarfareMpProperties,
    NoneProperties,
    NoneProperties
  >(
    "Call of Duty: Infinite Warfare",
    "iw",
    [Mode.Multiplayer, Mode.Zombies],
    [Platform.Steam, Platform.XboxLive, Platform.PlaystationNetwork],
    CDNLevelNoRead,
    true,
    true,
    false
  );
  static BlackOps3 = new Title<
    BlackOps3MpProperties,
    NoneProperties,
    NoneProperties
  >(
    "Call of Duty: Black Ops 3",
    "bo3",
    [Mode.Multiplayer, Mode.Zombies],
    [Platform.Steam, Platform.XboxLive, Platform.PlaystationNetwork],
    CDNLevelNoRead,
    true,
    true,
    false
  );

  /**
   * Game title
   * @param title game title
   * @param api game api title
   * @param modes game modes
   * @param plateform game plateforms
   */
  constructor(
    public readonly title: string,
    public readonly api: string,
    public readonly modes: Mode[],
    public readonly plateform: Platform[],
    public readonly cdnLevelRead: CDNLevelRead,
    public readonly multiplayer: boolean,
    public readonly zombies: boolean,
    public readonly battleRoyale: boolean
  ) {}

  async statsMultiplayer(
    ssoCookie: string,
    username: string,
    platform: Platform
  ): Promise<ApiResponse<StatsResponse<MpProperties>>> {
    return this.stats(ssoCookie, username, platform, Mode.Multiplayer);
  }
  async statsBattleRoyale(
    ssoCookie: string,
    username: string,
    platform: Platform
  ): Promise<ApiResponse<StatsResponse<WzProperties>>> {
    return this.stats(ssoCookie, username, platform, Mode.BattleRoyale);
  }
  async statsZombies(
    ssoCookie: string,
    username: string,
    platform: Platform
  ): Promise<ApiResponse<StatsResponse<ZmProperties>>> {
    return this.stats(ssoCookie, username, platform, Mode.Multiplayer);
  }

  async stats<Response>(
    ssoCookie: string,
    username: string,
    platform: Platform,
    mode: Mode
  ): Promise<ApiResponse<StatsResponse<Response>>> {
    const response = await apiCall(
      ssoCookie,
      `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/${
        this.api
      }/platform/${platform}/gamer/${encodeURIComponent(
        username
      )}/profile/type/${mode}/`
    );

    return response.data as ApiResponse<StatsResponse<Response>>;
  }

  async getCodPoints(ssoCookie: string, username: string, platform: Platform) {
    const response = await apiCall(
      ssoCookie,
      `https://my.callofduty.com/api/papi-client/inventory/v1/title/vg/platform/${platform}/gamer/${encodeURIComponent(
        username
      )}/currency`
    );

    const data = response.data as ApiResponse<CurrencyResponse>;

    if (data.status === "error") {
      return undefined;
    } else {
      return (data.data as CurrencyResponse).codPoints;
    }
  }
}

/**
 * Game titles
 */
export const titles: Title<NoneProperties, NoneProperties, NoneProperties>[] = [
  Title.Vanguard,
  Title.BlackOpsColdWar,
  Title.ModernWarfare2019,
  Title.BlackOps4,
  Title.WorldWarII,
  Title.InfiniteWarfare,
  Title.BlackOps3,
];

export const titleFromAPIId = (api: string) => {
  return titles.find((t) => t.api === api);
};

export const getAccounts = async (ssoCookie: string) => {
  const response = await apiCall(
    ssoCookie,
    "https://my.callofduty.com/api/papi-client/crm/cod/v2/accounts"
  );

  const data = response.data as ApiResponse<AccountData>;

  if (data.status === "error") {
    return {} as AccountData;
  } else {
    return data.data as AccountData;
  }
};

/**
 * Get the SSO cookie
 * @returns promise of a SSO cookie (if any)
 */
export const getSSOCookie = () =>
  chrome.cookies.get({
    url: "https://my.callofduty.com",
    name: "ACT_SSO_COOKIE",
  });
