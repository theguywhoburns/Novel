import { RangeInput } from '@/components';
import { ProfileImageUploader } from '@/components/login/ProfileImageUploader/ProfileImageUploader';
import { LabeledRadioButtonsList } from '@/components/ui/LabeledRadioButtonsList/LabeledRadioButtonsList';
import { Separator } from '@/components/ui/Separator/Separator';
import { SwitchModeButtonGroup } from '@/components/ui/SwitchModeButtonGroup/SwitchModeButtonGroup';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { IconSchoolHat } from '@/icons';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useProfileStore } from '@/store/profile/useProfileStore';
import { useThemeStore } from '@/store/theme/useThemeStore';
import { setTheme } from '@/theme';
import { ThemeType } from '@/theme/themes';
import { useState } from 'react';
import { UserCardDetailedPage } from '../Home/UserCardDetailedPage/UserCardDetailedPage';

export const Profile = () => {
	const [editMode, setEditMode] = useState(true);
	const [height, setHeight] = useState(187);
	const [gender, setGender] = useState('male');
	const [orientatsiya, setOrientatsiya] = useState('heterosexual');
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

	return (
		<div
			style={{ width: '100%', maxWidth: 600, height: '100%', margin: '0 auto' }}
		>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<SwitchModeButtonGroup
					values={['redact', 'preview']}
					displayValues={['Редактировать', 'Предпросмотр']}
					value={editMode ? 'redact' : 'preview'}
					setValue={v => setEditMode(v === 'redact' ? true : false)}
				/>
			</div>
			{!editMode ? (
				<UserCardDetailedPage />
			) : (
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<label>Медиафайлы</label>
					<div style={{ display: 'flex', gap: 6 }}>
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

					<p>Цели в отношениях</p>
					<input type='text' />

					<Separator />

					<p>Языки</p>
					<input type='text' />

					<Separator />

					<p>Основное(TODO: USE BOTTOM MODAL HERE)</p>
					<Separator />
					<p>Стиль жизни (TODO: USE BOTTOM MODAL HERE)</p>
					<Separator />

					<LabeledRadioButtonsList
						Icon={IconSchoolHat}
						title='Образование'
						options={['Высшее', 'Среднее специальное', 'Среднее общее']}
					/>

					<Separator />

					<TextInput
						value={position}
						onChange={e => setPosition(e.target.value)}
						placeholder='Должность'
					/>

					<Separator />

					<p>Компания</p>
					<input type='text' />

					<Separator />

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
						value={orientatsiya}
						setValue={setOrientatsiya}
					/>

					<Separator />

					<p>Настройки аккаунта(TODO: чёто)</p>

					<Separator />

					<label>Тема</label>
					<SwitchModeButtonGroup
						values={['light', 'dark']}
						displayValues={['Светлая', 'Темная']}
						value={currentTheme}
						setValue={v => setTheme(v as ThemeType)}
					/>
				</div>
			)}
		</div>
	);
};
