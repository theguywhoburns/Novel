import { UserTag } from '../UserTag/UserTag';
import { ITag } from './Tag/Tag';
import styles from './TagsList.module.css';

interface ITagsList {
	tags: ITag[];
}

export const TagsList = ({ tags }: ITagsList) => {
	return (
		<ul className={styles.list}>
			{tags.map(tag => (
				<UserTag
					key={tag.id}
					id={tag.id}
					Icon={tag.Icon}
					children={tag.children}
				/>
			))}
		</ul>
	);
};
