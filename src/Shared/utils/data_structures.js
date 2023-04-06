export function reverseString(str){
   var 	strRev = "";
 
	for(let i=0; i<str.length; i++){
		strRev = str[i] + strRev;
	}
    return strRev;
}


export const yyyyMMDDtoDDMMYYYY = (date) => {
    let dateArr = date.split("-");
    return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
}