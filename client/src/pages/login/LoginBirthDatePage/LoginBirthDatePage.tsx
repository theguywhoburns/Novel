import { Explanation } from '@/components/login/Explanation/Explanation';
import { Form } from '@/components/login/Form/Form';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';
import { Title } from '@/components/login/Title/Title';
import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { CharInputsGroup } from '@/components/ui/CharInputsGroup/CharInputsGroup';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useNavigate } from 'react-router-dom';
import styles from './LoginBirthDatePage.module.css';

export const LoginBirthDatePage = () => {
	const navigate = useNavigate();

	const birthDate = useLoginStore(state => state.birthDate);
	const setBirthDate = useLoginStore(state => state.setBirthDate);

	const handleClick = () => {
		navigate(RouteNames.LOGIN_PHOTOS);
	};

	return (
		<LoginPageContainer>
			<Form>
				<BottomButtonContainer>
					<div className={styles.TitleAndInputContainer}>
						<Title>Введите вашу дату рождения</Title>

						<CharInputsGroup
							length={8}
							value={birthDate}
							setValue={setBirthDate}
							inputPaddingY={[10, 5]}
							inputMarginRightIndexes={[0, 8, 0, 8, 0, 0, 0, 0]}
							gap={3}
							placeholder='ДДММГГГГ'
						/>

						<Explanation marginY={[12, 0]}>
							Приложение направлено на лиц 16+.
						</Explanation>
					</div>

					<RoundedButton onClick={handleClick}>Продолжить</RoundedButton>
				</BottomButtonContainer>
			</Form>
		</LoginPageContainer>
	);
};
