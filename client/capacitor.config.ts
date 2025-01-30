import { CapacitorConfig } from "@capacitor/cli";
const isDevelopment = process.env.NODE_ENV === "development";
export const config: CapacitorConfig = {
  appId: "me.theguywhoburns.novelapp",
  appName: "NovelApp",
  webDir: "dist",
  bundledWebRuntime: false,
  loggingBehavior: "debug",
  server: {
    url: isDevelopment ? "http://172.17.48.1:5173" : undefined,
    cleartext: true,
  },
  plugins: {
    Keyboard: {
      resize: "body",
      style: "dark",
    },
  },
};

export default config;
