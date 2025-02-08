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
        return "51.250.45.70";
      case "ios":
        return "51.250.45.70";
      case "android":
        return "51.250.45.70";
      default:
        throw new Error("Wadafuq, unknown platform");
    }
  } else {
    return "51.250.45.70";
  }
};
