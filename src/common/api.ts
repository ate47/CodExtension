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

const apiCall = async (ssoCookie: string, path: string) => {
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
  return axios.get(path, {
    headers: {
      Cookie: "ACT_SSO_COOKIE=" + ssoCookie + ";",
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

/**
 * Game title
 */
export class Title<MpProperties, WzProperties, ZmProperties> {
  static Vanguard = new Title<
    VanguardMpProperties,
    NoneProperties,
    VanguardZombiesPropertties
  >(
    "Vanguard",
    "vg",
    [Mode.Multiplayer, Mode.Zombies],
    [
      Platform.BattleNet,
      Platform.XboxLive,
      Platform.PlaystationNetwork,
      Platform.Crossplay,
    ]
  );
  static BlackOpsColdWar = new Title<
    BlackOpsColdWarProperties,
    NoneProperties,
    NoneProperties
  >(
    "Black Ops Cold War",
    "cw",
    [Mode.Multiplayer, Mode.Zombies],
    [
      Platform.BattleNet,
      Platform.XboxLive,
      Platform.PlaystationNetwork,
      Platform.Crossplay,
    ]
  );
  static ModernWarfare2019 = new Title<
    ModernWarfare2019MpProperties,
    ModernWarfare2019WarzoneProperties,
    NoneProperties
  >(
    "Modern Warfare 2019",
    "mw",
    [Mode.Multiplayer, Mode.BattleRoyale],
    [
      Platform.BattleNet,
      Platform.XboxLive,
      Platform.PlaystationNetwork,
      Platform.Crossplay,
    ]
  );
  static BlackOps4 = new Title<
    BlackOps4MpProperties,
    BlackOps4BlackoutProperties,
    BlackOps4ZombiesProperties
  >(
    "Black Ops 4",
    "bo4",
    [Mode.Multiplayer, Mode.BattleRoyale, Mode.Zombies],
    [Platform.BattleNet, Platform.XboxLive, Platform.PlaystationNetwork]
  );
  static WorldWarII = new Title<
    WorldWar2MpProperties,
    NoneProperties,
    NoneProperties
  >(
    "World War II",
    "ww2",
    [Mode.Multiplayer, Mode.Zombies],
    [Platform.Steam, Platform.XboxLive, Platform.PlaystationNetwork]
  );
  static InfiniteWarfare = new Title<
    InfiniteWarfareMpProperties,
    NoneProperties,
    NoneProperties
  >(
    "Infinite Warfare",
    "iw",
    [Mode.Multiplayer, Mode.Zombies],
    [Platform.Steam, Platform.XboxLive, Platform.PlaystationNetwork]
  );
  static BlackOps3 = new Title<
    BlackOps3MpProperties,
    NoneProperties,
    NoneProperties
  >(
    "Black Ops 3",
    "bo3",
    [Mode.Multiplayer, Mode.Zombies],
    [Platform.Steam, Platform.XboxLive, Platform.PlaystationNetwork]
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
    public readonly plateform: Platform[]
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

  private async stats<Response>(
    ssoCookie: string,
    username: string,
    platform: Platform,
    mode: Mode
  ): Promise<ApiResponse<StatsResponse<Response>>> {
    const response = await apiCall(
      ssoCookie,
      "https://my.callofduty.com/api/papi-client/stats/cod/v1/title/" +
        this.api +
        "/platform/" +
        platform +
        "/gamer/" +
        username +
        "/profile/type/" +
        mode +
        "/"
    );

    return response.data as ApiResponse<StatsResponse<Response>>;
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

export const getCodPoints = async (
  ssoCookie: string,
  username: string,
  platform: Platform
) => {
  const response = await apiCall(
    ssoCookie,
    "https://my.callofduty.com/api/papi-client/inventory/v1/title/" +
      Title.Vanguard.api +
      "/platform/" +
      platform +
      "/gamer/" +
      username +
      "/currency"
  );

  const data = response.data as ApiResponse<CurrencyResponse>;

  if (data.status === "error") {
    return undefined;
  } else {
    return (data.data as CurrencyResponse).codPoints;
  }
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
