import { env } from '../config/env.ts';
import debug from 'debug';
import { hash, compare } from 'bcryptjs';
import type { TokenPayload } from '../types/login.ts';
import jwt  from 'jsonwebtoken';

const log = debug( `${env.PROJECT_NAME}:service.auth`);
log('Loading auth service...');

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthService {
    static saltRound = 12 //Mejor guardar el saltRound en .env para no dar este detalle de nº de vueltas.
    static hash (password: string): Promise<string> {
        return hash(password, this.saltRound)

    }
    static compare(password: string, hash: string): Promise<boolean>{
        return compare(password, hash)
    }
     static generateToken(payload: TokenPayload): string {
        return jwt.sign(
            payload,
            env.JWT_SECRET,
            //{ expiresIn: '1h' }
        );
    }

    static verifyToken(token: string): TokenPayload | null {
        try {
            return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
        } catch (error) {
            log('Invalid token:', error);
            return null;
        }
    }
}