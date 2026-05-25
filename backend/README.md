# Backend scaffold (PHP + MySQL)

This folder contains a minimal PHP backend scaffold with simple API endpoints and a migration SQL file to create necessary tables in MySQL.

Steps to use:

1. Edit database settings in `backend/src/config.php` to match your MySQL credentials.
2. Import the schema into MySQL:

```bash
mysql -u root -p < backend/migrations/schema.sql
```

3. Run PHP built-in server for development (from project root):

```bash
cd "e:\\d_drive\\Desktop\\eco back"
php -S localhost:8080 -t backend/public
```

API endpoints:
- `GET /api/products.php` — returns products JSON (from DB if available, otherwise sample)
- `POST /api/auth.php?action=signup` — signup with JSON {name,email,password}
- `POST /api/auth.php?action=login` — login with JSON {email,password}

This is a scaffold to wire into the existing frontend. Expand models/controllers as needed.
