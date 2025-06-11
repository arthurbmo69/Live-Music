FROM php:8.1-apache

# Copia os arquivos do seu projeto para o container
COPY . /var/www/html/

# Ativa o mod_rewrite do Apache (necessário para muitas apps PHP)
RUN a2enmod rewrite

# Permite que arquivos .htaccess funcionem
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf
