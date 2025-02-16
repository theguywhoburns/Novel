import { IconPopular } from '@/icons/Popular';
import { RouteBase } from '@/routes';
import { useUsersStore } from '@/store/users/useUsersStore';
import { useTheme } from '@/theme';
import { getAvatar } from '@/utils/getAvatar';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MarkSvg } from './MarkSvg/MarkSvg';
import styles from './UserCard.module.css';
import { UserCardTag } from './UserCardTag/UserCardTag';

export type Direction = 'left' | 'right' | null;

export interface IUserCard {
	id: number | undefined;
	uploadedImages?: string;
	isPopular?: boolean;
	name?: string;
	age?: number;
	search?: string;
	job?: string;
	distance?: string;
	direction?: Direction;
	isDraggable?: boolean;
	style?: React.CSSProperties;
}

export const UserCard = ({
	id,
	uploadedImages,
	isPopular,
	name,
	age,
	search,
	job,
	distance,
	isDraggable,
	style,
}: IUserCard) => {
	const theme = useTheme();

	const x = useMotionValue(0);
	const controls = useAnimation();

	const navigate = useNavigate();

	const [constrained, setConstrained] = useState(true);

	const direction = useUsersStore(state => state.direction);
	const setDirection = useUsersStore(state => state.setDirection);

	const [velocity, setVelocity] = useState<number>();

	const cardRef = useRef<HTMLDivElement | null>(null);

	const getVote = (childRect: DOMRect, parentRect: DOMRect) => {
		return parentRect.left >= childRect.right
			? false
			: parentRect.right <= childRect.left
			? true
			: undefined;
	};

	const getDirection = () => {
		return velocity
			? velocity >= 1
				? 'right'
				: velocity <= -1
				? 'left'
				: null
			: null;
	};

	const getTrajectory = () => {
		const velocity = x.getVelocity();
		setVelocity(velocity);
		setDirection(getDirection());
	};

	const flyAway = (min: number) => {
		const flyAwayDistance = (direction: Direction) => {
			const parentWidth = (cardRef.current
				?.parentNode as HTMLElement).getBoundingClientRect().width;
			const childWidth = cardRef.current!.getBoundingClientRect().width;

			return direction === 'left'
				? -parentWidth! / 2 - childWidth! / 2
				: parentWidth! / 2 + childWidth! / 2;
		};

		if (direction && Math.abs(velocity!) > min) {
			setConstrained(false);
			controls.start({
				x: flyAwayDistance(direction),
			});
		}
	};

	const handleClick = () => {
		navigate(`${RouteBase.PROFILE}/${id}`, {
			state: { from: location.pathname },
		});
	};

	useEffect(() => {
		const unsubscribeX = x.on('change', () => {
			if (cardRef.current) {
				const childRect = cardRef.current.getBoundingClientRect();
				const parentRect = (cardRef.current
					.parentNode as HTMLElement)!.getBoundingClientRect();
				const result = getVote(childRect, parentRect);
				result !== undefined;
				const newDirection = getDirection();
				setDirection(newDirection);
			}
		});

		return () => unsubscribeX();
	}, []);

	const background =
		x.get() < 0
			? `
			linear-gradient(
				135.30deg,
				rgba(255, 27, 65, ${Math.min(Math.abs(x.get()) * 0.007, 0.7)}) 2.658%,
				rgba(255, 27, 65, 0) 98.365%
			),
			linear-gradient(
				1.68deg,
				rgba(0, 0, 0, ${Math.min(Math.abs(x.get()) * 0.0045, 0.45)}) 0.314%,
				rgba(0, 0, 0, 0) 33.789%
			)
		`
			: `
			linear-gradient(
				223.43deg,
				rgba(
					43, 
					223, 
					103, 
					${Math.min(Math.abs(x.get()) * 0.007, 0.7)}
				) 4.348%,
				rgba(
					42, 
					232, 
					106, 
					${Math.min(Math.abs(x.get()) * 0.007, 0)}
				) 96.472%
			),
			linear-gradient(
				1.68deg,
				rgba(
					0, 
					0, 
					0, 
					${Math.min(Math.abs(x.get()) * 0.0045, 0.45)}
				) 0.314%,
				rgba(
					0, 
					0, 
					0, 
					${Math.min(Math.abs(x.get()) * 0.0045, 0)}
				) 33.789%
			)
		`;

	const avatarUrl = getAvatar(uploadedImages as string);

	return (
		<motion.div
			className={styles.userCard}
			ref={cardRef}
			style={{
				...style,
				x,
			}}
			initial={{ opacity: 1, x: 0 }}
			animate={controls}
			transition={{ duration: 0.5 }}
			drag={isDraggable ? 'x' : false}
			dragConstraints={constrained && { top: 0, bottom: 0, left: 0, right: 0 }}
			dragElastic={1}
			onClick={handleClick}
			onDrag={getTrajectory}
			onDragEnd={() => flyAway(500)}
		>
			<div
				className={styles.cardMask}
				style={{
					background,
				}}
			/>

			<div
				className={styles.maskInner}
				style={{
					display: x.get() < 0 ? 'flex' : 'none',
				}}
			>
				<MarkSvg mark='dislike' x={x.get()} />
			</div>

			<div
				className={styles.maskInner}
				style={{
					display: x.get() > 0 ? 'flex' : 'none',
					justifyContent: 'flex-end',
				}}
			>
				<MarkSvg mark='like' x={x.get()} />
			</div>

			<img
				className={styles.img}
				src={
					avatarUrl ||
					'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3MjQ4fQ'
				}
			/>
			{isPopular && (
				<UserCardTag className={styles.popularTag} Icon={<IconPopular />}>
					Popular
				</UserCardTag>
			)}
			<div className={styles.infoContainer}>
				<div className={styles.nameAndAge} style={{ color: theme.white }}>
					<span className={styles.name}>{name}</span>
					<span className={styles.age}>{age}</span>
				</div>
				<p className={styles.search} style={{ color: theme.accent_color }}>
					{search}
				</p>
				<p className={styles.job} style={{ color: theme.grey }}>
					{job}
				</p>
				<p className={styles.distance} style={{ color: theme.grey }}>
					{distance}
				</p>
			</div>
		</motion.div>
	);
};
