// Lightweight demo app script used by multiple demo pages
const sampleProducts = [
  {id:1,name:'Ebook: Sustainable Living',price:350,desc:'Guide to eco living',cat:'ebooks',img:'assets/products/product-01.svg'},
  {id:2,name:'Website Template: Green Shop',price:799,desc:'HTML/CSS template',cat:'templates',img:'assets/products/product-02.svg'},
  {id:3,name:'UI Kit Pack',price:499,desc:'Icons & components',cat:'templates',img:'assets/products/product-03.svg'},
  {id:4,name:'Course: Composting',price:120,desc:'Video course',cat:'ebooks',img:'assets/products/product-04.svg'},
  {id:5,name:'Photos Pack',price:250,desc:'Stock photos',cat:'templates',img:'assets/products/product-05.svg'},
  {id:6,name:'Plugin: Analytics',price:1299,desc:'Downloadable plugin',cat:'templates',img:'assets/products/product-06.svg'},
  {id:7,name:'Bundle: Social Media Kit',price:399,desc:'Templates & banners',cat:'templates',img:'assets/products/product-07.svg'},
  {id:8,name:'Preset Pack',price:199,desc:'Photo presets',cat:'templates',img:'assets/products/product-08.svg'},
  {id:9,name:'Icon Set',price:129,desc:'SVG icons',cat:'templates',img:'assets/products/product-09.svg'},
  {id:10,name:'Theme: Minimal Blog',price:699,desc:'Blog theme',cat:'templates',img:'assets/products/product-10.svg'},
  {id:11,name:'Checklist: Launch Plan',price:89,desc:'Printable checklist',cat:'ebooks',img:'assets/products/product-11.svg'},
  {id:12,name:'Graphics Pack',price:299,desc:'Illustrations & mockups',cat:'templates',img:'assets/products/product-12.svg'}
];

let cart = JSON.parse(localStorage.getItem('demo_cart')||'{}');

function saveCart(){ localStorage.setItem('demo_cart', JSON.stringify(cart)); }

function formatPrice(n){ return '৳ '+n.toFixed(2); }

// Featured injection on index.html
function renderFeatured(){
  const el = document.getElementById('featured'); if(!el) return;
  el.innerHTML = '';
    sampleProducts.slice(0,4).forEach(p=>{
    const col = document.createElement('div'); col.className='col-md-3 mb-3';
    col.innerHTML = `<div class="card-e p-3 h-100"><div class="product-thumb"><img src="${p.img}" alt="${p.name}"></div><h5 class="mt-3">${p.name}</h5><div class="text-primary fw-bold">${formatPrice(p.price)}</div><a href="product.html?id=${p.id}" class="btn btn-sm btn-outline-primary mt-2">View</a></div>`;
    el.appendChild(col);
  });
}

// Product grid rendering for products.html
function renderProductGrid(){
  const grid = document.getElementById('productGrid'); if(!grid) return;
  grid.innerHTML = '';
    sampleProducts.forEach(p=>{
    const col = document.createElement('div'); col.className='col-lg-4 col-md-6 mb-4';
    col.innerHTML = `<div class="card-e p-3 h-100"><div class="product-thumb"><img src="${p.img}" alt="${p.name}"></div><h5 class="mt-3">${p.name}</h5><p class="text-muted small">${p.desc}</p><div class="d-flex justify-content-between align-items-center"><div class="fw-bold text-primary">${formatPrice(p.price)}</div><div><button class="btn btn-sm btn-primary" data-id="${p.id}">Add</button> <a class="btn btn-sm btn-outline-secondary" href="product.html?id=${p.id}">Details</a></div></div></div>`;
    grid.appendChild(col);
  });
}

