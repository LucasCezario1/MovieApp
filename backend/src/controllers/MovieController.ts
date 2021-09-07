import knex from '../database/connection';
import { Request, Response } from 'express';

class MovieController {
  //buscar filmes especifico por id
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const movie = await knex('movies').where('id', id).first();

    if (!movie) {
      return res.status(400).json({ message: 'Movie not found' });
    }
    const category = await knex('category')
      .join('category_movie', 'category.id', '=', 'category_movie.category_id')
      .where('category_movie.movies_id', id)
      .select('category.name')

    return res.json({ movie, category });
  }

  //buscar todos os filmes  
  async index(req: Request, res: Response) {
    const movies = await knex('movies').select('*');

    const serializedmovie = movies.map(movies => {
      return {
        id: movies.id,
        title: movies.title,
        teaser: movies.teaser,
        cover: movies.cover,
      };
    });
    return res.json(serializedmovie);
  }

  //deletar filme por id 
  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const movie = await knex('movies').where('id', id).delete();

    if (!movie) {
      return res.status(400).json({ message: 'Movie not found' });
    }

    return res.json({ message: `Filme deletado com sucesso ` });
  }

  //criar filme
  async create(req: Request, res: Response) {
    const {
      title,
      teaser,
      description,
      rating,
      age,
      cover,
      image,
      screenshots,
      category
    } = req.body;

    const trx = await knex.transaction(); // se de erro na 1 a segunda nao funciona

    const movie = {
      title,
      teaser,
      description,
      rating,
      age,
      cover: req.file.filename,
      image: req.file.filename,
      screenshots: req.file.filename,

    }
    const insertedIds = await trx('movies').insert(movie);

    const movies_id = insertedIds[0];


    // ligacao entre as duas tabelas
    const categoryMovie = category
      .split(',')
      .map((category: String) => Number(category.trim()))
      .map((category_id: number) => {
        return {
          category_id,
          movies_id,

        };
      });

    await trx('category_movie').insert(categoryMovie);

    await trx.commit(); // aonde vai para o banco de dados

    return res.json({
      id: movies_id,
      ...movie,
    });
  }
}


export default MovieController;