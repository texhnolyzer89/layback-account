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
## Warning

1. If database data is wiped, no functionality will work, but you might remain authenticated, as the browser will still contain your valid JWT cookies.

In this case, you must log-out and create a new account, which should work with the "Sign-in with Google" button.

2. Microsoft sign-in temporarily suspended. To add the functionality one must sign-in to Microsoft Active Directory, create a project, get an API key and add it to .env. It will be added in future versions, once I get a new Microsoft account.