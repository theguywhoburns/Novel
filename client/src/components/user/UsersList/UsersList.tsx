import { useUserActions } from '@/hooks/useUserActions';
import { Gender } from '@/store/login/useLoginStore';
import { useUsersStore } from '@/store/users/useUsersStore';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { UserCard } from './UserCard/UserCard';
import styles from './UsersList.module.css';

export interface IUser {
	id: number;
	uploadedImages: string;
	isPopular: boolean;
	name: string;
	age: number;
	lat: number;
	lon: number;
	searchGoal: string;
	jobPosition: string;
	distance: string;
	isVerified: boolean;
	gender: Gender;
	city: string;
	description: string;
	main: string[];
	languages: string[];
	interests: string[];
}

interface IUsersList {
	users: IUser[] | null;
}

export const UsersList = ({ users }: IUsersList) => {
	const currentIndex = useUsersStore(state => state.currentIndex);
	const nextIndex = useUsersStore(state => state.nextIndex);
	const direction = useUsersStore(state => state.direction);

	const { handleLike, handleDislike } = useUserActions({});

	const {
		id,
		uploadedImages,
		isPopular,
		name,
		age,
		searchGoal,
		jobPosition,
		distance,
	} = users?.[currentIndex] ?? {};

	const handlers = useSwipeable({
		onSwipedLeft: handleDislike,
		onSwipedRight: handleLike,
		preventScrollOnSwipe: true,
		trackMouse: true,
	});

	return (
		<div className={styles.usersList} {...handlers}>
			<motion.div
				style={{ borderRadius: 22 }}
				key={id}
				initial={{
					opacity: 1,
					x: direction === 'right' ? '-100%' : '100%',
				}}
				animate={{
					opacity: 1,
					x: 0,
				}}
				exit={{
					opacity: 1,
					x: direction === 'right' ? '100%' : '-100%',
				}}
				transition={{ duration: 0.5 }}
			>
				{users?.[nextIndex] && (
					<UserCard
						style={{ position: 'absolute', inset: 0 }}
						id={id}
						uploadedImages={users?.[nextIndex]?.uploadedImages ?? ''}
						isPopular={users?.[nextIndex]?.isPopular ?? false}
						name={users?.[nextIndex]?.name ?? 'Ты долистал-(а) до конца'}
						age={users?.[nextIndex]?.age ?? 0}
						search={users?.[nextIndex]?.searchGoal ?? ''}
						job={users?.[nextIndex]?.jobPosition ?? ''}
						distance={users?.[nextIndex]?.distance ?? ''}
						isDraggable={false}
					/>
				)}
				<UserCard
					id={id}
					uploadedImages={uploadedImages}
					isPopular={isPopular}
					name={name}
					age={age}
					search={searchGoal}
					job={jobPosition}
					distance={distance}
					isDraggable={true}
				/>
			</motion.div>
		</div>
	);
};
