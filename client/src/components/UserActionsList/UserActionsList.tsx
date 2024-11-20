import { IUserAction, UserAction } from './UserAction/UserAction';
import styles from './UserActionsList.module.css';

const userActions: IUserAction[] = [
	{ title: 'Поделиться профилем', onClick: () => {} },
	{ title: 'Пожаловаться', onClick: () => {} },
	{ title: 'Заблокировать пользователя', onClick: () => {} },
];

export const UserActionsList = () => {
	return (
		<ul className={styles.UserActionsList}>
			{userActions.map(action => (
				<UserAction
					key={action.title}
					title={action.title}
					onClick={action.onClick}
				/>
			))}
		</ul>
	);
};
