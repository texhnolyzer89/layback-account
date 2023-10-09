## Conta Layback: 

Demo minimalista de um servidor oAuth2 (Authorization Server nos moldes do RFC 6749 https://datatracker.ietf.org/doc/html/rfc6749) que autentica clientes e os redireciona de volta à plataforma de origem, servindo como um intermediário eficiente para rápida autenticação.

## Autenticação

O projeto usa Next-Auth e Prisma com Docker, todas ferramentas bem estabelecidas no ambiente Node/Next para autenticação, modelagem de base de dados e conteinerização.

Para começar, crie uma conta layback, e siga o link que aparecerá na tela para confirmar o email da conta (em um ambiente de produção seria enviado por email). 

Pronto! Agora você poderá logar em qualquer dos produtos usando essa conta. Caso você já esteja autenticado, será redirecionado de volta e autenticado na aplicação original, caso contrário, deverá inserir suas credenciais para gerar o token de acesso.

## Dependências

You must have the following programs installed on your machine in order to run this app:

##### docker
##### docker-compose
##### npm
##### nodejs

## Instalação

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
