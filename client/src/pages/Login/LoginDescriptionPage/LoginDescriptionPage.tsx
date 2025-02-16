import { Explanation } from '@/components/login/Explanation/Explanation';
import { Form } from '@/components/login/Form/Form';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';
import { Title } from '@/components/login/Title/Title';
import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginDescriptionPage.module.css';

export const LoginDescriptionPage = () => {
	const navigate = useNavigate();

	const description = useLoginStore(state => state.description);
	const setDescription = useLoginStore(state => state.setDescription);

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const handleDescriptionChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (event.target.value.length <= 55) {
			setDescription(event.target.value);
			setIsButtonDisabled(!event.target.value);
		}
	};

	const handleClick = () => {
		if (!description) return;

		navigate(RouteNames.LOGIN_USER_INFO);
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

					<RoundedButton onClick={handleClick} disabled={isButtonDisabled}>
						Продолжить
					</RoundedButton>
				</BottomButtonContainer>
			</Form>
		</LoginPageContainer>
	);
};
