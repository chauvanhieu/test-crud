import * as jwt from 'jsonwebtoken';

const secretKey = 'helloIT';

const expiresIn = '1h';

export const signJwt = (data: any) => {
    return jwt.sign(data, secretKey, { expiresIn });
};

export const verify = (token: string) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};
