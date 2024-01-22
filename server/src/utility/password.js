import bcryptjs from 'bcryptjs';

export const hashPassword = async (plainPassword) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(plainPassword, saltRounds);
        console.log('Plain Password:', plainPassword);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcryptjs.compare(plainPassword, hashedPassword);
        console.log('Password Match:', match);
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};