# Diario de Viajes

Aplicación web fullstack para registrar, consultar, editar y eliminar entradas de un diario de viajes. Backend con Node.js, Express y MongoDB (Mongoose); frontend con HTML, CSS y JavaScript vanilla.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js + Express |
| Base de datos | MongoDB + Mongoose |
| Frontend | HTML, CSS, JavaScript |

---

## Estructura del proyecto

```
CRUD/
├── css/          # Estilos del frontend
├── public/       # Archivos estáticos
├── app.js        # Servidor Express y rutas de la API
├── model.js      # Modelo Mongoose (esquema de entradas)
├── main.js       # Lógica del frontend
├── index.html    # Interfaz principal
├── diario.json   # Datos de ejemplo
└── package.json
```

---

## Instalación

Requisitos: Node.js v18+ y MongoDB en local o Atlas.

```bash
# Clona el repositorio
git clone https://github.com/CarlaFdezdh/CRUD.git
cd CRUD

# Instala las dependencias
npm install

# Edita la URI de conexión en app.js si es necesario
# mongoose.connect('mongodb://localhost:27017/diario')

# Arranca el servidor
node app.js
```

Abre el navegador en `http://localhost:3000`.

---

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/entradas` | Obtiene todas las entradas |
| POST | `/entradas` | Crea una nueva entrada |
| PUT | `/entradas/:id` | Actualiza una entrada |
| DELETE | `/entradas/:id` | Elimina una entrada |

---

## Modelo de datos

```js
{
  destino: String,
  fecha:   Date,
  notas:   String,
}
```

---

## Autora

Carla Fernández de Haro — [GitHub](https://github.com/CarlaFdezdh) · [LinkedIn](https://www.linkedin.com/in/carla-fern%C3%A1ndez-de-haro-14a232276/) · carlafdezdh@gmail.com
