// Array de objetos adaptado a las obras de arte
let obras = [
    {
        titulo: 'Pulse Room',
        estreno: 2006,
        foto: './img/lozano-hemmer-3.jpg'
    },
    {
        titulo: 'Vectorial Elevation',
        estreno: 1999,
        foto: './img/vectorialelevation.jpg'
    },
    {
        titulo: '33 Questions per Minute',
        estreno: 2000,
        foto: './img/33questions.jpg'
    },
    {
        titulo: 'Body Movies',
        estreno: 2001,
        foto: './img/bodymovies.jpg'
    },
    {
        titulo: 'Interactividad',
        estreno: 2005,
        foto: './img/lozano-hemmer-1.jpg'
    },
    {
        titulo: 'Arte en espacio público',
        estreno: 2010,
        foto: './img/lozano-hemmer-2.jpg'
    }
];

// Capturo el elemento en el que mostrar las obras
let contenedor = document.querySelector('#cards');

// Recorro el array y voy armando el HTML 
for (let i = 0; i < obras.length; i++) {
    
    // Armamos la tarjeta usando la estructura de tus LI tradicionales
    let tarjeta = '<li>';
    tarjeta += '<div class="imagen-obra"><img src="' + obras[i].foto + '" alt="' + obras[i].titulo + '"></div>';
    
    // Le agregamos un ID único a cada título y a cada párrafo del año para poder controlarlos después
    tarjeta += '<h4 id="titulo-' + i + '">' + obras[i].titulo + '</h4>';
    tarjeta += '<p class="ano-obra" id="ano-' + i + '" style="display:none; color:#ff3b30; font-family:\'Merriweather\', serif; font-weight:bold; margin-bottom:15px;">Año: ' + obras[i].estreno + '</p>';
    
    // Agregamos el botón llamando a una función interactiva pasándole el número de la tarjeta
    tarjeta += '<button class="btn-info" onclick="interaccionTarjeta(' + i + ')" style="background-color:#1a1a1a; color:white; border:none; padding:8px 15px; font-family:\'Barlow\', sans-serif; font-size:1rem; font-weight:bold; border-radius:4px; cursor:pointer; margin-bottom:20px;">+</button>';
    tarjeta += '</li>';
    
    // Lo inyectamos en el HTML
    contenedor.innerHTML += tarjeta;
}

// INTERACCIÓN CON JAVASCRIPT SIMPLE: 
// Esta función se ejecuta cuando el usuario toca el botón "+" de cualquier tarjeta
function interaccionTarjeta(indice) {
    // Seleccionamos el título y el año específicos de esa tarjeta usando el índice
    let tituloTarget = document.querySelector('#titulo-' + indice);
    let anoTarget = document.querySelector('#ano-' + indice);
    let botonTarget = event.target; // Captura el botón que se acaba de tocar

    // Si el año está oculto, lo mostramos, pintamos de rojo el título y cambiamos el botón a "-"
    if (anoTarget.style.display === 'none') {
        anoTarget.style.display = 'block';
        tituloTarget.style.color = '#ff3b30'; // Tu color rojo de acento
        botonTarget.textContent = '-';
    } else {
        // Si ya se veía, lo volvemos a esconder y dejamos el título normal
        anoTarget.style.display = 'none';
        tituloTarget.style.color = '#1a1a1a'; // El color original negro
        botonTarget.textContent = '+';
    }
}