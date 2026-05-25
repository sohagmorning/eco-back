SupMart backend API (demo)
==========================

This folder contains a minimal PHP + PDO API scaffold for the demo site.

Quick setup
-----------

1. Create the database and sample data (requires MySQL/MariaDB):

   mysql -u root -p < backend/schema.sql

2. Adjust DB credentials in `backend/config.php` or set environment variables `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`.

3. Start a PHP dev server for quick local testing from the project root:

```bash
php -S localhost:8000 -t .
```

Then browse the API at:

- `http://localhost:8000/backend/api/products.php` (list products)
- `http://localhost:8000/backend/api/products.php?id=1` (single product)

Notes
-----
- The API sets `Access-Control-Allow-Origin: *` for simplicity — tighten this in production.
- GitHub Pages cannot host PHP — deploy this backend to a server (e.g., Render, DigitalOcean App, Heroku with PHP buildpack, or an Apache/nginx host).
