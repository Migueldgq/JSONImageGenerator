import { promises as fs } from "fs";
import path from "path";

// Ruta de las carpetas con las imágenes
const baseDir = "./imagenes"; // **OJO** aqui va la ruta personalizada
const sliderDir = path.join(baseDir, "slider");
const carouselDir = path.join(baseDir, "carousel");
const servicesDir = path.join(baseDir, "services-pics");
const PNGsDir = path.join(baseDir, "PNGs");

// Función principal
const generateImageJson = async () => {
  try {
    const sliderFiles = await fs.readdir(sliderDir);
    const carouselFiles = await fs.readdir(carouselDir);
    const servicesFiles = await fs.readdir(servicesDir);
    const PNGsFiles = await fs.readdir(PNGsDir);

    // Filtrar archivos de imagen 
    const imageFiles = [
      ...sliderFiles
        .filter((file) => /\.(jpg|jpeg|png|gif|JPG|PNG)$/.test(file))
        .map((file) => ({ file, type: "slider" })),
      ...carouselFiles
        .filter((file) => /\.(jpg|jpeg|png|gif|JPG|PNG)$/.test(file))
        .map((file) => ({ file, type: "carousel" })),
      ...servicesFiles
        .filter((file) => /\.(jpg|jpeg|png|gif|JPG|PNG)$/.test(file))
        .map((file) => ({ file, type: "services" })),
      ...PNGsFiles.filter((file) =>
        /\.(jpg|jpeg|png|gif|JPG|PNG)$/.test(file)
      ).map((file) => ({ file, type: "PNGs" })),
    ];

    // Generar un array de objetos con la estructura que yo quiera
    const images = imageFiles.map((image, index) => ({
      id: index + 1,
      url: path.join("/", image.type, image.file).replace(/\\/g, "/"),
      alt: `Descripción de la imagen ${index + 1}`, 
      type: image.type,
    }));

    // Convertir el array a JSON
    const jsonContent = JSON.stringify(images, null, 2);

    // Escribir el archivo images.json
    await fs.writeFile("images.json", jsonContent, "utf8");
    console.log("Archivo images.json creado con éxito");
  } catch (err) {
    console.error("Error:", err);
  }
};

// Ejecutar la función principal
generateImageJson();
