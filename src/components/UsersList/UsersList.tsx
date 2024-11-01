import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { UserCard } from './UserCard/UserCard';
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
}

const users: IUser[] = [
	{
		id: 1,
		imgSrc:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		isPopular: true,
		name: 'John Doe 1',
		age: 25,
		search: 'Software Engineer',
		job: 'Engineer',
		distance: '5 miles away',
	},
	{
		id: 2,
		imgSrc:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		isPopular: true,
		name: 'John Doe 2',
		age: 25,
		search: 'Software Engineer',
		job: 'Engineer',
		distance: '5 miles away',
	},
	{
		id: 3,
		imgSrc:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		isPopular: true,
		name: 'John Doe 3',
		age: 25,
		search: 'Software Engineer',
		job: 'Engineer',
		distance: '5 miles away',
	},
	{
		id: 4,
		imgSrc:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		isPopular: true,
		name: 'John Doe 4',
		age: 25,
		search: 'Software Engineer',
		job: 'Engineer',
		distance: '5 miles away',
	},
	{
		id: 5,
		imgSrc:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		isPopular: true,
		name: 'John Doe 5',
		age: 25,
		search: 'Software Engineer',
		job: 'Engineer',
		distance: '5 miles away',
	},
	{
		id: 6,
		imgSrc:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		isPopular: true,
		name: 'John Doe 6',
		age: 25,
		search: 'Software Engineer',
		job: 'Engineer',
		distance: '5 miles away',
	},
];

export const UsersList = () => {
	const [direction, setDirection] = useState('left');

	const [currentIndex, setCurrentIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState(0);
	const [animate, setAnimate] = useState(false);

	console.log(currentIndex, prevIndex, animate);

	const handlePrev = () => {
		setAnimate(true);
		setPrevIndex(currentIndex);
		setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
		setDirection('right');
	};

	const handleNext = () => {
		setAnimate(true);
		setPrevIndex(currentIndex);
		setCurrentIndex(prevIndex =>
			prevIndex < users.length - 1 ? prevIndex + 1 : prevIndex
		);
		setDirection('left');
	};

	const handlers = useSwipeable({
		onSwipedLeft: handleNext,
		onSwipedRight: handlePrev,
		trackMouse: true,
	});

	return (
		<div className={styles.usersList} {...handlers}>
			<button onClick={handlePrev}>Prev</button>
			<button onClick={handleNext}>Next</button>

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
				style={{ position: 'absolute' }}
			>
				<UserCard
					imgSrc={users[currentIndex].imgSrc}
					isPopular={users[currentIndex].isPopular}
					name={users[currentIndex].name}
					age={users[currentIndex].age}
					search={users[currentIndex].search}
					job={users[currentIndex].job}
					distance={users[currentIndex].distance}
				/>
			</motion.div>
		</div>
	);
};
