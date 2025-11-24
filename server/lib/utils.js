import jwt from 'jsonwebtoken';

/* Function to generate a token for a user */
export const generateToken = (usreId)=>{
    const token = jwt.sign({usreId}, process.env.JWT_SECRET)
    return token
}