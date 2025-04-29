const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const dbPath = path.join(__dirname, '../data/db.json');

function readDB() {
    return JSON.parse(fs.readFileSync(dbPath));
}
function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Listar mesas\ router.get('/', (req,res) => {
    const db = readDB();
    res.json(db.mesas);

  
  // Crear mesa
  router.post('/', (req,res) => {
    const db = readDB();
    const nueva = { id: Date.now(), productos: [] };
    db.mesas.push(nueva);
    writeDB(db);
    res.status(201).json(nueva);
  });
  
  // Borrar mesa
  router.delete('/:id', (req,res) => {
    const db = readDB();
    db.mesas = db.mesas.filter(m=>m.id != req.params.id);
    writeDB(db);
    res.status(204).end();
  });
  
  // Agregar producto a mesa
  router.post('/:id/productos', (req,res) => {
    const { productoId, cantidad } = req.body;
    const db = readDB();
    const mesa = db.mesas.find(m=>m.id == req.params.id);
    mesa.productos.push({ productoId, cantidad });
    writeDB(db);
    res.status(200).json(mesa);
  });
  
  module.exports = router;