FROM php:8.5-apache

RUN a2enmod rewrite

# Change port
RUN sed -i 's/80/8080/' /etc/apache2/ports.conf && \
  sed -i 's/80/8080/' /etc/apache2/sites-enabled/000-default.conf

COPY ./src /var/www/html

RUN mkdir -p /var/www/html/data \
  && chown -R www-data:www-data /var/www/html/data
