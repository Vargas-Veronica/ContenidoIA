/*import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";
import multer from "multer";

config();

const upload = multer({ dest: 'uploads/' });

const hf = new HfInference(process.env.Hf_ACCESS_TOKEN);
/*await hf.imageToText({
  data: readFileSync('test/cats.png'),
  model: 'nlpconnect/vit-gpt2-image-captioning'
})*/
/*const imageURL = 
  "https://www.purina.com.ar/sites/default/files/styles/webp/public/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg.webp?itok=9zgitaBO";

const model = "Salesforce/blip-image-captioning-large";

try {
  const response = await fetch(imageURL);
  const blob = await response.blob();

  const result = await hf.imageToText({
    data: blob,
    model,
  });

  console.log(result);
} catch (error) {
  console.log(error);
}
;*/
/*import express from 'express';
import multer from 'multer';
import { HfInference } from '@huggingface/inference';
import { config } from 'dotenv';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import fetch from "node-fetch"
//const fetch = require('node-fetch');


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rutaAbsoluta = path.resolve(__dirname, 'uploads', 'imagen.jpg');
console.log(rutaAbsoluta);


config();

const app = express();
const upload = multer({ dest: 'uploads/' });
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
const model = "Salesforce/blip-image-captioning-large";

app.use(cors()); // Usar CORS para permitir todas las solicitudes





// Middleware para parsear JSON
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Ruta para generar historias
app.post('/generate-story', upload.single('image'), async (req, res) => {
    const { brand, tone } = req.body;
    console.log('Received /generate-story request with:', { brand, tone });

    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const imageBuffer = fs.readFileSync(req.file.path);
        console.log('Read file:', req.file.path);

        const imageResult = await hf.imageToText({
            data: imageBuffer,
            model,
        });
        console.log('Image to text result:', imageResult);

        const story = `Marca: ${brand}, Tono: ${tone}, Descripción de la imagen: ${imageResult.generated_text}`;
        res.json({ story });
    } catch (error) {
        console.error('Error in /generate-story:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta para generar contenido
app.post('/generate-content', async (req, res) => {
    const { inputText } = req.body;
    console.log('Received /generate-content request with inputText:', inputText);

    try {
        const generatedText = `Contenido generado para: ${inputText}`;
        const imageURL = 'http://localhost:3000/generate-story'; // Reemplaza esto con la lógica real
        res.json({ text: generatedText, imageURL });
    } catch (error) {
        console.error('Error in /generate-content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta para describir una imagen
app.post('/describe-image', async (req, res) => {
    const { imageURL } = req.body;
    console.log('Received /describe-image request with imageURL:', imageURL);

    try {
        const response = await fetch(imageURL);
        const blob = await response.buffer();
        // Luego, en tu código donde realizas la solicitud HTTP:
//const response = await fetch(imageURL, { method: 'GET', mode: 'cors' });

        console.log('Fetched image from URL:', imageURL);

        const imageDescription = await hf.imageToText({
            data: blob,
            model,
        });
        console.log('Image description result:', imageDescription);

        res.json({ description: imageDescription.generated_text });
    } catch (error) {
        console.error('Error in /describe-image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

*/

import express from 'express';
import multer from 'multer';
import { HfInference } from '@huggingface/inference';
import { config } from 'dotenv';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import fetch from 'node-fetch';
config(); // Carga las variables de entorno desde el archivo .env
// Definir la función de almacenamiento antes de configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.png`); // Cambia la extensión a '.png'
  }
});

// Ahora puedes configurar multer utilizando la función de almacenamiento
const upload = multer({ storage: storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rutaAbsoluta = path.resolve(__dirname, 'uploads', 'imagen.jpg');
console.log(rutaAbsoluta);



const app = express();
//const upload = multer({ dest: 'uploads/' });

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
const model = 'Salesforce/blip-image-captioning-large';

app.use(cors()); // Usar CORS para permitir todas las solicitudes

// Middleware para parsear JSON
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.png`); // Cambia la extensión a '.png'
  }
});
*/

// Ruta para generar historias
app.post('/generate-story', upload.single('image'), async (req, res) => {
    const { brand, tone } = req.body;
    console.log('Received /generate-story request with:', { brand, tone });

    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const imageBuffer = fs.readFileSync(req.file.path);
        console.log('Read file:', req.file.path);

        const imageResult = await hf.imageToText({
            data: imageBuffer,
            model,
        });
        console.log('Image to text result:', imageResult);

        const story = `Marca: ${brand}, Tono: ${tone}, Descripción de la imagen: ${imageResult.generated_text}`;
        res.json({ story });
    } catch (error) {
        console.error('Error in /generate-story:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta para generar contenido
app.post('/generate-content', async (req, res) => {
    const { inputText } = req.body;
    console.log('Received /generate-content request with inputText:', inputText);

    try {
        const generatedText = `Contenido generado para: ${inputText}`;
        const imageURL = 'http://localhost:3000/generate-story'; // Reemplaza esto con la lógica real
        res.json({ text: generatedText, imageURL });
    } catch (error) {
        console.error('Error in /generate-content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta para describir una imagen
app.post('/describe-image', async (req, res) => {
    const { imageURL } = req.body;
    console.log('Received /describe-image request with imageURL:', imageURL);

    try {
        const response = await fetch(imageURL);
        const blob = await response.buffer();
        console.log('Fetched image from URL:', imageURL);

        const imageDescription = await hf.imageToText({
            data: blob,
            model,
        });
        console.log('Image description result:', imageDescription);

        res.json({ description: imageDescription.generated_text });
    } catch (error) {
        console.error('Error in /describe-image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
