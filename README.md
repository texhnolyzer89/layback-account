Conta Layback: Demo minimalista de um servidor oAuth2 (Authorization Server nos moldes do RFC 6749 https://datatracker.ietf.org/doc/html/rfc6749) que autentica clientes e os redireciona de volta à plataforma de origem, servindo como um intermediário eficiente para rápida autenticação.

## Dependencies

You must have the following programs installed on your machine in order to run this app:

##### docker
##### docker-compose
##### npm
##### nodejs

## Installation

From the root folder, run the following command:

```
  make install
```

After that, you can run the application with

```
  npm run dev
```

To restart the database:

```
  make restart-database
```
In case you want to reset all database data, use this command (the docker image name will probably be postgres):
```
  docker images
  docker rmi -f <docker-image-name>
```
