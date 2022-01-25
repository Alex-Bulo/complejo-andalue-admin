export const isEmpty = (value) => {
    return value.length === 0 
}

export const isEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true
    }
        
    return false

}
