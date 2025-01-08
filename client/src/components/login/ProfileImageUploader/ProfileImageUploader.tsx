import { IconPlusOutlined } from '@/icons';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import styles from './ProfileImageUploader.module.css';

interface IProfileImageUploader extends React.HTMLAttributes<HTMLLabelElement> {
	onImageUpload: (file: File | null, imagePreview: string | null) => void;
	selectedImage: File | string | null;
}

export const ProfileImageUploader = ({
	onImageUpload,
	selectedImage,
	...props
}: IProfileImageUploader) => {
	const theme = useTheme();
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
				onImageUpload(file, reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setPreviewUrl(null);
			onImageUpload(null, null);
		}
	};

	useEffect(() => {
		if (selectedImage) {
			if (typeof selectedImage === 'string') {
				setPreviewUrl(selectedImage);
			} else {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreviewUrl(reader.result as string);
				};
				reader.readAsDataURL(selectedImage);
			}
		} else {
			setPreviewUrl(null);
		}
	}, [selectedImage]);

	return (
		<label className={styles.labelWrapper} {...props}>
			<input
				type='file'
				accept='image/*'
				onChange={handleImageChange}
				className={styles.input}
			/>
			{previewUrl ? (
				<img className={styles.imagePreview} src={previewUrl} alt='Preview' />
			) : (
				<div
					className={styles.uploadButton}
					style={{ border: `1px dashed ${theme.grey}` }}
				>
					<IconPlusOutlined />
				</div>
			)}
		</label>
	);
};
