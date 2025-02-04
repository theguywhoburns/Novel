interface ICases {
	zeroOne: string; // For numbers ending in 1, but not 11
	twoFour: string; // For numbers ending in 2, 3, or 4 but not 12, 13 and 14
	fiveTen: string; // For all other numbers
}

export const getCaseByAmount = (cases: ICases, amount: number): string => {
	const lastDigit = amount % 10;
	const lastTwoDigits = amount % 100;

	let result = cases.fiveTen;

	if (lastTwoDigits > 10 && lastTwoDigits < 15) {
		result = cases.fiveTen;
	} else {
		if (lastDigit === 1) {
			result = cases.zeroOne;
		} else if (lastDigit >= 2 && lastDigit <= 4) {
			result = cases.twoFour;
		} else {
			result = cases.fiveTen;
		}
	}
	return result;
};
