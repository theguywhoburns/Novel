import { ILikedUser } from '@/components/chat/LikedUsersList/LikedUser/LikedUser';
import { LikedUsersList } from '@/components/chat/LikedUsersList/LikedUsersList';
import Tabs, { ITab } from '@/components/ui/Tabs/Tabs';
import { useLikesStore } from '@/store/likes/useLikesStore';
import { useTheme } from '@/theme';
import { getActionText } from '@/utils/likeActionText';
import { useEffect, useState } from 'react';
import styles from './LikesPage.module.css';

export enum LikeTabsLabels {
	MATCHES = 'matches',
	MY_LIKES = 'myLikes',
	LIKED_PARTNERS = 'likedPartners',
}

interface ILikeTab extends ITab<LikeTabsLabels> {}

interface ITabConfig {
	action: string;
	noDataText: string;
	pluralForms: string[];
}

export interface ITabConfigurations
	extends Record<LikeTabsLabels, ITabConfig> {}

interface ILikeDataWithQuery {
	data: ILikedUser[];
	query: () => Promise<void>;
}

const matchesPluralForms = [
	'взаимная симпатия',
	'взаимные симпатии',
	'взаимных симпатий',
];

const myLikesPluralForms = ['лайк', 'лайка', 'лайков'];

const likedPartnersPluralForms = [
	'понравившийся партнер',
	'понравившихся партнера',
	'понравившихся партнеров',
];

const tabConfigurations: ITabConfigurations = {
	[LikeTabsLabels.MATCHES]: {
		action: matchesPluralForms[0],
		noDataText: 'У Вас еще нет взаимных симпатий',
		pluralForms: matchesPluralForms,
	},
	[LikeTabsLabels.MY_LIKES]: {
		action: myLikesPluralForms[0],
		noDataText: 'Вы еще не поставили ни один лайк',
		pluralForms: myLikesPluralForms,
	},
	[LikeTabsLabels.LIKED_PARTNERS]: {
		action: likedPartnersPluralForms[0],
		noDataText: 'У Вас еще нет понравившихся партнеров',
		pluralForms: likedPartnersPluralForms,
	},
};

const tabs: ILikeTab[] = [
	{ label: LikeTabsLabels.MATCHES, displayedLabel: 'Matches' },
	{ label: LikeTabsLabels.MY_LIKES, displayedLabel: 'Мои лайки' },
	{
		label: LikeTabsLabels.LIKED_PARTNERS,
		displayedLabel: 'Понравившиеся партнеры',
	},
];

export const LikesPage = () => {
	const theme = useTheme();

	const matches = useLikesStore(state => state.matches);
	const myLikes = useLikesStore(state => state.myLikes);
	const likedPartners = useLikesStore(state => state.likedPartners);

	const getMatches = useLikesStore(state => state.getMatches);
	const getMyLikes = useLikesStore(state => state.getMyLikes);
	const getLikedPartners = useLikesStore(state => state.getLikedPartners);

	const [selectedTab, setSelectedTab] = useState<LikeTabsLabels>(
		LikeTabsLabels.MATCHES
	);

	const likedUsers: Record<LikeTabsLabels, ILikeDataWithQuery> = {
		[LikeTabsLabels.MATCHES]: { data: matches, query: getMatches },
		[LikeTabsLabels.MY_LIKES]: { data: myLikes, query: getMyLikes },
		[LikeTabsLabels.LIKED_PARTNERS]: {
			data: likedPartners,
			query: getLikedPartners,
		},
	};

	const selectedTabConfig = tabConfigurations[selectedTab];
	const selectedUsers = likedUsers[selectedTab];

	const actionText = getActionText(
		selectedUsers.data.length,
		selectedTab,
		tabConfigurations
	);

	useEffect(() => {
		likedUsers[selectedTab].query();
	}, [selectedTab]);

	return (
		<div className={styles.likesPage}>
			<Tabs
				className={styles.tabs}
				tabs={tabs}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>
			{selectedUsers.data.length ? (
				<h3 className={styles.likesTitle} style={{ color: theme.text_color }}>
					{actionText}
				</h3>
			) : null}
			<LikedUsersList
				likedUsers={selectedUsers.data}
				noDataText={selectedTabConfig.noDataText}
			/>
		</div>
	);
};
