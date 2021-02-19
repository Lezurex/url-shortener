# url-shortener
Simple URL shortener for Apache Webservers

Did you ever want to shorten URL's with your own domain? Now you can!

## Installation
You can either run this application on an existing **Apache2 webserver** or via **docker-compose**.
### Installation with an existing Apache2 webserver
To set up this shortener, just create a new vhost in your existing Apache2 webserver. Copy the contents of the `src` folder into the **webroot** and you are ready to go!
### Installation with docker-compose
Copy the whole repo into a folder, navigate into it and run `docker-compose up -d` and you are ready to go!

The standard port for the dockerized Apache2 webserver ist set to **8000**. You may want to change this in your `docker-compose.yml`.

To stop the application run `docker-compose down`.

## Setup
All you have to know about the setup are the default credentials: `admin` as the username as well as the password!
