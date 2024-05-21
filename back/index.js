import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";
import multer from "multer";

config();

const hf = new HfInference(process.env.Hf_ACCESS_TOKEN);
/*await hf.imageToText({
  data: readFileSync('test/cats.png'),
  model: 'nlpconnect/vit-gpt2-image-captioning'
})*/
const imageURL = 
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
;

