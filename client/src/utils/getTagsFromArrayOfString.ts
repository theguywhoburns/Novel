	export const getTagsFromArrayOfStrings = (
		array: string[],
		Icon: JSX.Element | null = null
	) => {
		return [array].map((tag, index) => ({
			id: String(index + 1),
			children: tag,
			Icon,
		}));
	};