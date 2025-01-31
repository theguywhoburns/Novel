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
import { RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useNavigate } from 'react-router-dom';
import styles from './LoginUserInfoPage.module.css';

export const LoginUserInfoPage = () => {
	const navigate = useNavigate();

	const signUp = useLoginStore(state => state.signUp);
	const signIn = useLoginStore(state => state.signIn);

	const interests = useLoginStore(state => state.interests);
	const setInterests = useLoginStore(state => state.setInterests);

	const zodiacSign = useLoginStore(state => state.zodiacSign);
	const setZodiacSign = useLoginStore(state => state.setZodiacSign);

	const searchGoal = useLoginStore(state => state.searchGoal);
	const setSearchGoal = useLoginStore(state => state.setSearchGoal);

	const education = useLoginStore(state => state.education);
	const setEducation = useLoginStore(state => state.setEducation);

	const familyPlans = useLoginStore(state => state.familyPlans);
	const setFamilyPlans = useLoginStore(state => state.setFamilyPlans);

	const sport = useLoginStore(state => state.sport);
	const setSport = useLoginStore(state => state.setSport);

	const alcohol = useLoginStore(state => state.alcohol);
	const setAlcohol = useLoginStore(state => state.setAlcohol);

	const smoking = useLoginStore(state => state.smoking);
	const setSmoking = useLoginStore(state => state.setSmoking);

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
			selectedOption: interests,
			setSelectedOption: setInterests,
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
			selectedOption: zodiacSign,
			setSelectedOption: setZodiacSign,
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
			selectedOption: searchGoal,
			setSelectedOption: setSearchGoal,
		},
		{
			Icon: IconSchoolHat,
			title: 'Образование',
			options: ['Среднее', 'Среднее специальное', 'Высшее'],
			selectedOption: education,
			setSelectedOption: setEducation,
		},
		{
			Icon: IconFamily,
			title: 'Планы на семью',
			options: ['Хочу детей', 'Не хочу детей'],
			selectedOption: familyPlans,
			setSelectedOption: setFamilyPlans,
		},
		{
			Icon: IconSports,
			title: 'Спорт',
			options: ['Регулярно', 'Часто', 'Редко', 'Никогда'],
			selectedOption: sport,
			setSelectedOption: setSport,
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
			selectedOption: alcohol,
			setSelectedOption: setAlcohol,
		},
		{
			Icon: IconSmoke,
			title: 'Как часто ты куришь?',
			options: ['Не курю', 'Редко', 'Часто'],
			selectedOption: smoking,
			setSelectedOption: setSmoking,
		},
	];

	const handleClick = async () => {
		await signUp();
		await signIn();
		setTimeout(() => {
			navigate(RouteNames.HOME);
		}, 0);
	};

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
