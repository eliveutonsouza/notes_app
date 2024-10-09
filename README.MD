# Notes App

## Description

- ### the objective of this project it's Application similar to notion with an idea to help peoples to remember something, express theyselves,or make your own Routine

## Use Cases.

- ### with notes App you can create your personal account and customize it as you prefer, futhermore you can make cards pick Colors for them and customize titles and descriptions,Update cards and More !

## Project Stack

1. Node
2. Typescript
3. Express
4. Jest
5. Docker
6. Github Actions
7. MongoDB
8. React
9. Axios

## Documentation Back End

### Postman:

[Link Postman Documentation ](https://documenter.getpostman.com/view/29716630/2sAXqv6MKz)

### Enviorement Variables

- DB_NAME=Your DB_NAME
- DB_USERNAME=Your DB_USERNAME
- CONNECTION_URL_LOCAL=Your URL_LOCAL
- PORT_APP= Your PORT_APP
- PRIVATE_KEY_JWT= Your PRIVATE_KEY_JWT

### EndPoints

- http:localhost:{PORT_APP}/welcome
- http:localhost:{PORT_APP}/register
- http:localhost:{PORT_APP}/login
- http:localhost:{PORT_APP}/user
- http:localhost:{PORT_APP}/post/{id}
- http:localhost:{PORT_APP}/post?page=1
- http:localhost:{PORT_APP}/post/title?title=Title

### Installation

#### Prerequisites

1. you must have a machine with network
2. Install Git:
   [Link Download Git](https://daringfireball.net/projects/markdown/)
3. Install Node with NPM:
   [Link Download Node](https://nodejs.org/pt)
4. Install Docker and Docker compose:
   [Link Download Docker](https://www.docker.com/)

#### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/JoseLucasdevv/notes_app
   ```
2. Enter the notes_app folder, and then go into the back-end folder.:

   ```bash
   cd notes_app
   cd back-end
   ```

3. Install dependencies project with npm:

   ```bash
   npm install
   ```

4. now you must create your .env File and set your enviroment variables.
   ```bash
   touch .env
   ```
5. now you can get up your container using Docker
   ```bash
   sudo docker compose up
   ```
6. after those steps you can access localhost on your machine localhost:{PORT_APP}/welcome and localhost:8081
