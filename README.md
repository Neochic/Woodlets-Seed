# Woodlets-Seed
WordPress project skeleton for Woodlets projects.

## Prerequisites
* [Node.js](https://nodejs.org/)
* [Node Package Manager (npm)](https://www.npmjs.com/)
* [PHP](http://www.php.net/)

### Windows
* [Git Bash](https://git-for-windows.github.io/)

### Optional
* [Docker](https://docs.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## Getting Started
1. Clone repository ```git clone https://github.com/Neochic/Woodlets-Seed.git```
   If you don't have git you may just [download the latest version](https://github.com/Neochic/Woodlets/archive/master.zip) and extract it.
2. Change into the directory with the downloaded Woodlets Seed sources.
3. run ```npm run build```
   *Caution: There is currently an issue on creating the link to the theme on Windows (not testen on MacOS). If you don't use Docker, you may have to create a link from public/wp-content/themes/<your_theme_name> to src/ manually with mklink via administrator shell.*
4. **With Docker**  
   Run ```WOODLETS_EXPOSE_PORT=80 docker-compose up -d``` (you may change the port 80 to any other port)  
   **Without Docker**
   * Install Apache- and MySQL-Server (if you don't have one running yet)
   * Be sure that those Servers are configured correctly to [be able to run WordPress](https://wordpress.org/about/requirements/)
   * Set ```DocumentRoot``` of your Apache to the ```public``` directory of your just downloaded Woodlets Seed sources.
5. Access your new WordPress installation via Browser and run through install steps.  
   If you used Docker the database server is ```mysql``` and username and password for mysql are ```admin```
6. Include the composer autoloader at the top of your ```wp-config.php``` (in the line after the opening PHP tag)
   ```php
   $autoloader = __DIR__ . '/../vendor/autoload.php';

   if (is_file($autoloader)) {
     require_once($autoloader);
   }
   ```
7. You should set ```WP_DEBUG``` in ```wp-config.php``` to ```true``` in development environments.  
   If it's set to ```false``` the combined javascript of the theme gets loaded. Therefore an ```npm run build``` would be needed after each change to the javascript files.
8. Log in to WordPress backend
9. Activate Woodlets plugin
10. Activate woodlets-seed theme


## Configure port for docker permanently
You can create [a environment file](https://docs.docker.com/compose/env-file/) with the name ```.env``` and put the environment variable in there.
```
WOODLETS_EXPOSE_PORT=80
```
Then you'll be able to use docker-compose without setting the port each time explicitly.
