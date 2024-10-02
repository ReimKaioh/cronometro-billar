let mesas = {}; // Objeto para almacenar las mesas y su tiempo
let intervalos = {}; // Almacenar los intervalos de cada mesa

// Función para formatear el tiempo a hh:mm:ss
function formatearTiempo(segundosTotales) {
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    const horasFormateadas = horas.toString().padStart(2, '0');
    const minutosFormateados = minutos.toString().padStart(2, '0');
    const segundosFormateados = segundos.toString().padStart(2, '0');

    return `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
}

// Función para crear una mesa en la interfaz
function crearMesa(idMesa) {
    const mesasContainer = document.getElementById('mesas-container');
    const mesaDiv = document.createElement('div');
    mesaDiv.className = 'mesa';
    mesaDiv.id = idMesa;
    
    mesaDiv.innerHTML = `
        <h2>${idMesa}</h2>
        <p>Tiempo: <span id="${idMesa}-tiempo">00:00:00</span></p>
        <button onclick="iniciarTemporizador('${idMesa}')">Iniciar</button>
        <button onclick="pausarTemporizador('${idMesa}')">Pausar</button>
        <button onclick="resetearTemporizador('${idMesa}')">Resetear</button>
    `;

    mesasContainer.appendChild(mesaDiv);
}

// Función para actualizar el tiempo en la interfaz
function actualizarTiempo(idMesa) {
    const tiempoFormateado = formatearTiempo(mesas[idMesa].tiempo);
    document.getElementById(`${idMesa}-tiempo`).textContent = tiempoFormateado;
}

// Función para iniciar el temporizador
function iniciarTemporizador(idMesa) {
    if (!mesas[idMesa].enUso) {
        mesas[idMesa].enUso = true;
        intervalos[idMesa] = setInterval(() => {
            mesas[idMesa].tiempo++;
            actualizarTiempo(idMesa);
        }, 1000);
    }
}

// Función para pausar el temporizador
function pausarTemporizador(idMesa) {
    clearInterval(intervalos[idMesa]);
    mesas[idMesa].enUso = false;
}

// Función para resetear el temporizador
function resetearTemporizador(idMesa) {
    clearInterval(intervalos[idMesa]);
    mesas[idMesa].tiempo = 0;
    mesas[idMesa].enUso = false;
    actualizarTiempo(idMesa);
}

// Función para agregar una nueva mesa
function agregarMesa() {
    const nuevaMesaId = `mesa${Object.keys(mesas).length + 1}`;
    mesas[nuevaMesaId] = { tiempo: 0, enUso: false };
    crearMesa(nuevaMesaId);
}

// Función para eliminar la última mesa
function eliminarMesa() {
    const mesasIds = Object.keys(mesas);
    if (mesasIds.length > 0) {
        const ultimaMesaId = mesasIds[mesasIds.length - 1];
        clearInterval(intervalos[ultimaMesaId]); // Detenemos el temporizador
        delete mesas[ultimaMesaId]; // Eliminamos la mesa del objeto
        const mesaDiv = document.getElementById(ultimaMesaId);
        mesaDiv.remove(); // Eliminamos el div de la interfaz
    }
}

// Asignamos los eventos a los botones
document.getElementById('agregarMesaBtn').addEventListener('click', agregarMesa);
document.getElementById('eliminarMesaBtn').addEventListener('click', eliminarMesa);
