const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const dbPath = path.join(__dirname, '../data/db.json');

function readDB() { return JSON.parse(fs.readFileSync(dbPath)); }
function writeDB(data) { fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); }

// Listar productos
router.get('/', (req,res) => {
  const db = readDB();
  res.json(db.productos);
});

// Crear producto
router.post('/', (req,res) => {
  const db = readDB();
  const { nombre, precio } = req.body;
  const nuevo = { id: Date.now(), nombre, precio };
  db.productos.push(nuevo);
  writeDB(db);
  res.status(201).json(nuevo);
});

module.exports = router;