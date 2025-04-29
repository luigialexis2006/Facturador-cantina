const API = 'http://localhost:5000/api';

async function fetchMesas() {
  return fetch(API + '/mesas').then(r=>r.json());
}
async function fetchProductos() {
  return fetch(API + '/productos').then(r=>r.json());
}

async function render() {
  const mesas = await fetchMesas();
  const prod = await fetchProductos();

  // Render mesas
  const kanban = document.getElementById('mesas-kanban');
  kanban.innerHTML = '';
  mesas.forEach(m => {
    const div = document.createElement('div'); div.className='mesa';
    div.innerHTML = `<header>Mesa ${m.id}</header><div>Total: ${calcTotal(m, prod)}</div><button onclick="borrarMesa(${m.id})">X</button>`;
    kanban.appendChild(div);
  });

  // Render productos
  const list = document.getElementById('productos-list');
  list.innerHTML='';
  prod.forEach(p=>{
    const d = document.createElement('div'); d.className='producto';
    d.innerHTML = `<span>${p.nombre} ($${p.precio})</span><button onclick='addToMesa(${p.id})'>+</button>`;
    list.appendChild(d);
  });
}

function calcTotal(mesa, productos) {
  return mesa.productos.reduce((sum,item)=>{
    const p = productos.find(x=>x.id===item.productoId);
    return sum + p.precio * item.cantidad;
  },0);
}

window.borrarMesa = async id => { await fetch(API + '/mesas/'+id,{ method:'DELETE' }); render(); };
window.addToMesa = async pid => {
  const mids = (await fetchMesas())[0].id; // ejemplo: primera mesa
  await fetch(API + `/mesas/${mids}/productos`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ productoId:pid, cantidad:1 }) });
  render();
};

document.getElementById('btn-add-prod').onclick = async () => {
  const nombre = document.getElementById('prod-nombre').value;
  const precio = parseFloat(document.getElementById('prod-precio').value);
  await fetch(API + '/productos',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ nombre, precio }) });
  render();
};

// Inicializar
render();