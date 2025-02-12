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
        return "localhost"; // local server ip
      case "ios":
        return "localhost"; // local server ip
      case "android":
        return "172.17.48.1"; // local server ip
      default:
        throw new Error("Wadafuq, unknown platform");
    }
  } else {
    return "novel.com";
  }
};