// Simple search/filter for products.html
function setupProductsActions(){
  const search = document.getElementById('searchInput');
  const filter = document.getElementById('filterCategory');
  if(search){ search.addEventListener('input', ()=>{
    const q=search.value.toLowerCase(); const cat = filter.value;
    const filtered = sampleProducts.filter(p=> (cat==='all'||p.cat===cat) && (p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)) );
    const grid = document.getElementById('productGrid'); grid.innerHTML=''; filtered.forEach(p=>{
      const col = document.createElement('div'); col.className='col-lg-4 col-md-6 mb-4';
      col.innerHTML = `<div class="card-e p-3 h-100"><div class="product-thumb"><img src="${p.img}" alt="${p.name}"></div><h5 class="mt-3">${p.name}</h5><p class="text-muted small">${p.desc}</p><div class="d-flex justify-content-between align-items-center"><div class="fw-bold text-primary">${formatPrice(p.price)}</div><div><button class="btn btn-sm btn-primary" data-id="${p.id}">Add</button> <a class="btn btn-sm btn-outline-secondary" href="product.html?id=${p.id}">Details</a></div></div></div>`;
      grid.appendChild(col);
    });
  });
  if(filter){ filter.addEventListener('change', ()=>{ search.dispatchEvent(new Event('input')) }); }
}

// Cart helpers
function addToCart(id){ const p = sampleProducts.find(x=>x.id==id); if(!p) return; if(!cart[id]) cart[id]={...p,qty:0}; cart[id].qty++; saveCart(); renderCartList(); }
function removeFromCart(id){ if(!cart[id]) return; cart[id].qty--; if(cart[id].qty<=0) delete cart[id]; saveCart(); renderCartList(); }

function renderCartList(){
  const el = document.getElementById('cartList'); if(!el) return;
  el.innerHTML=''; let total=0;
  Object.values(cart).forEach(it=>{ total += it.price*it.qty; const row = document.createElement('div'); row.className='d-flex justify-content-between align-items-center p-2 border-bottom'; row.innerHTML = `<div><strong>${it.name}</strong><div class="text-muted small">${formatPrice(it.price)} × ${it.qty}</div></div><div><button class="btn btn-sm btn-outline-secondary me-1" data-dec="${it.id}">-</button><button class="btn btn-sm btn-outline-secondary" data-inc="${it.id}">+</button></div>`; el.appendChild(row); });
  const tot = document.createElement('div'); tot.className='text-end mt-3'; tot.innerHTML = `<h5>Total: ${formatPrice(total)}</h5>`; el.appendChild(tot);
}

document.addEventListener('click', e=>{
  if(e.target.matches('[data-id]')){ addToCart(e.target.dataset.id); }
  if(e.target.matches('[data-inc]')){ addToCart(e.target.getAttribute('data-inc')); }
  if(e.target.matches('[data-dec]')){ removeFromCart(e.target.getAttribute('data-dec')); }
});

// Product details page loader
function loadProductDetail(){
  const qs = new URLSearchParams(location.search); const id = qs.get('id'); if(!id) return;
  const p = sampleProducts.find(x=>x.id==id); if(!p) return;
  const title = document.getElementById('productTitle'); if(title) title.textContent = p.name;
  const desc = document.getElementById('productDesc'); if(desc) desc.textContent = p.desc;
  const price = document.getElementById('productPrice'); if(price) price.textContent = formatPrice(p.price);
  const add = document.getElementById('addToCart'); if(add) add.addEventListener('click', ()=>{ addToCart(p.id); alert('Added to cart') });
  const imgWrap = document.getElementById('productImage'); if(imgWrap) imgWrap.innerHTML = `<img src="${p.img}" alt="${p.name}" class="img-fluid" />`;
}

// Dark mode toggle (persisted)
function setupDarkMode(){
  const saved = localStorage.getItem('demo_theme'); if(saved==='dark') document.body.classList.add('dark');
}

// Init on load
document.addEventListener('DOMContentLoaded', ()=>{
  renderFeatured(); renderProductGrid(); setupProductsActions(); renderCartList(); loadProductDetail(); setupDarkMode();
});

