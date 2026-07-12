// Variables Globales de configuración
let cantObrasTotal = 0;
let consumoPorHoraLuz = 0;
let costoPorkWh = 0;

// Array para guardar los objetos de las obras
let datosObras = [];

// Captura de elementos del DOM
let formInicial = document.querySelector('#formInicial');
let formObras = document.querySelector('#formObras');
let divResultados = document.querySelector('#resultados');
let spanNumObraActual = document.querySelector('#numObraActual');

let btnConfirmar = document.querySelector('#btnConfirmar');
let btnIngresarObra = document.querySelector('#btnIngresarObra');
let btnReiniciar = document.querySelector('#btnReiniciar');

// EVENTO 1: Confirmar configuración inicial
btnConfirmar.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Capturamos los valores y los convertimos explícitamente a números
    cantObrasTotal = Number(document.querySelector('#cantObras').value);
    consumoPorHoraLuz = Number(document.querySelector('#consumoHora').value);
    costoPorkWh = Number(document.querySelector('#costokWh').value);

    // VALIDADOR ABSOLUTO: Si es menor o igual a 0, o si está vacío (lo toma como 0), frena acá
    if (cantObrasTotal <= 0 || isNaN(cantObrasTotal) || document.querySelector('#cantObras').value == '') {
        alert('Ingrese una cantidad válida de obras (debe ser un número mayor a 0)');
        return false;
    }
    if (consumoPorHoraLuz <= 0 || isNaN(consumoPorHoraLuz) || document.querySelector('#consumoHora').value == '') {
        alert('El consumo de luz debe ser un número mayor a 0');
        return false;
    }
    if (costoPorkWh <= 0 || isNaN(costoPorkWh) || document.querySelector('#costokWh').value == '') {
        alert('El costo por kWh debe ser un número mayor a 0');
        return false;
    }

    // Si pasó todas las pruebas, avanzamos al siguiente formulario
    formInicial.style.display = 'none';
    formObras.style.display = 'block';
    spanNumObraActual.innerText = datosObras.length + 1;
});

// EVENTO 2: Ingresar cada obra individual
btnIngresarObra.addEventListener('click', function(e) {
    e.preventDefault();
    ingresarObra();
});

// EVENTO 3: Reiniciar todo el sistema
btnReiniciar.addEventListener('click', function(e) {
    e.preventDefault();
    reiniciarTodo();
});


// FUNCIÓN: Procesa e ingresa los datos de una obra
function ingresarObra() {
    let nombre = document.querySelector('#nombreObra').value;
    let luces = Number(document.querySelector('#lucesObra').value);
    let horas = Number(document.querySelector('#horasObra').value);

    // Validaciones estrictas anti-vacíos y anti-negativos
    if (nombre == '') {
        alert('El nombre de la obra no puede estar vacío');
        return false;
    }
    if (luces <= 0 || isNaN(luces) || document.querySelector('#lucesObra').value == '') {
        alert('La cantidad de luces debe ser un número mayor a 0');
        return false;
    }
    if (horas <= 0 || horas > 24 || isNaN(horas) || document.querySelector('#horasObra').value == '') {
        alert('Las horas de funcionamiento deben ser mayores a 0 y un máximo de 24');
        return false;
    }

    // Armamos el objeto de la obra con los datos validados
    let nuevaObra = {
        nombre: nombre,
        luces: luces,
        horas: horas
    }

    // Lo guardamos en el array global
    datosObras.push(nuevaObra);

    // Vaciamos los inputs para la siguiente carga
    document.querySelector('#nombreObra').value = '';
    document.querySelector('#lucesObra').value = '';
    document.querySelector('#horasObra').value = '';

    // Verificamos si terminamos de cargar la cantidad que el usuario pidió al principio
    if (datosObras.length == cantObrasTotal) {
        formObras.style.display = 'none';
        divResultados.style.display = 'block';
        mostrarResultadosCalculados();
    } else {
        // Si faltan, cambiamos el número en el título del formulario (ej: Obra 2)
        spanNumObraActual.innerText = datosObras.length + 1;
    }
}


// FUNCIÓN: Realiza las operaciones matemáticas requeridas
function mostrarResultadosCalculados() {
    let consumoDiarioTotal = 0;
    let obrasConMasDe20Luces = 0;
    
    // Tomamos la primera obra del array como base para calcular el máximo de horas
    let obraMayorTiempo = datosObras[0];

    // Ciclo FOR 
    for (let i = 0; i < datosObras.length; i++) {
        // Operación: luces * horas * consumo unitario
        let consumoDeEstaObra = datosObras[i].luces * datosObras[i].horas * consumoPorHoraLuz;
        consumoDiarioTotal += consumoDeEstaObra;

        // Buscador de la obra con más horas
        if (datosObras[i].horas > obraMayorTiempo.horas) {
            obraMayorTiempo = datosObras[i];
        }

        // Contador de obras grandes (más de 20 luces)
        if (datosObras[i].luces > 20) {
            obrasConMasDe20Luces++;
        }
    }

    // Cálculos de porcentajes y promedios finales
    let consumoPromedioPorObra = consumoDiarioTotal / cantObrasTotal;
    let costoDiarioMayorObra = (obraMayorTiempo.luces * obraMayorTiempo.horas * consumoPorHoraLuz) * costoPorkWh;
    let porcentajeObrasMas20Luces = (obrasConMasDe20Luces / cantObrasTotal) * 100;

    // Pintamos los resultados usando .toFixed(2) para que los decimales queden prolijos
    document.querySelector('#resultadoConsumo').innerText = `1. Consumo diario total del sistema: ${consumoDiarioTotal.toFixed(2)} kWh. El consumo promedio diario por obra es de ${consumoPromedioPorObra.toFixed(2)} kWh.`;
    document.querySelector('#resultadoMayorTiempo').innerText = `2. La obra con mayor tiempo de funcionamiento activo es "${obraMayorTiempo.nombre}" (${obraMayorTiempo.horas} hs/día), generando un costo de electricidad diario de $${costoDiarioMayorObra.toFixed(2)}.`;
    document.querySelector('#resultadoPorcentaje').innerText = `3. El porcentaje de obras que requieren de más de 20 luces móviles es del ${porcentajeObrasMas20Luces.toFixed(2)}%.`;
}


// FUNCIÓN: Limpia la memoria del sistema para empezar de nuevo
function reiniciarTodo() {
    datosObras = [];
    cantObrasTotal = 0;
    consumoPorHoraLuz = 0;
    costoPorkWh = 0;

    // Limpiamos los campos del primer formulario
    document.querySelector('#cantObras').value = '';
    document.querySelector('#consumoHora').value = '';
    document.querySelector('#costokWh').value = '';

    // Volvemos visualmente al estado inicial
    divResultados.style.display = 'none';
    formInicial.style.display = 'block';
}