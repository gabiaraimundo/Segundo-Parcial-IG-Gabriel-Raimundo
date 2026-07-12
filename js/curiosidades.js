// 1. Guardamos todos los datos curiosos en un Array (lista)
const datosCuriosos = [
    "Rafael Lozano-Hemmer es un artista mexicano-canadiense especializado en instalaciones interactivas en espacios públicos.",
    "Su obra combina tecnología avanzada como sensores biométricos, robótica y datos en tiempo real.",
    "En su proyecto Vectorial Elevation, ciudadanos controlaban reflectores gigantes a través de internet.",
    "Pulse Room es una instalación que traduce los latidos cardíacos de los visitantes en pulsos de luz.",
    "Su trabajo explora la relación entre el cuerpo humano, la tecnología y la vigilancia.",
    "Ha expuesto sus obras en más de 70 países alrededor del mundo.",
    "Lozano-Hemmer estudió ingeniería antes de dedicarse al arte, lo que influye en su enfoque tecnológico.",
    "Sus instalaciones suelen involucrar la participación activa del público para activar la obra.",
    "Fue ganador del prestigioso premio Ars Electronica por su innovador uso de tecnología en arte.",
    "Utiliza la luz como lenguaje poético para explorar temas de identidad, memoria y presencia."
];

// 2. Capturamos los elementos del HTML usando sus IDs
const boton = document.getElementById("boton-curiosidad");
const parrafo = document.getElementById("texto-curiosidad");

// 3. Creamos la función que elige un dato al azar
function mostrarDatoAlAzar() {
    // Generamos un índice aleatorio entre 0 y el largo de la lista
    const indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length);
    
    // Obtenemos el dato usando ese índice
    const datoSeleccionado = datosCuriosos[indiceAleatorio];
    
    // OPCIÓN A: Mostrarlo adentro de la página (La más estética y recomendada)
    parrafo.textContent = datoSeleccionado;
    
    // OPCIÓN B: Si preferís el popup nativo del navegador, descomentá la línea de abajo:
    // alert(datoSeleccionado);
}

// 4. Escuchamos el evento 'click' en el botón para ejecutar la función
boton.addEventListener("click", mostrarDatoAlAzar);