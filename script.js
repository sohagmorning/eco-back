// Lightweight demo app script used by multiple demo pages
// List of available product images (from assets/products)
const productImages = [
  '1.avif','2.avif','3.avif','download (1).jpg','download.jpg','file-1715714113747-b8b0561c490eimage.avif','images.jpg','pexels-kumar-koirala-81844054-15274101.jpg','pexels-sales-trust-162265874-10825676.jpg','pexels-vika-glitter-392079-33653166.jpg','photo-1526170375885-4d8ecf77b99f.avif','photo-1602143407151-7111542de6e8.avif','premium_photo-1664392147011-2a720f214e01.avif','premium_photo-1675896084254-dcb626387e1e.avif'
];

const sampleProducts = [
  {id:1,name:'Ebook: Sustainable Living',price:350,desc:'Guide to eco living',cat:'ebooks',img:'assets/products/download.jpg'},
  {id:2,name:'Website Template: Green Shop',price:799,desc:'HTML/CSS template',cat:'templates',img:'assets/products/images.jpg'},
  {id:3,name:'UI Kit Pack',price:499,desc:'Icons & components',cat:'templates',img:'assets/products/1.avif'},
  {id:4,name:'Course: Composting',price:120,desc:'Video course',cat:'ebooks',img:'assets/products/2.avif'},
  {id:5,name:'Photos Pack',price:250,desc:'Stock photos',cat:'templates',img:'assets/products/3.avif'},
  {id:6,name:'Plugin: Analytics',price:1299,desc:'Downloadable plugin',cat:'templates',img:'assets/products/download (1).jpg'},
  {id:7,name:'Bundle: Social Media Kit',price:399,desc:'Templates & banners',cat:'templates',img:'assets/products/file-1715714113747-b8b0561c490eimage.avif'},
  {id:8,name:'Preset Pack',price:199,desc:'Photo presets',cat:'templates',img:'assets/products/pexels-kumar-koirala-81844054-15274101.jpg'},
  {id:9,name:'Icon Set',price:129,desc:'SVG icons',cat:'templates',img:'assets/products/pexels-sales-trust-162265874-10825676.jpg'},
  {id:10,name:'Theme: Minimal Blog',price:699,desc:'Blog theme',cat:'templates',img:'assets/products/pexels-vika-glitter-392079-33653166.jpg'},
  {id:11,name:'Checklist: Launch Plan',price:89,desc:'Printable checklist',cat:'ebooks',img:'assets/products/photo-1526170375885-4d8ecf77b99f.avif'},
  {id:12,name:'Graphics Pack',price:299,desc:'Illustrations & mockups',cat:'templates',img:'assets/products/premium_photo-1664392147011-2a720f214e01.avif'}
];

let cart = JSON.parse(localStorage.getItem('demo_cart')||'{}');

function saveCart(){ localStorage.setItem('demo_cart', JSON.stringify(cart)); }

function formatPrice(n){ return '৳ '+n.toFixed(2); }

// Featured injection on index.html
const API_BASE = '/backend/api/products.php';

