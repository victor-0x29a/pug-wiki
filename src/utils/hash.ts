import bcrypt from 'bcryptjs'

export const generateHash = (dataStringified: string) => {
    try {
        const saltNumber = Math.floor(Math.random() * 10)
        const salt = bcrypt.genSaltSync(saltNumber);
        const hash = bcrypt.hashSync(dataStringified, salt);
        return hash
    } catch (error) {
        throw error
    }
}

export const compareHash = async (hash: string, dataStringified: string) => {
    return await bcrypt.compare(dataStringified, hash).then((result) => {
        return result
    }).catch((error) => {
        throw error
    })
}