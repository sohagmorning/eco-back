# Eco Shop — নমুনা ফ্রন্টএন্ড (MDB Demo)

Demo frontend pages using MDB UI Kit and responsive layout for digital products.
এই ছোট প্রোজেক্টটি একটি সিঙ্গেল-পেজ নমুনা ই‑কমার্স ফ্রন্টএন্ড দেখায়।

ফাইলগুলো:
- [index.html](index.html) — পেজ
- [styles.css](styles.css) — স্টাইল
- [script.js](script.js) — ইন্টারঅ্যাকশন


Run locally:

1) Easiest: open `index.html` in your browser by double-clicking the file.

2) Recommended: run a simple HTTP server from the project folder:

```bash
cd "e:\d_drive\Desktop\eco back"
# If Python is available:
python -m http.server 8000
# If Node/npm is available:
npx http-server . -p 8000
```

Then open `http://localhost:8000`.

Pages included:
- `index.html` — landing (hero, featured, FAQ)
- `products.html` — listing with search & filters
- `product.html` — product detail (query param `?id=`)
- `cart.html` — cart preview & actions
- `checkout.html` — demo checkout form
- `login.html`, `signup.html`, `profile.html` — auth pages (demo)

Notes:
- This is a frontend demo only (no backend). Cart and theme persist to `localStorage`.
- Use this as a scaffold to wire PHP/MySQL backend later.