async function fetchProductsAPI(params = {}){
  // build URL relative to site
  try{
    const url = new URL(API_BASE, location.origin);
    Object.keys(params).forEach(k=>{ if(params[k]!=null) url.searchParams.set(k, params[k]); });
    const res = await fetch(url.href);
    if(!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    if(!Array.isArray(data)) return Array.isArray(data.items)?data.items:[];
    return data;
  }catch(err){
    console.warn('Product API fetch failed, using local sampleProducts', err);
    return sampleProducts;
  }
}

// Featured injection on index.html (fetches first 4 from API, fallback to sampleProducts)
async function renderFeatured(){
  const el = document.getElementById('featured'); if(!el) return;
  el.innerHTML = '';
  const items = await fetchProductsAPI();
  items.slice(0,4).forEach(p=>{
    const col = document.createElement('div'); col.className='col-md-3 mb-3';
    col.innerHTML = `
      <div class="card-e featured-card h-100">
        <div class="product-thumb featured-thumb"><img src="${p.img}" alt="${p.name}"></div>
        <div class="featured-details">
          <h5 class="mb-1">${p.name}</h5>
          <p class="text-muted small mb-2">${p.desc}</p>
          <div class="d-flex justify-content-between align-items-center gap-2">
            <div class="fw-bold text-primary">${formatPrice(p.price)}</div>
            <a href="product.html?id=${p.id}" class="btn btn-sm btn-outline-primary">View</a>
          </div>
        </div>
      </div>`;
    el.appendChild(col);
  });
}

// Product grid rendering for products.html
async function renderProductGrid(params = {}){
  const grid = document.getElementById('productGrid'); if(!grid) return;
  grid.innerHTML = '';
  const items = await fetchProductsAPI(params);
  items.forEach(p=>{
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
    const q=search.value.trim(); const cat = filter.value;
    // query backend API for filtered results (graceful fallback to local data inside fetchProductsAPI)
    renderProductGrid({ q:q||undefined, cat: (cat==='all' ? undefined : cat) });
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
  // try API first
  (async ()=>{
    try{
      const res = await fetch(API_BASE + '?id=' + encodeURIComponent(id));
      if(!res.ok) throw new Error('Not found');
      const p = await res.json();
      if(!p) throw new Error('No product');
      const title = document.getElementById('productTitle'); if(title) title.textContent = p.name;
      const desc = document.getElementById('productDesc'); if(desc) desc.textContent = p.desc;
      const price = document.getElementById('productPrice'); if(price) price.textContent = formatPrice(p.price);
      const add = document.getElementById('addToCart'); if(add) add.addEventListener('click', ()=>{ addToCart(p.id); alert('Added to cart') });
      const imgWrap = document.getElementById('productImage');
      if(imgWrap){
        imgWrap.innerHTML = `<div class="product-main"><img src="${p.img}" alt="${p.name}" class="img-fluid" id="mainProductImg" /></div><div class="product-thumbs d-flex gap-2 mt-3" id="productThumbs"></div>`;
        const thumbs = document.getElementById('productThumbs');
        productImages.slice(0,8).forEach(fn=>{
          const path = 'assets/products/'+fn;
          const t = document.createElement('div'); t.className='thumb-item';
          t.innerHTML = `<img src="${path}" alt="thumb" class="img-thumbnail" style="width:72px;height:72px;object-fit:cover;border-radius:8px;cursor:pointer" />`;
          t.addEventListener('click', ()=>{ const main = document.getElementById('mainProductImg'); if(main) main.src = path; });
          thumbs.appendChild(t);
        });
      }
    }catch(err){
      // fallback to local data
      const p = sampleProducts.find(x=>x.id==id); if(!p) return;
      const title = document.getElementById('productTitle'); if(title) title.textContent = p.name;
      const desc = document.getElementById('productDesc'); if(desc) desc.textContent = p.desc;
      const price = document.getElementById('productPrice'); if(price) price.textContent = formatPrice(p.price);
      const add = document.getElementById('addToCart'); if(add) add.addEventListener('click', ()=>{ addToCart(p.id); alert('Added to cart') });
      const imgWrap = document.getElementById('productImage');
      if(imgWrap){
        imgWrap.innerHTML = `<div class="product-main"><img src="${p.img}" alt="${p.name}" class="img-fluid" id="mainProductImg" /></div><div class="product-thumbs d-flex gap-2 mt-3" id="productThumbs"></div>`;
        const thumbs = document.getElementById('productThumbs');
        productImages.slice(0,8).forEach(fn=>{
          const path = 'assets/products/'+fn;
          const t = document.createElement('div'); t.className='thumb-item';
          t.innerHTML = `<img src="${path}" alt="thumb" class="img-thumbnail" style="width:72px;height:72px;object-fit:cover;border-radius:8px;cursor:pointer" />`;
          t.addEventListener('click', ()=>{ const main = document.getElementById('mainProductImg'); if(main) main.src = path; });
          thumbs.appendChild(t);
        });
      }
    }
  })();
}

// Dark mode toggle (persisted)
function setupDarkMode(){
  const saved = localStorage.getItem('demo_theme'); if(saved==='dark') document.body.classList.add('dark');
}

// Auth API base
const AUTH_API = '/backend/api/auth.php';

// Attach login/signup handlers
function setupAuthForms(){
  const login = document.getElementById('loginForm');
  const signup = document.getElementById('signupForm');
  if(login){ login.addEventListener('submit', async (e)=>{
    e.preventDefault(); const email = login.querySelector('input[type="email"]').value; const pass = login.querySelector('input[type="password"]').value;
    const res = await fetch(AUTH_API, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'login', email, password:pass}) });
    const data = await res.json(); if(res.ok && data.success){ location.href='profile.html'; } else { alert(data.error || 'Login failed'); }
  }); }
  if(signup){ signup.addEventListener('submit', async (e)=>{
    e.preventDefault(); const name = signup.querySelector('input[placeholder="Name"]').value || signup.querySelector('input').value; const email = signup.querySelector('input[type="email"]').value; const pass = signup.querySelector('input[type="password"]').value;
    const res = await fetch(AUTH_API, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'signup', name, email, password:pass}) });
    const data = await res.json(); if(res.ok && data.success){ location.href='profile.html'; } else { alert(data.error || 'Signup failed'); }
  }); }
}

// Init on load
document.addEventListener('DOMContentLoaded', ()=>{
  // If URL has ?all=1 then clear filters/search and show all products
  const params = new URLSearchParams(location.search);
  if(params.get('all')==='1'){
    const s = document.getElementById('searchInput'); if(s) s.value='';
    const f = document.getElementById('filterCategory'); if(f) f.value='all';
  }
  renderProductGrid(); setupProductsActions(); renderCartList(); loadProductDetail(); setupDarkMode();
});

