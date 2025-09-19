//here we are creating hassing function and a dcrypt function for password security and checking
import bcrypt from 'bcrypt';

export const hashPassword=async (password) => {
    try {
        const seltRounds=10 ;
        const hashedPassowrded=await bcrypt.hash(password,seltRounds);
        return hashedPassowrded;
    } catch (error) {
        console.log(error);
    }
};
export const comparePassword= async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword); 
};