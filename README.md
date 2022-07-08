# Instalasi
Langkah - langkah instal project

* Clone dan install package menggunakan npm
```
git clone https://github.com/TaufiqStark/wdt-test.git
cd wdt-test
npm install
```

* Ubah config database PostgreSQL sesuai dengan database di komputer kita
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
