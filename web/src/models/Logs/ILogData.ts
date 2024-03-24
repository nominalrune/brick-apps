type DateString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
export interface ILogData {
	date: DateString,
	timeFrom?: DateString,
	timeTo?: DateString,
	title: string,
	detail: string,
	subject?: string;
}




type zeroToTwo = "0" | "1" | "2";
type ToThree = zeroToTwo | "3";
type ToFour = ToThree | "4";
type d = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type months = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
type year<YMDhms> = YMDhms extends `${infer U}-${number}-${number}T${number}:${number}:${number}.${number}Z` ? U extends `${d}${d}${d}${d}` ? `${U}` : string : never;
type month<YMDhms> = YMDhms extends `${number}-${infer U}-${number}T${number}:${number}:${number}.${number}Z` ? U extends `${months}` ? `${U}` : string : never;
type day<YMDhms> = YMDhms extends `${year<YMDhms>}-${month<YMDhms>}-${infer U}T${string}` ? `${U}` : never;
type hour<YMDhms> = YMDhms extends `${year<YMDhms>}-${month<YMDhms>}-${day<YMDhms>}T${infer U}:${string}` ? `${U}` : never;
type minutes<YMDhms> = YMDhms extends `${year<YMDhms>}-${month<YMDhms>}-${day<YMDhms>}T${hour<YMDhms>}:${infer U}:${string}` ? `${U}` : never;
type second<YMDhms> = YMDhms extends `${year<YMDhms>}-${month<YMDhms>}-${day<YMDhms>}T${hour<YMDhms>}:${minutes<YMDhms>}:${infer U}.${string}` ? `${U}` : never;
type millisecond<YMDhms> = YMDhms extends `${year<YMDhms>}-${month<YMDhms>}-${day<YMDhms>}T${hour<YMDhms>}:${minutes<YMDhms>}:${second<YMDhms>}.${infer U}Z` ? `${U}` : never;
let ayear: year<"2022-02-04T21:12:71.683Z">;
let amonth: month<"2022-02-04T21:12:71.683Z">;

type DigitString<Length extends 1 | 2 | 3 | 4 > = Length extends 1
	? `${d}`
	: Length extends 2
	? `${d}${d}`
	: Length extends 3
	? `${d}${d}${d}`
	: Length extends 4
	? `${d}${d}${d}${d}`
	: never;
	type DateString02 = `${DigitString<4>}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
