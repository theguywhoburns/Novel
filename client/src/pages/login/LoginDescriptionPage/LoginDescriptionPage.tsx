import { Explanation } from '@/components/login/Explanation/Explanation';
import { Form } from '@/components/login/Form/Form';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';
import { Title } from '@/components/login/Title/Title';
import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useNavigate } from 'react-router-dom';
import styles from './LoginDescriptionPage.module.css';

export const LoginDescriptionPage = () => {
	const navigate = useNavigate();

	const description = useLoginStore(state => state.description);
	const setDescription = useLoginStore(state => state.setDescription);

	const handleDescriptionChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (event.target.value.length <= 55) {
			setDescription(event.target.value);
		}
	};

	const handleClick = () => {
		navigate(RouteNames.LOGIN_DESCRIPTION);
	};

	return (
		<LoginPageContainer>
			<Form>
				<BottomButtonContainer>
					<div className={styles.TitleAndInputContainer}>
						<Title>Напишите краткое описание о себе</Title>
						<TextInput
							value={description}
							onChange={handleDescriptionChange}
							textBelow='до 55 символов'
							paddingY={[4, 15]}
							multiLine
						/>
						<Explanation marginY={[12, 0]}>
							Напиши краткую информацию о себе, для привлечения внимания
							пользователя.
						</Explanation>
					</div>

					<RoundedButton onClick={handleClick}>Продолжить</RoundedButton>
				</BottomButtonContainer>
			</Form>
		</LoginPageContainer>
	);
};
