import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

let productos = [
  { id: 1, nombre: "Martillo", precio: 5000 },
  { id: 2, nombre: "Taladro", precio: 15000 }
];

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
  const nuevo = { id: productos.length + 1, ...req.body };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

app.get('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id == req.params.id);
  producto ? res.json(producto) : res.status(404).json({ error: "No encontrado" });
});

app.put('/productos/:id', (req, res) => {
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    productos[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: "No encontrado" });
  }
});

app.delete('/productos/:id', (req, res) => {
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    productos.splice(index, 1);
    res.json({ mensaje: "Eliminado correctamente" });
  } else {
    res.status(404).json({ error: "No encontrado" });
  }
});

app.listen(port, () => {
  console.log(`API de productos corriendo en http://localhost:${port}`);
});
