const createToken = (stringlenth) =>{
    let  length = stringlenth;
    length = typeof(stringlenth) === "number" && stringlenth > 0 ? stringlenth : false;

    if(length){
        let possibleCharekter = "abdfdvdfvdfrcdsf5csavdfsvdsfvdfsdvdsvdsvvcsdcsddb3c69g84261";
        let output = "";
        for( let i=1; i<length; i+=1 ){
            let randomCharekter =  possibleCharekter.charAt(Math.floor(Math.random() * possibleCharekter.length));
            output += randomCharekter;
        }
        return output;
    }
    else{
        return false
    }
 }
 module.exports = {createToken}