### framework and tools
- nestjs
- xlsx
- swagger

### lifecycle
main.ts -> app.module -> app.controller -> usecases

### install package
$ yarn install

### running
$ npm run start:dev

### url
- http://localhost:3000/api/docs (swagger)
- http://localhost:3000/api/excel (upload file), body { document: binary }

### noted
- mohon dipastikan value yang didalam excel bukan format tanggal
- ekskusi bisa dilakukan hanya dengan membuka swagger dan upload file pada api yang di sediakan (api/excel)