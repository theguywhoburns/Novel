// if dev build
// web return localhost
// ios return ?
// android return 10.0.2.2
// else return novel.com

import { Capacitor } from "@capacitor/core";

export const getServerUrl = () => {
  if (process.env.NODE_ENV === "development") {
    switch (Capacitor.getPlatform()) {
      case "web":
        return "localhost";
      case "ios":
        return "localhost";
      case "android":
        return "10.0.2.2";
      default:
    }
  } else {
    return "novel.com";
  }
};
