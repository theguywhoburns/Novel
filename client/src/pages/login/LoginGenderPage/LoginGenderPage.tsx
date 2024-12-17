import { Explanation } from '@/components/login/Explanation/Explanation';
import { Form } from '@/components/login/Form/Form';
import GenderInput from '@/components/login/GenderInput/GenderInput';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';
import { Title } from '@/components/login/Title/Title';
import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useNavigate } from 'react-router-dom';
import styles from './LoginGenderPage.module.css';

export const LoginGenderPage = () => {
	const navigate = useNavigate();

	const gender = useLoginStore(state => state.gender);
	const setGender = useLoginStore(state => state.setGender);

	const handleClick = () => {
		navigate(RouteNames.LOGIN_DESCRIPTION);
	};

	return (
		<LoginPageContainer>
			<Form>
				<BottomButtonContainer>
					<div className={styles.TitleAndInputContainer}>
						<Title>Укажите ваш пол</Title>
						<GenderInput gender={gender} setGender={setGender} />
						<Explanation marginY={[12, 0]}>
							Вы указали город нахождения, можете своё место расположение
							редактировать.
						</Explanation>
					</div>

					<RoundedButton onClick={handleClick}>Продолжить</RoundedButton>
				</BottomButtonContainer>
			</Form>
		</LoginPageContainer>
	);
};
