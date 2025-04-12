-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

CREATE SCHEMA IF NOT EXISTS docs;

-- Create documents table with OpenAI-compatible 1536-dim vector column
CREATE TABLE IF NOT EXISTS docs.documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(1536)
);

-- Insert test data (embedding is NULL for now — just content)
INSERT INTO docs.documents (content) VALUES 
('To install Apache on Ubuntu, run: sudo apt update && sudo apt install apache2'),
('After installation, start Apache with: sudo systemctl start apache2'),
('Enable Apache to start on boot: sudo systemctl enable apache2'),
('Your default web root is /var/www/html — place your index.html there'),
('Check if Apache is running: sudo systemctl status apache2'),
('Use sudo ufw allow Apache to allow HTTP traffic through the firewall'),
('Edit Apache configs at /etc/apache2/apache2.conf or sites-available/000-default.conf'),
('Restart Apache after config changes: sudo systemctl restart apache2'),
('Access your site locally via http://localhost or http://127.0.0.1'),
('Log files are stored in /var/log/apache2/access.log and error.log'),
('To serve a custom page, replace index.html in /var/www/html'),
('You can create virtual hosts to serve multiple domains from one server'),
('Test Apache config syntax with: sudo apachectl configtest'),
('Use sudo a2ensite your-site.conf to enable a virtual host'),
('Disable a site with: sudo a2dissite your-site.conf && sudo systemctl reload apache2');