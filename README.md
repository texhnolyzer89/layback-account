## Conta Layback: 

Demo minimalista de um servidor oAuth2 (Authorization Server nos moldes do RFC 6749 https://datatracker.ietf.org/doc/html/rfc6749) que autentica clientes e os redireciona de volta à plataforma de origem, servindo como um intermediário eficiente para rápida autenticação.

## Dependencies

You must have the following programs installed on your machine in order to run this app:

##### docker
##### docker-compose
##### npm
##### nodejs

## Installation

Da pasta root, escreva o seguinte comando:

```
  make install
```
Depois disso, rode a aplicação em modo de desenvolvimento com:

```
  npm run dev
```

Para reiniciar a base de dados:

```
  make restart-database
```
Para apagar todos os dados da base de dados:
```
  docker images
  docker rmi -f <docker-image-name>
```
É necessário criar um .env com as seguintes variáveis:

```
DATABASE_URL=postgresql://postgres:senha@localhost:8081/basededados

NEXTAUTH_URL=http://64.176.3.252:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

SECRET=contalayback
PRODUCT1_SECRET=product1
PRODUCT2_SECRET=product2
NEXTAUTH_SECRET=contalayback

PRODUCT1_PUBLIC_IP=http://64.176.3.252:3001/
PRODUCT2_PUBLIC_IP=http://64.176.3.252:3002/
PUBLIC_IP=http://64.176.3.252:3000/
```
No ambiente de desenvolvimento basta utilizar o localhost no lugar do IP público.
