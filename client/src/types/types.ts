type Enumerate<
	N extends number,
	Acc extends number[] = []
> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<
	Enumerate<T>,
	Enumerate<F>
>;

export type Rating = IntRange<0, 51>;

export type NumericTuple<
	Length extends number,
	Result extends number[] = []
> = Result['length'] extends Length
	? Result
	: NumericTuple<Length, [...Result, number]>;
