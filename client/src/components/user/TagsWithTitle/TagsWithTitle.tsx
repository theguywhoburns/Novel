import { Separator } from '@/components/ui/Separator/Separator';
import { TagsList } from '../TagsList/TagsList';
import { ITag } from '../UsersList/UserCard/UserCardTag/UserCardTag';
import styles from './TagsWithTitle.module.css';

export interface ITagsWithTitle {
	title: string;
	tags: ITag[];
}

export const TagsWithTitle = ({ title, tags }: ITagsWithTitle) => {
	return (
		<div className={styles.container}>
			<h3>{title}</h3>
			<TagsList tags={tags} />
			<Separator />
		</div>
	);
};
