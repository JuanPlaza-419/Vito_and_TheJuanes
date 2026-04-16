# tasamostucasa.es

Frontend React + Vite para tasación inmobiliaria.

## Instalación

```bash
npm install
cp .env.example .env   # ajusta VITE_API_URL
npm run dev
```

## Estructura

```
src/
├── api/          housesApi.js
├── components/   Navbar · HouseCard · HouseList · FilterBar · HouseForm
├── pages/        Home · CreateHouse · FilterHouses
└── styles/       global.css · variables.css
```

## API

- GET  /houses
- POST /houses
- GET  /houses/filter?minPrice=&maxPrice=
