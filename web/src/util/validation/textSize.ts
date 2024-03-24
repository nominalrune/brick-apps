export function validateTextSize(target:string,option:{min:number,max:number}){
	const {min, max}=option;
	if(target.length<min){
		return {status:"invalid",message:"the text is too short."}
	}else if(target.length>max){
		return {status:"invalid",message:"the text is too long."}
	}
}
