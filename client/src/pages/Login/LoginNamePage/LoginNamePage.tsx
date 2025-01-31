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
import styles from './LoginNamePage.module.css';

export const LoginNamePage = () => {
	const navigate = useNavigate();

	const name = useLoginStore(state => state.name);
	const setName = useLoginStore(state => state.setName);

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const handleNameChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setName(event.target.value);

		if (event.target.value.trim() === '') {
			setIsButtonDisabled(true);
		} else {
			setIsButtonDisabled(false);
		}
	};

	const handleClick = () => {
		if (!name) return;

		navigate(RouteNames.LOGIN_BIRTH_DATE);
	};

	return (
		<LoginPageContainer>
			<Form>
				<BottomButtonContainer>
					<div className={styles.TitleAndInputContainer}>
						<Title>Введите ваше имя</Title>
						<TextInput
							value={name}
							onChange={handleNameChange}
							type='text'
							placeholder='Введите имя'
						/>

						<Explanation marginY={[12, 0]}>
							После введения данных в этом поле вы не сможете их изменить.
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
