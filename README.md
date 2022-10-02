# <p align = "center"> FullEstoque </p>

<p align="center">
   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmDTTjQ9xFdPsWXiPzKhuYv7Yt3BeLe0-5bw&usqp=CAU"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Sergio Trajano-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/SergioTrajano/API-FullEstoque?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

A API to manage invetory.

***

## :computer:	 Tecnologies and concepts

- REST APIs
- JWTs
- Node.js
- TypeScript
- Postgres
- Prisma

***

## :rocket: Routes

## Auth routes

```yml
POST /signUp
    - Route to sign-up a user
    - headers: {}
    - body:{
        "email": "lore@ipsum.com",
        "password": "loremipsum",
        "confirmPassword": "loremepsum",
        "name": "lorem",
    }
```
    
```yml 
POST /signin
    - Route to sign-in user
    - headers: {}
    - body: {
      "email": "lorem@gmail.com",
      "password": "loremipsum"
    }
```

## Categories Routes
    
```yml 
POST /categories (authenticated)
    - Route to create a category
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "loreIpsum"
    }
```

```yml
PUT /cateogires/:categoryId (authenticated)
    - Route to update category
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "loreIpsum"
    }
``` 

```yml
DELETE /categories/:categoryId (authenticated)
    - Route to delete category
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
 
```yml
GET /categories (authenticated)
    - Route to get user's categories
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## :rocket: Manufacturers Routes
    
```yml 
POST /manufacturers (authenticated)
    - Route to create a manufacturer
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "loreIpsum"
    }
```

```yml
PUT /manufacturers/:manufacturerId (authenticated)
    - Route to update manufacturer
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "loreIpsum"
    }
``` 

```yml
DELETE /manufacturers/:manufacturerId (authenticated)
    - Route to delete manufacturer
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
 
```yml
GET /manufacturers (authenticated)
    - Route to get user's manufacturers
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## Products Routes
    
```yml 
POST /products (authenticated)
    - Route to create a product
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "categoryId": 1,
	      "name": "lorem",
	      "description": "loremIpsum",
	      "barcode": "123456879",
	      "price": 5.20,
	      "manufacturerId": 1
    }
```

```yml
PUT /products/:productId (authenticated)
    - Route to update products
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "categoryId": 1,
	      "name": "lorem",
	      "description": "loremIpsum",
	      "barcode": "123456879",
	      "price": 5.20,
	      "manufacturerId": 1
    }
``` 

```yml
DELETE /products/:productId (authenticated)
    - Route to delete product
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
 
```yml
GET /products (authenticated)
    - Route to get user's products
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## Clients Routes
    
```yml 
POST /clients (authenticated)
    - Route to create a client
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "loremIpsum",
        "phoneNumber": 999999999,
        "CPF": "12345678912",
        "RG": 1234567,
    }
```

```yml
PUT /clients/:clientId (authenticated)
    - Route to update client
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "loremIpsum",
        "phoneNumber": 999999999,
        "CPF": "12345678912",
        "RG": 1234567,
    }
``` 

```yml
DELETE /clients/:clientId (authenticated)
    - Route to delete client
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
 
```yml
GET /clients (authenticated)
    - Route to get user's clients
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## :rocket: Sells Routes
    
```yml 
POST /sells (authenticated)
    - Route to create a sell
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "productId": 1,
        "clientId": 1,
        "quantity": 1,
        "totalPrice": 5.20, //R$
    }
```

```yml
PUT /sells/:sellId (authenticated)
    - Route to update sell
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "productId": 1,
        "clientId": 1,
        "quantity": 1,
        "totalPrice": 5.20, //R$
    }
``` 

```yml
DELETE /sells/:sellId (authenticated)
    - Route to delete sell
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
 
```yml
GET /sells (authenticated)
    - Route to get user's sells
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## Purchases Routes
    
```yml 
POST /purchases (authenticated)
    - Route to create a purchase
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "productId": 1,
        "quantity": 1,
        "totalPrice": 5.20,
    }
```

```yml
PUT /purchases/:purchaseId (authenticated)
    - Route to update purchase
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "productId": 1,
        "quantity": 1,
        "totalPrice": 5.20,
    }
``` 

```yml
DELETE /purchases/:purchaseId (authenticated)
    - Route to delete purchase
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
 
```yml
GET /purchases (authenticated)
    - Route to get user's purchases
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## 🏁 Running the application

This project was create with [Create React App](https://github.com/facebook/create-react-app), so make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, do a clone of this repository in your machine:

```
git clone https://github.com/SergioTrajano/API-FullEstoque
```

Then, in your folder, run the following command to install the dependencies:

```
npm install
```

Then, you just need to initialize the server:
```
npm start
```

:stop_sign: Do not forget do repeat the above steps to [repository](https://github.com/SergioTrajano/FullEstoque) that contains the interface of this application, to test the complete application.
