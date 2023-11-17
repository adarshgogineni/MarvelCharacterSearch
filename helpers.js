 
 //check string and trim it function
 export function checkstringtrim(str) {
    if(!str){
        throw 'Input cannot be empty'
    }
    if(typeof(str) !== 'string'){
        throw 'Input Must be string'
    }

    str = str.trim()
    if(str.length === 0){
        throw 'Input cannot be empty'
    }

    return str


 }