import { ITag } from '../UsersList/UserCard/UserCardTag/UserCardTag';
import styles from './TagsList.module.css';
import { UserTag } from './UserTag/UserTag';

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
