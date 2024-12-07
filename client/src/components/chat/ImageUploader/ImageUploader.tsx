import { Modal } from '@/components/ui/Modal/Modal';
import { RoundedButton } from '@/components/ui/RoundedButton/RoundedButton';
import { IconClip } from '@/icons/Clip';
import { useEffect, useState } from 'react';
import styles from './ImageUploader.module.css';

interface IImageUploader {
	onImageUpload: (file: File | null, imagePreview: string | null) => void;
	selectedImage: File | string | null;
}

export const ImageUploader = ({
	onImageUpload,
	selectedImage,
}: IImageUploader) => {
	const [imagePreview, setImagePreview] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(true);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
				onImageUpload(file, reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setImagePreview('');
			onImageUpload(null, null);
		}
	};

	useEffect(() => {
		if (selectedImage) {
			if (typeof selectedImage === 'string') {
				setImagePreview(selectedImage);
			} else {
				const reader = new FileReader();
				reader.onloadend = () => {
					setImagePreview(reader.result as string);
				};
				reader.readAsDataURL(selectedImage);
			}
		} else {
			setImagePreview('');
		}
	}, [selectedImage]);

	return (
		<label className={styles.labelWrapper} htmlFor='image-upload'>
			<input
				type='file'
				accept='image/*'
				onChange={handleImageChange}
				className={styles.input}
				id='image-upload'
			/>
			{imagePreview && (
				<Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
					<img
						src={imagePreview}
						alt='Preview'
						className={styles.imagePreview}
					/>
					<RoundedButton onClick={() => setIsModalOpen(false)}>
						Отправить
					</RoundedButton>
				</Modal>
			)}
			<div className={styles.uploadButton}>
				<IconClip />
			</div>
		</label>
	);
};
