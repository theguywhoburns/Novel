import { Separator } from '../Separator/Separator';
import { ITag } from '../TagsList/Tag/Tag';
import { TagsList } from '../TagsList/TagsList';
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
