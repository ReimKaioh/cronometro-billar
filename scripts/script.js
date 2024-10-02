const mesasContainer = document.getElementById('mesas-container');

let mesas = {};

// Almacenar información de las mesas
let mesas = [];
let intervalo;

// Función para formatear el tiempo de segundos a hh:mm:ss
const formatearTiempo = (segundosTotales) => {
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
};

// Función para crear la interfaz de una mesa
const crearMesaHTML = (id) => {
    return `
        <div class="mesa" id="mesa-${id}">
            <h2>Mesa ${id}</h2>
            <p>Tiempo: <span id="tiempo-${id}">00:00:00</span></p>
            <button onclick="iniciarMesa(${id})">Iniciar</button>
            <button onclick="pausarMesa(${id})">Pausar</button>
            <button onclick="resetearMesa(${id})">Resetear</button>
        </div>
    `;
};

// Actualizar el tiempo en la interfaz
const actualizarTiempos = () => {
    mesas.forEach(mesa => {
        if (mesa.enUso) {
            mesa.tiempo++;
            document.getElementById(`tiempo-${mesa.id}`).textContent = formatearTiempo(mesa.tiempo);
        }
    });
};

// Función para iniciar el temporizador de una mesa
const iniciarMesa = (id) => {
    const mesa = mesas.find(m => m.id === id);
    if (mesa) {
        mesa.enUso = true;
    }
};

// Función para pausar el temporizador de una mesa
const pausarMesa = (id) => {
    const mesa = mesas.find(m => m.id === id);
    if (mesa) {
        mesa.enUso = false;
    }
};

// Función para resetear el temporizador de una mesa
const resetearMesa = (id) => {
    const mesa = mesas.find(m => m.id === id);
    if (mesa) {
        mesa.tiempo = 0;
        mesa.enUso = false;
        document.getElementById(`tiempo-${id}`).textContent = "00:00:00";
    }
};

// Función para agregar una mesa
const agregarMesa = () => {
    const nuevaMesaId = mesas.length + 1;
    mesas.push({ id: nuevaMesaId, tiempo: 0, enUso: false });
    document.getElementById('mesas-container').innerHTML += crearMesaHTML(nuevaMesaId);
};

// Función para eliminar la última mesa
const eliminarMesa = () => {
    if (mesas.length > 0) {
        mesas.pop();
        document.getElementById('mesas-container').lastElementChild.remove();
    }
};

// Manejo de los botones de agregar y eliminar mesas
document.getElementById('agregar-mesa').addEventListener('click', agregarMesa);
document.getElementById('eliminar-mesa').addEventListener('click', eliminarMesa);

// Iniciar el intervalo para actualizar el tiempo cada segundo
intervalo = setInterval(actualizarTiempos, 1000);

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


