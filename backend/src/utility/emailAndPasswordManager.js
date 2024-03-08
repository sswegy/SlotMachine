import zxcvbn from 'zxcvbn'


const patterns = new Map()

patterns.set('EMAIL', /^[A-Za-z0-9+_.-]+@[A-Za-z0-9+_.-]+$/)
patterns.set('PASSWORD', /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)

export async function validateEmailOrPassword(type, input) {
    const pattern = patterns.get(type)
    
    if (!pattern)
        throw new Error('Invalid regex type')

    return pattern.test(input)
}

export async function checkPasswordStrength(password) {
    return zxcvbn(password).score
}