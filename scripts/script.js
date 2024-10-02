// script.js
let mesas = {};  // Almacenamos las mesas
let intervalos = {};  // Para guardar los intervalos de los temporizadores

// Formatear tiempo (hh:mm:ss)
function formatearTiempo(segundosTotales) {
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Crear una mesa en la interfaz
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

// Actualizar el tiempo mostrado
function actualizarTiempo(idMesa) {
    document.getElementById(`${idMesa}-tiempo`).textContent = formatearTiempo(mesas[idMesa].tiempo);
}

// Iniciar el temporizador
function iniciarTemporizador(idMesa) {
    if (!mesas[idMesa].enUso) {
        mesas[idMesa].enUso = true;
        intervalos[idMesa] = setInterval(() => {
            mesas[idMesa].tiempo++;
            actualizarTiempo(idMesa);
        }, 1000);
    }
}

// Pausar el temporizador
function pausarTemporizador(idMesa) {
    clearInterval(intervalos[idMesa]);
    mesas[idMesa].enUso = false;
}

// Resetear el temporizador
function resetearTemporizador(idMesa) {
    clearInterval(intervalos[idMesa]);
    mesas[idMesa].tiempo = 0;
    mesas[idMesa].enUso = false;
    actualizarTiempo(idMesa);
}

// Agregar una nueva mesa
function agregarMesa() {
    const nuevaMesaId = `mesa${Object.keys(mesas).length + 1}`;
    mesas[nuevaMesaId] = { tiempo: 0, enUso: false };
    crearMesa(nuevaMesaId);
}

// Eliminar la última mesa
function eliminarMesa() {
    const mesasIds = Object.keys(mesas);
    if (mesasIds.length > 0) {
        const ultimaMesaId = mesasIds[mesasIds.length - 1];
        clearInterval(intervalos[ultimaMesaId]);
        delete mesas[ultimaMesaId];
        document.getElementById(ultimaMesaId).remove();
    }
}

// Eventos para los botones de agregar y eliminar mesa
document.getElementById('agregarMesaBtn').addEventListener('click', agregarMesa);
document.getElementById('eliminarMesaBtn').addEventListener('click', eliminarMesa);
