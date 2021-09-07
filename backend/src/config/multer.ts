import multer from 'multer';
import path from 'path';
import crypto from 'crypto'; // criptografia

// para aonde as images vao
export default{
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..','..','uploadsMovie'), //caminho
      filename(req , file, callback){
        const hash = crypto.randomBytes(6).toString('hex');

        // indedificar qual e o arquivo do usuario
        const filename = `${hash} - ${file.originalname}`;

        callback(null, filename);
      }
    }),
};