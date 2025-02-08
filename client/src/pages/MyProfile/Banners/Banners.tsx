import { OutlinedBanner } from '@/components/subscription/OutlinedBanner/OutlinedBanner';
import { useTheme } from '@/theme'; // Import useTheme
import { themes } from '@/theme/themes';
import { AnimatePresence, motion } from 'framer-motion'; // Import framer-motion
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './Banners.module.css'; // Create this CSS module

export const Banners = () => {
	const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const theme = useTheme();

	const bannersData = [
		{
			title: 'Базовая подписка',
			listData: [
				'Фильтр по возрасту и расстоянию',
				'Безлимитное количество свайпов',
				'Уменьшение комиссии на кристаллы',
			],
			price: 100,
			color: themes['light'].accent_color,
			gradientColor: theme.orange_gradient,
		},
		{
			title: 'Продвинутая подписка',
			listData: [
				'Фильтр по возрасту и расстоянию',
				'Расширенный поиск',
				'Безлимитное количество свайпов',
				'Безлимитное количество анкет',
				'Уменьшение комиссии на кристаллы',
				'“Перемотка” без ограничений',
			],
			price: 200,
			color: '#788CEF',
			gradientColor:
				'linear-gradient(90deg, #788cef, rgba(12, 216, 229, 0.86))',
		},
		{
			title: 'PRO-ВЕРСИЯ',
			listData: [
				'Фильтр по возрасту и расстоянию',
				'Безлимитное количество свайпов',
				'Уникальные критерии для поиска',
				'Расширенный поиск',
				'Буст профиля',
				'“Перемотка” без ограничений',
				'Безлимитное количество свайпов',
				'Безлимитное количество анкет',
				'Безлимитное количество лайков',
				'Уменьшение комиссии на кристаллы',
			],
			price: 300,
			color: '#964DEC',
			gradientColor: 'linear-gradient(90deg, #934eef,  #ff3d91)',
		},
	];

	const variants = {
		enter: (direction: number) => {
			return {
				zIndex: 0,
				x: direction > 0 ? 1000 : -1000,
				opacity: 0,
				display: 'none',
			};
		},
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			display: 'block',
		},
		exit: (direction: number) => {
			return {
				zIndex: 0,
				x: direction < 0 ? 1000 : -1000,
				opacity: 0,
				display: 'none',
			};
		},
	};

	const goToPreviousBanner = () => {
		setDirection(-1);
		setCurrentBannerIndex(prevIndex =>
			prevIndex === 0 ? bannersData.length - 1 : prevIndex - 1
		);
	};

	const goToNextBanner = () => {
		setDirection(1);
		setCurrentBannerIndex(prevIndex =>
			prevIndex === bannersData.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handleBannerClick = () => {
		console.log(`Banner ${currentBannerIndex + 1} clicked!`);
	};

	const swipeHandlers = useSwipeable({
		onSwipedLeft: goToNextBanner,
		onSwipedRight: goToPreviousBanner,
		trackMouse: true,
	});

	return (
		<div className={styles.container}>
			<div className={styles.swipeableContainer} {...swipeHandlers}>
				<AnimatePresence initial={false} custom={direction}>
					<motion.div
						key={currentBannerIndex}
						className={styles.motionBanner}
						variants={variants}
						initial='enter'
						animate='center'
						exit='exit'
						custom={direction}
						transition={{
							x: { type: 'spring', stiffness: 120, damping: 20 },
							opacity: { duration: 0.8 },
						}}
					>
						<OutlinedBanner
							{...bannersData[currentBannerIndex]}
							onClick={handleBannerClick}
						/>
					</motion.div>
				</AnimatePresence>
			</div>

			<div className={styles.indicators}>
				{bannersData.map((_, index) => (
					<span
						key={index}
						style={{
							background:
								index === currentBannerIndex
									? bannersData[index].color
									: theme.grey,
						}}
						className={`${styles.indicator} ${
							index === currentBannerIndex ? styles.active : ''
						}`}
					/>
				))}
			</div>
		</div>
	);
};
