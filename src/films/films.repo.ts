import { env } from '../config/env.ts';
import debug from 'debug';
import type { AppPrismaClient } from '../config/db.ts';
import type { Film, FilmCreateDTO } from './film.schemas.zod.ts';

const log = debug(`${env.PROJECT_NAME}:repo.users`);
log('Loading users repo...');

export class FilmsRepo {
  private prisma: AppPrismaClient;
  constructor(prisma: AppPrismaClient) {
    this.prisma = prisma;
  }

  // CRUD de lo que más nos interesa

  // Buscar todas las películas para los usuarios (Get)
  // Crear, modificar y borrar películas también para los Admin.

  async getAllFilms(): Promise<Film[]> {
    log('Getting all films');
    return await this.prisma.film.findMany({
      include: { genres: { omit: { id: true } } },
    });
  }
  async getFilmById(id: number): Promise<Film> {
    log('Getting film with tittle ${id}', id);
    return await this.prisma.film.findUniqueOrThrow

  }

  async createFilm(filmData: FilmCreateDTO) {
    log('Create film');
    data{ id:

    }
  }
  async updateFilm() {}
  async delete() {}
}
