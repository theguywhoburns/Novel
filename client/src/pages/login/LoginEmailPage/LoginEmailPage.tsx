import { Explanation } from '@/components/login/Explanation/Explanation';
import { Form } from '@/components/login/Form/Form';
import { Title } from '@/components/login/Title/Title';
import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { IconGoogle } from '@/icons';
import { RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useTheme } from '@/theme';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginEmailPage.module.css';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';

export const LoginEmailPage = () => {
	const theme = useTheme();

	const navigate = useNavigate();

	const email = useLoginStore(state => state.email);
	const setEmail = useLoginStore(state => state.setEmail);

	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setEmail(event.target.value);
	};

	const handleClick = () => {
		navigate(RouteNames.LOGIN_VERIFICATION_CODE);
	};

	return (
		<LoginPageContainer>
			<Form>
				<BottomButtonContainer>
					<div className={styles.TitleAndInputContainer}>
						<Title>Введите ваш e-mail для входа</Title>
						<TextInput
							value={email}
							onChange={handleEmailChange}
							type='email'
							placeholder='Введите email'
						/>
						<Link
							className={styles.link}
							style={{ color: theme.accent_color }}
							to='#'
						>
							Проблемы со входом?
						</Link>
						<Explanation marginY={[12, 0]}>
							Укажите email, на который зарегистрирован ваш аккаунт.
						</Explanation>
					</div>

					<div className={styles.buttonsContainer}>
						<RoundedButton onClick={handleClick}>Продолжить</RoundedButton>
						<RoundedButton
							variant='outlined'
							startIcon={<IconGoogle />}
							onClick={() => {}}
						>
							Войти через Google
						</RoundedButton>
					</div>
				</BottomButtonContainer>
			</Form>
		</LoginPageContainer>
	);
};
