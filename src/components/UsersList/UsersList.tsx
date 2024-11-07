import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { UserCard } from './UserCard/UserCard';
import { ITag } from './UserCard/UserCardTag/UserCardTag';
import styles from './UsersList.module.css';

export interface IUser {
	id: number;
	imgSrc: string;
	isPopular: boolean;
	name: string;
	age: number;
	search: string;
	job: string;
	distance: string;
	isVerified: boolean;
	gender: 'male' | 'female';
	city: string;
	about: string;
	main: ITag[];
	languages: ITag[];
	interests: ITag[];
}

export const users: IUser[] = [
	{
		id: 1,
		imgSrc:
			'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ',
		isPopular: true,
		name: 'John Doe 1',
		age: 25,
		search: 'Family',
		job: 'Engineer',
		distance: '5 miles away',
		isVerified: true,
		gender: 'male',
		city: 'New York',
		about:
			'I am a software engineer with a passion for coding and problem-solving.',
		main: [
			{ id: '1', Icon: null, children: 'Coding' },
			{ id: '2', Icon: null, children: 'Gaming' },
			{ id: '3', Icon: null, children: 'Hiking' },
		],
		languages: [
			{ id: '1', Icon: null, children: 'English' },
			{ id: '2', Icon: null, children: 'Spanish' },
		],
		interests: [
			{ id: '1', Icon: null, children: 'Technology' },
			{ id: '2', Icon: null, children: 'Sports' },
			{ id: '3', Icon: null, children: 'Music' },
		],
	},
	{
		id: 2,
		imgSrc:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ',
		isPopular: false,
		name: 'John Doe 2',
		age: 25,
		search: 'Husband',
		job: 'Engineer',
		distance: '5 miles away',
		isVerified: false,
		gender: 'male',
		city: 'Los Angeles',
		about:
			'I am a software engineer with a passion for coding and problem-solving.',
		main: [
			{ id: '1', Icon: null, children: 'Coding' },
			{ id: '2', Icon: null, children: 'Gaming' },
			{ id: '3', Icon: null, children: 'Cooking' },
		],
		languages: [
			{ id: '1', Icon: null, children: 'English' },
			{ id: '2', Icon: null, children: 'French' },
		],
		interests: [
			{ id: '1', Icon: null, children: 'Technology' },
			{ id: '2', Icon: null, children: 'Sports' },
			{ id: '3', Icon: null, children: 'Travel' },
		],
	},
	{
		id: 3,
		imgSrc:
			'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ',
		isPopular: true,
		name: 'John Doe 3',
		age: 25,
		search: 'Love',
		job: 'Engineer',
		distance: '5 miles away',
		isVerified: true,
		gender: 'male',
		city: 'Chicago',
		about:
			'I am a software engineer with a passion for coding and problem-solving.',
		main: [
			{ id: '1', Icon: null, children: 'Coding' },
			{ id: '2', Icon: null, children: 'Gaming' },
			{ id: '3', Icon: null, children: 'Reading' },
		],
		languages: [
			{ id: '1', Icon: null, children: 'English' },
			{ id: '2', Icon: null, children: 'German' },
		],
		interests: [
			{ id: '1', Icon: null, children: 'Technology' },
			{ id: '2', Icon: null, children: 'Sports' },
			{ id: '3', Icon: null, children: 'History' },
		],
	},
	{
		id: 4,
		imgSrc:
			'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ',
		isPopular: false,
		name: 'John Doe 4',
		age: 25,
		search: 'Friends',
		job: 'Engineer',
		distance: '5 miles away',
		isVerified: false,
		gender: 'male',
		city: 'Houston',
		about:
			'I am a software engineer with a passion for coding and problem-solving.',
		main: [
			{ id: '1', Icon: null, children: 'Coding' },
			{ id: '2', Icon: null, children: 'Gaming' },
			{ id: '3', Icon: null, children: 'Sports' },
		],
		languages: [
			{ id: '1', Icon: null, children: 'English' },
			{ id: '2', Icon: null, children: 'Italian' },
		],
		interests: [
			{ id: '1', Icon: null, children: 'Technology' },
			{ id: '2', Icon: null, children: 'Sports' },
			{ id: '3', Icon: null, children: 'Music' },
		],
	},
	{
		id: 5,
		imgSrc:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ',
		isPopular: true,
		name: 'John Doe 5',
		age: 25,
		search: 'New people',
		job: 'Engineer',
		distance: '5 miles away',
		isVerified: true,
		gender: 'male',
		city: 'Phoenix',
		about:
			'I am a software engineer with a passion for coding and problem-solving.',
		main: [
			{ id: '1', Icon: null, children: 'Coding' },
			{ id: '2', Icon: null, children: 'Gaming' },
			{ id: '3', Icon: null, children: 'Travel' },
		],
		languages: [
			{ id: '1', Icon: null, children: 'English' },
			{ id: '2', Icon: null, children: 'Japanese' },
		],
		interests: [
			{ id: '1', Icon: null, children: 'Technology' },
			{ id: '2', Icon: null, children: 'Sports' },
			{ id: '3', Icon: null, children: 'Cooking' },
		],
	},
];

export const UsersList = () => {
	const [direction, setDirection] = useState('left');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

	const { id, imgSrc, isPopular, name, age, search, job, distance } = users[
		currentIndex
	];

	const navigate = useNavigate();

	const handleDislike = () => {
		setCurrentIndex(prevIndex =>
			prevIndex < users.length - 1 ? prevIndex + 1 : prevIndex
		);
		setDirection('left');
	};

	const handleLike = () => {
		setCurrentIndex(prevIndex =>
			prevIndex < users.length - 1 ? prevIndex + 1 : prevIndex
		);
		setDirection('right');
	};

	const handleClick = () => {
		if (selectedUserId) {
			setSelectedUserId(null);
		} else {
			setSelectedUserId(id);

			navigate(`/user/${id}`);
		}
	};

	const handlers = useSwipeable({
		onSwipedLeft: handleDislike,
		onSwipedRight: handleLike,
		trackMouse: true,
	});

	return (
		<div className={styles.usersList} {...handlers}>
			<motion.div
				key={users[currentIndex].id}
				initial={{
					opacity: 0,
					x: direction === 'right' ? '-100%' : '100%',
				}}
				animate={{
					opacity: 1,
					x: 0,
				}}
				exit={{
					opacity: 0,
					x: direction === 'right' ? '100%' : '-100%',
				}}
				transition={{ duration: 0.5 }}
			>
				<UserCard
					imgSrc={imgSrc}
					isPopular={isPopular}
					name={name}
					age={age}
					search={search}
					job={job}
					distance={distance}
					onClick={handleClick}
				/>
			</motion.div>
		</div>
	);
};
