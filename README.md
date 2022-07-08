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

---

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

## Get Posts
Mendapatkan posts yang telah dibuat user
#### Request:
```http
GET https://wdt-rest-api.herokuapp.com/api/posts
```
#### Params:
```json
{
    "page": 1,
    "limit": 5
}
```

## Create Post
Membuat post baru 
#### Request:
```http
POST https://wdt-rest-api.herokuapp.com/api/posts
```
#### Credentials:
```json
{
    "title": "Judul post",
    "slug": "judul-post",
    "body": "Lorem ipsum.."
}
```
## Show Post
Melihat detail post
#### Request:
```http
GET https://wdt-rest-api.herokuapp.com/api/posts/:id
```

## Edit Post
Mengedit post yang sudah ada
#### Request:
```http
PUT PATCH https://wdt-rest-api.herokuapp.com/api/posts/:id
```
#### Credentials:
```json
{
    "title": "Judul post diubah",
    "slug": "judul-post-diubah",
    "body": "Lorem ipsum.. diubah juga"
}
```

## Delete Post
Menghapus post
#### Request:
```http
DELETE https://wdt-rest-api.herokuapp.com/api/posts/:id
```

## Get Comment
Mendapatkan Comment dari sebuah post
#### Request:
```http
GET https://wdt-rest-api.herokuapp.com/api/posts/:postId/comments
```
#### Params:
```json
{
    "page": 1,
    "limit": 5
}
```

## Create Comment
Membuat Comment baru pada sebuah post
#### Request:
```http
POST https://wdt-rest-api.herokuapp.com/api/posts/:postId/comments
```
#### Credentials:
```json
{
    "body": "Comments saya"
}
```
## Show Comment
Melihat detail Comment
#### Request:
```http
GET https://wdt-rest-api.herokuapp.com/api/comments/:id
```

## Edit Comment
Mengedit Comment yang sudah ada
#### Request:
```http
PUT/PATCH https://wdt-rest-api.herokuapp.com/api/comments/:id
```
#### Credentials:
```json
{
    "body": "Comments saya diubah"
}
```

## Delete Comment
Menghapus Comment
#### Request:
```http
DELETE https://wdt-rest-api.herokuapp.com/api/comments/:id
```
