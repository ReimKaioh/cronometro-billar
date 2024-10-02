const mesasContainer = document.getElementById('mesas-container');

let mesas = {};

// Función para agregar una nueva mesa
document.getElementById('agregar-mesa').addEventListener('click', () => {
    const mesaId = `mesa${Object.keys(mesas).length + 1}`;
    mesas[mesaId] = { tiempo: 0 };
    actualizarMesas();
});

// Función para eliminar la última mesa
document.getElementById('eliminar-mesa').addEventListener('click', () => {
    const keys = Object.keys(mesas);
    if (keys.length > 0) {
        delete mesas[keys[keys.length - 1]];
        actualizarMesas();
    }
});

// Función para actualizar la interfaz de las mesas
function actualizarMesas() {
    mesasContainer.innerHTML = '';
    for (let mesa in mesas) {
        mesasContainer.innerHTML += `
            <div class="mesa">
                <h2>${mesa}</h2>
                <p>Tiempo: 00:00:00</p>
                <button onclick="iniciarMesa('${mesa}')">Iniciar</button>
                <button onclick="pausarMesa('${mesa}')">Pausar</button>
                <button onclick="resetearMesa('${mesa}')">Resetear</button>
            </div>
        `;
    }
}

// Funciones para manejar el cronómetro (iniciar, pausar, resetear)
function iniciarMesa(mesa) {
    // Aquí iría la lógica para iniciar el cronómetro
}

function pausarMesa(mesa) {
    // Aquí iría la lógica para pausar el cronómetro
}

function resetearMesa(mesa) {
    // Aquí iría la lógica para resetear el cronómetro
}
