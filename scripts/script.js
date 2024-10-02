let mesas = {}; // Almacena el tiempo y estado de cada mesa
let intervalos = {}; // Almacena los intervalos activos

// Función para crear una nueva mesa con su temporizador
function agregarMesa(idMesa) {
    mesas[idMesa] = { tiempo: 0, enUso: false }; // Inicia la mesa con 0 tiempo y estado "pausado"
    actualizarInterfaz(); // Actualizar la interfaz con la nueva mesa
}

// Función para iniciar el temporizador de una mesa
function iniciarTemporizador(idMesa) {
    if (!mesas[idMesa].enUso) {
        mesas[idMesa].enUso = true;
        intervalos[idMesa] = setInterval(() => {
            mesas[idMesa].tiempo++;
            actualizarInterfaz(idMesa);
        }, 1000); // Actualiza cada segundo
    }
}

// Función para pausar el temporizador de una mesa
function pausarTemporizador(idMesa) {
    if (mesas[idMesa].enUso) {
        clearInterval(intervalos[idMesa]);
        mesas[idMesa].enUso = false;
    }
}

// Función para resetear el temporizador de una mesa
function resetearTemporizador(idMesa) {
    clearInterval(intervalos[idMesa]);
    mesas[idMesa].tiempo = 0;
    mesas[idMesa].enUso = false;
    actualizarInterfaz(idMesa);
}

// Función para actualizar la interfaz y mostrar el tiempo en formato hh:mm:ss
function actualizarInterfaz(idMesa) {
    const tiempoTotal = mesas[idMesa].tiempo;
    const horas = Math.floor(tiempoTotal / 3600);
    const minutos = Math.floor((tiempoTotal % 3600) / 60);
    const segundos = tiempoTotal % 60;
    document.getElementById(`${idMesa}-tiempo`).textContent = 
        `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

// Función para eliminar una mesa
function eliminarMesa(idMesa) {
    clearInterval(intervalos[idMesa]);
    delete mesas[idMesa];
    actualizarInterfaz(); // Vuelve a renderizar la lista sin la mesa eliminada
}

// Ejemplo de cómo manejar agregar y eliminar mesas en la interfaz
document.getElementById('agregarMesaBtn').addEventListener('click', () => {
    const nuevaMesaId = `mesa${Object.keys(mesas).length + 1}`;
    agregarMesa(nuevaMesaId);
});

document.getElementById('eliminarMesaBtn').addEventListener('click', () => {
    const ultimaMesaId = `mesa${Object.keys(mesas).length}`;
    eliminarMesa(ultimaMesaId);
});
