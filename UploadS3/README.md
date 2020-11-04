# C08-sendEmail

# Ejemplo de microservicio en Node js (Express)


## Librerías utilizadas: 

- Echo: https://echo.labstack.com/
- SQLX: http://jmoiron.github.io/sqlx/

---

### Compilar:

Este comando descargará las dependencias necesarias

```
npm i 
```

### Ejecutar:

```
npm run start
```

---

## Docker

Para ejecutar este servicio en un contenedor de docker, solo hay que construir la imagen:

```
docker build -t myService .
```

y luego para ejecutarlo:

```
docker run -p 8080:8080 myService
```

---

## Variables de entorno

```
export POSTGRES_HOST="127.0.0.1"
export POSTGRES_PORT=5432
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=root
export POSTGRES_NAME=postgres

export TEMPLATE_SERVER=https://static.api.leaseforu.com/
```
---


## Peticiones soportadas en este microservicio:
-  [**POST** /sendEmail](https://mocks.api.leaseforu.com/docs#operation/Send%20Email)
-  [**POST** /sendFile](https://mocks.api.leaseforu.com/docs#operation/Send%20%20File%20Email)
-  **POST** /sendEmail
-  **POST** /sendFile
