# Instalasi
Langkah - langkah instal project

* Clone dan install package menggunakan npm
```
git clone https://github.com/TaufiqStark/wdt-test.git
cd wdt-test
npm install
```

* Ubah config database sesuai dengan database di komputer kita
```json
"development": {
    "username": "blog-test",
    "password": "blogtest",
    "database": "blog-test",
    "host": "127.0.0.1",
    "dialect": "postgres"
},
```

* Migrate dan seed database menggunakan sequelize
```
sequelize db:migrate
sequelize db:seed:all
```

* Rename `.env.example` menjadi `.env` dan ubah sesui kebutuhan

* Jalankan project dengan npm
```
npm start
```


# Documentation

## Register
Daftarkan akun sebelum melakukan login
#### Request:
```http
POST https://wdt-rest-api.herokuapp.com/api/register
```
#### Credentials:
```json
{
    "name": "Your name",
    "email": "email@gmail.com",
    "password": "123456"
}
```

## Login
Login untuk mendapatkan token yang akan digunakan di header `Authorization` saat request yang membutuhkan authentication
#### Request:
```http
POST https://wdt-rest-api.herokuapp.com/api/login
```
#### Credentials:
```json
{
    "email": "email@gmail.com",
    "password": "123456"
}
```

## Request Reset Password
Request link reset password
#### Request:
```http
POST https://wdt-rest-api.herokuapp.com/api/reset-password
```
#### Credentials:
```json
{
    "email": "email@gmail.com"
}
```

## Reset Password
Reset password dari link yang di dapat
#### Request:
```http
POST https://wdt-rest-api.herokuapp.com/api/reset-password/:id/:passId
```
#### Credentials:
```json
{
    "password": "123456789"
}
```

## Profile
Mendapatkan informasi akun kita
#### Request:
```http
GET https://wdt-rest-api.herokuapp.com/api/profile
```
