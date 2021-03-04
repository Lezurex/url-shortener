# url-shortener
Simple URL shortener for Apache Webservers

Did you ever want to shorten URL's with your own domain? Now you can!

## Features
- Put in a long URL and get a shortened link with your own domain
- Manage all your created links
- Create shortened URLs with a customizeable ID/ending
- Enable rickroll mode for shortened links without preview on social media and chat applications
- See how many times your link has been clicked
- Simple design

## Installation
You can either run this application on an existing **Apache2 webserver** or via **docker-compose**.
### Installation with an existing Apache2 webserver
To set up this shortener, just create a new vhost in your existing Apache2 webserver. Copy the contents of the `src` folder into the **webroot** and you are ready to go!

Please make sure, that your site configuration does allow `.htaccess` overrides and that the file in `data/data.json` is **readable and writeable**. Also make sure, that your Apache2 webserver is using **PHP version 8** or higher, as some strong typed methods and class properties are used!

### Installation with docker-compose
Copy the whole repo into a folder, navigate into it and run `docker-compose up -d` and you are ready to go!

The standard port for the dockerized Apache2 webserver ist set to **8000**. You may want to change this in your `docker-compose.yml`.

To stop the application run `docker-compose down` inside your folder.

## Setup
All you have to know about the setup are the default credentials: `admin` as the username as well as the password!

Change your username and password after first use!
