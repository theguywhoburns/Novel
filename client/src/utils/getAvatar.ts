export const getAvatar = (imgUrls: string, separator = ';') => {
	const firstImgUrl = imgUrls?.split(separator)[0];

	return firstImgUrl || "";
};
