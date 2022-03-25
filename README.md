# dixio-chat-app-assessment
Basic chat app for Dixio programming assessment

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.11.3

    $ npm --version
    6.1.0
### Clone Repository
```sh
 git clone https://github.com/ChiromboKenT/dixio-chat-app-assessment.git
 
```

### Install

```sh
 (cd chat-api && npm install) & (cd client && npm install)
 
```
## Usage Locally

### Run Backend
  - Navigate to chat-api folder 
```sh
  cd chat-api && npm run start:dev
```

### Run Client
  - Navigate to client folder  *Make sure to be in Project root diretory /dixio-chat-app-assessment
```sh
  cd client && npm start
```
### Open Application
  - Open application on <a href="http://127.0.0.1:8080/" target="_blank">http://localhost:8080/</a>

### Run concurrently with 
```sh
     (cd chat-api npm run start:dev) & (cd client && npm start)
```

## Usage Docker
- Production settings
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```
- development settings
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```
### Open Application
  - Open application on <a href="http://127.0.0.1:4200/" target="_blank">http://localhost:4200/</a>

## Author

👤 **Kenny Chirombo**

* Github: [@ChiromboKenT](https://github.com/ChiromboKenT)
* LinkedIn: [@chirombokenny](https://linkedin.com/in/chirombokenny)
