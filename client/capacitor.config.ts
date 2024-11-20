/// <reference types="@capacitor-community/safe-area" />
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'me.theguywhoburns.novelapp',
	appName: 'NovelApp',
	webDir: 'dist',
	bundledWebRuntime: false,
	plugins: {
		SafeArea: {
			enabled: true,
			customColorsForSystemBars: true,
			statusBarColor: '#000000',
			statusBarContent: 'light',
			navigationBarColor: '#000000',
			navigationBarContent: 'light',
			offset: 0,
		},
	},
};

export default config;
