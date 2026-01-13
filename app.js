const { Entrada } = require("./model.js");

// Elementos del DOM
let botonTodos = document.getElementById("todos");
let lugarInput = document.getElementById("lugarInput");
let botonBuscar = document.getElementById("searchBtn");
let botonInsertar = document.getElementById("newEntryBtn");
let wrapper = document.getElementById("wrapper");
let searchDrawer = document.getElementById("searchDrawer");
let newEntryDrawer = document.getElementById("newEntryDrawer");
let closeSearchBtn = document.getElementById("closeSearch");
let closeNewEntryBtn = document.getElementById("closeNewEntry");
// overlay defined above


// Función para mostrar entradas en el wrapper
let mostrarEntradas = (entradas) => {
    wrapper.innerHTML = "";

    if (entradas.length === 0) {
        wrapper.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">
                    <p style="font-size: 1.2em;">No se encontraron entradas</p>
                </div>
            `;
        return;
    }

    entradas.forEach(entrada => {
        let div = document.createElement("div");
        div.className = "entry-card";

        // Crear estrellas para la valoración
        let estrellas = '★'.repeat(entrada.valoracion) + '☆'.repeat(5 - entrada.valoracion);

        div.innerHTML = `
                ${entrada.foto ? `<img src="public/${entrada.foto}" alt="Foto de ${entrada.lugar}" />` : '<div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3em;">📷</div>'}
                <div class="entry-card-content">
                    <h3>${entrada.lugar}</h3>
                    <p><strong>📅 Fecha:</strong> ${new Date(entrada.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</p>
                    <p><strong>📝 Notas:</strong> ${entrada.notas}</p>
                    <p class="rating"><strong>⭐ Valoración:</strong> ${estrellas} (${entrada.valoracion}/5)</p>
                </div>
            `;
        wrapper.appendChild(div);
    });
};

// Botón para mostrar todas las entradas
botonTodos.addEventListener("click", () => {

    Entrada.find().then(entradas => {
        mostrarEntradas(entradas);
    }).catch(err => {
        console.error("Error al obtener las entradas:", err);

    });


});

// Escapa caracteres especiales y busca por substring (lugar o notas)
const escapeRegex = (s) => (s || '').toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let buscarEntradas = (lugar) => {
    const q = (lugar || '').toString().trim();
    if (!q) {
        return Entrada.find().then(entradas => mostrarEntradas(entradas)).catch(err => console.error('Error al obtener entradas:', err));
    }

    const regex = new RegExp(escapeRegex(q), 'i');
    Entrada.find({ $or: [{ lugar: regex }, { notas: regex }] })
        .then(entradas => mostrarEntradas(entradas))
        .catch(err => console.error('Error al buscar entradas:', err));
};

// Botón de búsqueda
botonBuscar.addEventListener("click", () => {
    searchDrawer.style.display = 'flex';
    // allow CSS to animate from hidden -> visible
    setTimeout(() => searchDrawer.classList.add('active'), 10);
});

// Botón dentro del drawer que ejecuta la búsqueda
let drawerSearchBtn = document.getElementById('searchButton');
if (drawerSearchBtn) {
    drawerSearchBtn.addEventListener('click', () => {
        buscarEntradas(lugarInput.value);
        searchDrawer.classList.remove('active');
        setTimeout(() => { searchDrawer.style.display = 'none'; }, 220);
    });
}

// Permitir buscar con Enter en el input de búsqueda
lugarInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        buscarEntradas(lugarInput.value);
        searchDrawer.classList.remove('active');
        setTimeout(() => { searchDrawer.style.display = 'none'; }, 220);
    }
});

// Botón de insertar nueva entrada
botonInsertar.addEventListener("click", () => {
    // Solo abrir el drawer; el botón dentro del drawer añadirá la entrada
    newEntryDrawer.style.display = 'flex';
    setTimeout(() => newEntryDrawer.classList.add('active'), 10);
});

let addButton = document.getElementById('addButton');
if (addButton) {
    addButton.addEventListener('click', () => {
        insertar();
        newEntryDrawer.classList.remove('active');
        setTimeout(() => { newEntryDrawer.style.display = 'none'; }, 220);
    });
}

// Función para insertar una nueva entrada
let insertar = () => {
    // Obtener valores de los inputs
    let lugar = document.getElementById("lugarNuevoInput").value;
    let fecha = document.getElementById("fechaInput").value;
    let notas = document.getElementById("notasInput").value;
    let valoracion = document.getElementById("valoracionInput").value;
    let imagenInput = document.getElementById("imagenInput");

    // Manejo de la imagen
    let procesarImagen = () => {
        return new Promise((resolve) => {
            if (imagenInput.files && imagenInput.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(imagenInput.files[0]);
            } else {
                resolve(null);
            }
        });
    };

    // Crear y guardar la entrada
    procesarImagen().then(fotoBase64 => {
        // Descomentar cuando tengas el modelo:

        let nuevaEntrada = new Entrada({
            lugar: lugar,
            fecha: new Date(fecha),
            notas: notas,
            valoracion: parseInt(valoracion),
            foto: fotoBase64
        });

        return nuevaEntrada.save();


    }).then(res => {
        console.log("Entrada guardada:", res);

        // Limpiar formulario
        document.getElementById("lugarNuevoInput").value = "";
        document.getElementById("fechaInput").value = "";
        document.getElementById("notasInput").value = "";
        document.getElementById("valoracionInput").value = "";
        document.getElementById("imagenInput").value = "";


        return Entrada.find();

    }).then(entradas => {
        // Descomentar cuando tengas el modelo:
        mostrarEntradas(entradas);
    }).catch(err => {
        console.error("Error al guardar la entrada:", err);
    });
};

// Close handlers (single registration)
closeSearchBtn.addEventListener("click", () => {
    searchDrawer.classList.remove('active');
    setTimeout(() => { searchDrawer.style.display = 'none'; }, 220);
});

closeNewEntryBtn.addEventListener("click", () => {
    newEntryDrawer.classList.remove('active');
    setTimeout(() => { newEntryDrawer.style.display = 'none'; }, 220);
});



// Cargar todas las entradas al inicio (descomentar cuando tengas el modelo)
Entrada.find().then(entradas => {
    mostrarEntradas(entradas);
}).catch(err => {
    console.error("Error al cargar entradas iniciales:", err);
});

