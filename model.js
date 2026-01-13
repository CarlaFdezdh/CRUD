const mongoose = require("mongoose");
const fs=require("fs");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/diario");

// Esquema

const EntradaSchema = new mongoose.Schema({
  lugar: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  notas: {
    type: String,
    required: true
  },
  valoracion: {
    type: Number,
    required: true
  },
  foto: {
    type: String
  }
});

let Entrada = mongoose.model("entrada", EntradaSchema);
module.exports = { Entrada };


//inserta entradas de prueba de json

/*let datos=JSON.parse(fs.readFileSync("./diario.json"));
datos.forEach(dato=>{
    let nuevaEntrada=new Entrada(dato);
    nuevaEntrada.lugar=dato.lugar;
    nuevaEntrada.fecha=new Date(dato.fecha);
    nuevaEntrada.notas=dato.notas;
    nuevaEntrada.valoracion=dato.valoracion;
    nuevaEntrada.foto=dato.foto;
    nuevaEntrada.save().then(res=>{
        console.log("Entrada guardada:",res);
    }).catch(err=>{
        console.log("Error al guardar la entrada:",err);
    });
});*/

