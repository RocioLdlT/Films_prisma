import type { PrismaClient } from '../../generated/prisma/client.ts';
import type {
  UserCreateInput,
  UserCreateWithoutProfileInput,
  UserCreateWithoutReviewsInput,
} from '../../generated/prisma/models.ts';
import { env } from '../config/env.ts';
import debug from 'debug';
import { AuthService } from '../services/auth.ts';

const log = debug(`${env.PROJECT_NAME}:repo.users`);
log('Loading users repo...');

export class UserRepo {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // CRUD de lo que más nos interesa

  // En el caso de nuestros Users nos interesa primero registro y login
  async register(userData: UserCreateInput) {
    userData.password = await AuthService.hash(userData.password);
    const result = await this.prisma.user.create({
      data: userData,
      omit: { password: true },
      include: { profile: true },
    });
    return result;
  }
  async login(
    userData: UserCreateWithoutReviewsInput & UserCreateWithoutProfileInput,
  ) {
    const result = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
        // password: userData.password, no se puede porque la password está encriptada/hashseada por tanto tenemos que hacerlo con compare
        // userData.password -> desencriptada
        // result.password -> encriptada
      },
    });

    if (result === null) {
      throw new Error('Invalid login');
    }
    const isValid = await AuthService.compare(
      userData.password,
      result.password,
    );
    if (!isValid) {
        throw new Error('Invalid login')
    }
    return {
        id: result.id, email: result.email
    }
  }
}
