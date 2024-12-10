import { Explanation } from '@/components/login/Explanation/Explanation';
import { Form } from '@/components/login/Form/Form';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';
import { Title } from '@/components/login/Title/Title';
import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { CharInputsGroup } from '@/components/ui/CharInputsGroup/CharInputsGroup';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { Timer } from '@/components/ui/Timer/Timer';
import { RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import styles from './LoginVerificationCode.module.css';

export const LoginVerificationCodePage = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const email = useLoginStore(state => state.email);

	const remainingTime = useLoginStore(state => state.remainingTime);
	const setRemainingTime = useLoginStore(state => state.setRemainingTime);

	const verificationCode = useLoginStore(state => state.verificationCode);
	const setVerificationCode = useLoginStore(state => state.setVerificationCode);

	const handleClick = () => {
		navigate(RouteNames.LOGIN_NAME);
	};

	const handleSendVerificationCodeAgain = () => {
		if (remainingTime === 0) {
			setRemainingTime(300);
		}
	};

	return (
		<LoginPageContainer>
			<Form>
				<BottomButtonContainer>
					<div className={styles.TitleAndInputContainer}>
						<Title>Введите ваш проверочный код</Title>
						<Explanation marginY={[0, 24]}>
							На указанный E-mail {email} поступит письмо с кодом. Укажите
							данные кода.
						</Explanation>
						<Timer
							className={styles.timer}
							remainingTime={remainingTime}
							setRemainingTime={setRemainingTime}
						/>
						<CharInputsGroup
							length={4}
							value={verificationCode}
							setValue={setVerificationCode}
							textColor={theme.accent_color}
							inputWidth={70}
							inputPaddingY={[16, 16]}
							centerHorizontally
						/>
					</div>

					<div className={styles.buttonsContainer}>
						<RoundedButton
							variant='text'
							onClick={handleSendVerificationCodeAgain}
						>
							Отправить повторно
						</RoundedButton>
						<RoundedButton onClick={handleClick}>Продолжить</RoundedButton>
					</div>
				</BottomButtonContainer>
			</Form>
		</LoginPageContainer>
	);
};
