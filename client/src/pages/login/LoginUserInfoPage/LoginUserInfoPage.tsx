import { Form } from '@/components/login/Form/Form';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';
import { Title } from '@/components/login/Title/Title';
import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import {
	IRadioModalTrigger,
	RadioModalTriggerList,
} from '@/components/ui/RadioModalTriggerList/RadioModalTriggerList';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import {
	IconAlcohol,
	IconFamily,
	IconFingersCross,
	IconPuzzle,
	IconSchoolHat,
	IconSmoke,
	IconSports,
	IconVortex,
} from '@/icons';
import { useNavigate } from 'react-router-dom';
import styles from './LoginUserInfoPage.module.css';

export const LoginUserInfoPage = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/');
	};

	const RadioModalTriggers: IRadioModalTrigger[] = [
		{
			Icon: IconPuzzle,
			title: 'Мои интересы',
			options: [
				'Netflix',
				'Stand Up',
				'Harry Potter',
				'Вкусная еда',
				'Счастливые часы',
			],
		},
		{
			Icon: IconVortex,
			title: 'Знак зодиака',
			options: [
				'Овен',
				'Телец',
				'Близнецы',
				'Рак',
				'Лев',
				'Стрелец',
				'Весы',
				'Дева',
				'Скорпион',
				'Водолей',
				'Рыбы',
				'Козерог',
			],
		},
		{
			Icon: IconFingersCross,
			title: 'Я ищу',
			options: [
				'Долгосрочного партнера',
				'Долго- или краткосрочного партнера',
				'Просто повеселиться',
				'Найти друзей',
				'Не определился (-ась)',
			],
		},
		{
			Icon: IconSchoolHat,
			title: 'Образование',
			options: [],
		},
		{
			Icon: IconFamily,
			title: 'Планы на семью',
			options: [],
		},
		{
			Icon: IconSports,
			title: 'Спорт',
			options: [],
		},
		{
			Icon: IconAlcohol,
			title: 'Алкоголь',
			options: [
				'Не употребляю',
				'Только в компании',
				'Только по выходным',
				'Редко',
			],
		},
		{
			Icon: IconSmoke,
			title: 'Как часто ты куришь?',
			options: [],
		},
	];

	return (
		<LoginPageContainer>
			<Form>
				<BottomButtonContainer>
					<div className={styles.TitleAndInputContainer}>
						<Title>Для продолжения заполните данные</Title>
						<RadioModalTriggerList triggers={RadioModalTriggers} />
					</div>

					<RoundedButton onClick={handleClick}>Продолжить</RoundedButton>
				</BottomButtonContainer>
			</Form>
		</LoginPageContainer>
	);
};
