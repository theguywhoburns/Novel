import { Explanation } from '@/components/login/Explanation/Explanation';
import { Form } from '@/components/login/Form/Form';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';
import { ProfileImageUploader } from '@/components/login/ProfileImageUploader/ProfileImageUploader';
import { Title } from '@/components/login/Title/Title';
import { BottomButtonContainer } from '@/components/ui/BottomButtonContainer/BottomButtonContainer';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { RouteNames } from '@/routes';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPhotosPage.module.css';

export const LoginPhotosPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(RouteNames.LOGIN_GENDER);
	};

	const uploadedImages = useLoginStore(state => state.uploadedImages);
	const setUploadedImages = useLoginStore(state => state.setUploadedImages);

	const handleImageUpload = (index: number, image: File | null) => {
		setUploadedImages(prevImages =>
			prevImages.map((img, i) => (i === index ? image : img))
		);
	};

	return (
		<LoginPageContainer>
			<Form>
				<BottomButtonContainer>
					<div className={styles.TitleAndInputContainer}>
						<Title>Добавьте фотографии для профиля</Title>
						<span
							className={styles.warning}
							style={{ color: theme.accent_color }}
						>
							Не меньше 4 фотографий
						</span>
						<div className={styles.ProfileImageUploaderContainer}>
							{uploadedImages.map((image, index) => (
								<ProfileImageUploader
									key={index}
									onImageUpload={newImage => handleImageUpload(index, newImage)}
									selectedImage={image}
								/>
							))}
						</div>
						<Explanation marginY={[12, 0]}>
							Приложение выберет фото для профиля, можно будет редактировать в
							настройках.
						</Explanation>
					</div>

					<RoundedButton onClick={handleClick}>Продолжить</RoundedButton>
				</BottomButtonContainer>
			</Form>
		</LoginPageContainer>
	);
};
