-- Simple schema for SupMart demo
CREATE DATABASE IF NOT EXISTS `supmart` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `supmart`;

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `descr` TEXT NULL,
  `category` VARCHAR(80) DEFAULT 'templates',
  `img` VARCHAR(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (use filenames from assets/products/)
INSERT INTO products (name,price,descr,category,img) VALUES
('Ebook: Sustainable Living',350,'Guide to eco living','ebooks','assets/products/download.jpg'),
('Website Template: Green Shop',799,'HTML/CSS template','templates','assets/products/images.jpg'),
('UI Kit Pack',499,'Icons & components','templates','assets/products/1.avif'),
('Course: Composting',120,'Video course','ebooks','assets/products/2.avif'),
('Photos Pack',250,'Stock photos','templates','assets/products/3.avif'),
('Plugin: Analytics',1299,'Downloadable plugin','templates','assets/products/download (1).jpg'),
('Bundle: Social Media Kit',399,'Templates & banners','templates','assets/products/file-1715714113747-b8b0561c490eimage.avif'),
('Preset Pack',199,'Photo presets','templates','assets/products/pexels-kumar-koirala-81844054-15274101.jpg'),
('Icon Set',129,'SVG icons','templates','assets/products/pexels-sales-trust-162265874-10825676.jpg'),
('Theme: Minimal Blog',699,'Blog theme','templates','assets/products/pexels-vika-glitter-392079-33653166.jpg'),
('Checklist: Launch Plan',89,'Printable checklist','ebooks','assets/products/photo-1526170375885-4d8ecf77b99f.avif'),
('Graphics Pack',299,'Illustrations & mockups','templates','assets/products/premium_photo-1664392147011-2a720f214e01.avif');

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'customer',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
