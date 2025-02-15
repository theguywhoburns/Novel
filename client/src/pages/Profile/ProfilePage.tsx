import { RangeInput } from '@/components';
import { ProfileImageUploader } from '@/components/login/ProfileImageUploader/ProfileImageUploader';
import { Separator } from '@/components/ui/Separator/Separator';
import { SwitchModeButtonGroup } from '@/components/ui/SwitchModeButtonGroup/SwitchModeButtonGroup';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { useUserId } from '@/hooks/useUserId';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useProfileStore } from '@/store/profile/useProfileStore';
import { useThemeStore } from '@/store/theme/useThemeStore';
import { setTheme } from '@/theme';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserCardDetailedPage } from '../Home/UserCardDetailedPage/UserCardDetailedPage';
import styles from './ProfilePage.module.css';
import { LabeledRadioButtonsList } from '@/components/ui/LabeledRadioButtonsList/LabeledRadioButtonsList';
import { IconAlcohol, IconChat, IconCity, IconDollar, IconFamily, IconHead, IconHeartLoop, IconPuzzle, IconSchoolHat, IconSports } from '@/icons';
import { RadioModalTriggerList } from '@/components/ui/RadioModalTriggerList/RadioModalTriggerList';

export const ProfilePage = () => {
	const [editMode, setEditMode] = useState(false);
	const [height, setHeight] = useState(187);
	const [gender, setGender] = useState('male');
	const [orientation, setOrientation] = useState('heterosexual');
	const [selectedOption, setSelectedOption] = useState('Высшее'); // Состояние для выбранного образования

	const userId = useUserId();
	const visitedUserId = useParams().id;

	const currentTheme = useThemeStore(state => state.theme);

	const uploadedImages = useLoginStore(state => state.uploadedImages);
	const setUploadedImages = useLoginStore(state => state.setUploadedImages);

	const description = useProfileStore(state => state.description);
	const setDescription = useProfileStore(state => state.setDescription);

	const position = useProfileStore(state => state.position);
	const setPosition = useProfileStore(state => state.setPosition);

	const handleImageUpload = (index: number, image: File | null) => {
		setUploadedImages(prevImages =>
			prevImages.map((img, i) => (i === index ? image : img))
		);
	};

	const [zodiac, setZodiac] = useState('Козерог');
  const [education, setEducation] = useState('Высшее');
  const [familyPlans, setFamilyPlans] = useState('');
  const [personalityType, setPersonalityType] = useState('');
  const [communicationStyle, setCommunicationStyle] = useState('');

	const [lifestyle1, setLifestyle1] = useState('');
  const [lifestyle2, setLifestyle2] = useState('');
  const [lifestyle3, setLifestyle3] = useState('');
	const isCurrentUserProfile = String(userId) === visitedUserId;
	const mainTriggers = [
    {
      Icon: IconPuzzle,
      title: 'Знак зодиака',
      options: ['Козерог', 'Водолей', 'Рыбы', 'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец'],
      selectedOption: zodiac,
      setSelectedOption: setZodiac,
    },
    {
      Icon: IconSchoolHat,
      title: 'Образование',
      options: ['Высшее', 'Среднее специальное', 'Среднее общее'],
      selectedOption: education,
      setSelectedOption: setEducation,
    },
    {
      Icon: IconFamily,
      title: 'Планы на семью',
      options: ['Хочу детей', 'Не хочу детей', 'Есть дети', 'Пока не решил'],
      selectedOption: familyPlans,
      setSelectedOption: setFamilyPlans,
    },
    {
      Icon: IconHead,
      title: 'Тип личности',
      options: ['Интроверт', 'Экстраверт', 'Амбиверт'],
      selectedOption: personalityType,
      setSelectedOption: setPersonalityType,
    },
    {
      Icon: IconChat,
      title: 'Стиль общения',
      options: ['Деловой', 'Дружеский', 'Романтический', 'Неформальный'],
      selectedOption: communicationStyle,
      setSelectedOption: setCommunicationStyle,
    },
  ];

  // Триггеры для стиля жизни
  const lifestyleTriggers = [
    {
      Icon: IconSports,
      title: 'Хобби',
      options: ['Спорт', 'Путешествия', 'Книги', 'Искусство'],
      selectedOption: lifestyle1,
      setSelectedOption: setLifestyle1,
    },
    {
      Icon: IconAlcohol,
      title: 'Привычки',
      options: ['Курение', 'Алкоголь', 'Спорт', 'ЗОЖ'],
      selectedOption: lifestyle2,
      setSelectedOption: setLifestyle2,
    },
    {
      Icon: IconCity,
      title: 'Интересы',
      options: ['Музыка', 'Кино', 'Наука', 'Технологии'],
      selectedOption: lifestyle3,
      setSelectedOption: setLifestyle3,
    },
  ];
	return (
		<div className={styles.profilePage}>
			{isCurrentUserProfile && (
				<SwitchModeButtonGroup
					className={styles.switchModeButtonGroup}
					values={['edit', 'preview']}
					displayValues={['Редактировать', 'Предпросмотр']}
					value={editMode ? 'edit' : 'preview'}
					setValue={v => setEditMode(v === 'edit' ? true : false)}
				/>
			)}

			{!editMode ? (
				<UserCardDetailedPage />
			) : (
				isCurrentUserProfile && (
					<div className={styles.editProfileContainer}>
						<label>Медиафайлы</label>
						<div className={styles.profileImageUploadersContainer}>
							{uploadedImages.map((image, index) => (
								<ProfileImageUploader
									key={index}
									onImageUpload={newImage => handleImageUpload(index, newImage)}
									selectedImage={image}
								/>
							))}
						</div>

						<TextInput
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder='Обо мне'
						/>

						<RangeInput
							label='Рост'
							values={[height]}
							setValues={v => setHeight(v[0])}
							min={0}
							max={200}
							unit='см'
						/>

						<TextInput
							value=''
							onChange={() => {}}
							placeholder='Цели в отношениях'
						/>


						<TextInput
							value=''
							onChange={() => {}}
							placeholder='Языки'
						/>


						<RadioModalTriggerList triggers={mainTriggers} />
						<Separator />
						<RadioModalTriggerList triggers={lifestyleTriggers} />
						<Separator />

						<TextInput
							value={position}
							onChange={e => setPosition(e.target.value)}
							placeholder='Должность'
						/>


						<TextInput
							value=''
							onChange={() => {}}
							placeholder='Компания'
						/>

						<label>Пол</label>
						<SwitchModeButtonGroup
							values={['male', 'female']}
							displayValues={['Мужской', 'Женский']}
							value={gender}
							setValue={setGender}
						/>

						<Separator />

						<label>Ориентация</label>
						<SwitchModeButtonGroup
							values={['heterosexual', 'homosexual', 'bisexual']}
							displayValues={['Хетеросексуал', 'Гомосексуал', 'Бисексуал']}
							value={orientation}
							setValue={setOrientation}
						/>

						<Separator />

						<p>Настройки аккаунта(TODO: чёто)</p>

						<Separator />

						<label>Тема</label>
						<SwitchModeButtonGroup
							values={['light', 'dark']}
							displayValues={['Светлая', 'Темная']}
							value={currentTheme}
							setValue={v => setTheme(v)}
						/>
					</div>
				)
			)}
		</div>
	);
};