export const isEmpty = (value) => {
    return value.length === 0 
}

export const isNumber = (value) => {
    return typeof Number(value) === 'number' 
}

export const isEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true
    }
        
    return false

}

export const validations = (input, answer) => {
    input.error = false
    
    
    if(input.type==='text'){
        if(isEmpty(answer)){
            input.error = true
            input.errorMsg = 'Ingresar información'
        }
    }
    
    if(input.type==='email'){
        if(!isEmail(answer)){
            input.error = true
            input.errorMsg = 'Ingresar mail válido'            
        }
    }

    if(input.type==='number'){
        if(!isNumber(answer)){
            input.error = true
            input.errorMsg = 'Ingresar número'
        }
    }

}