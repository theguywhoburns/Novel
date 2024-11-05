import { ITag } from '../TagsList/Tag/Tag';
import styles from './TagsWithTitle.module.css';
import { TagsList } from '../TagsList/TagsList';

export interface ITagsWithTitle {
	title: string;
	tags: ITag[];
}

export const TagsWithTitle = ({ title, tags }: ITagsWithTitle) => {
	return (
		<div className={styles.container}>
			<h3>{title}</h3>
			<TagsList tags={tags} />
		</div>
	);
};
