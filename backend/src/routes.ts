import express from 'express';

// uploades de arquivos
import multer from 'multer';
import multerConfig from './config/multer';


//rotas de controle
import MovieController from './controllers/MovieController';
import CategoryController from './controllers/CategoryController';

const routes = express.Router();
const upload = multer(multerConfig);


const movieController = new MovieController();
const categoryController = new CategoryController();

//index, show , create , upadte destroy

//buscar todas as categorias dos filmes
routes.get('/category',categoryController.index);

//buscar um filme especifico por id
routes.get('/movies/:id',movieController.show); 

//buscar todos os filmes
routes.get('/movies',movieController.index);


//criacao de um filme com as categorias
routes.post('/movies', upload.single('image') ,upload.single('cover') ,upload.array('screenshots', 3)  ,movieController.create);

//deletar filme por id
routes.delete('/movies/:id',movieController.destroy);



export default routes;
