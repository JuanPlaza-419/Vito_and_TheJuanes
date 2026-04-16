const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getHouses() {
  const res = await fetch(`${BASE_URL}/houses`);
  if (!res.ok) throw new Error('Error cargando viviendas');
  return res.json();
}

export async function createHouse(data) {
  const res = await fetch(`${BASE_URL}/houses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creando vivienda');
  return res.json();
}

export async function filterHouses(minPrice, maxPrice) {
  const params = new URLSearchParams();

  if (minPrice !== null && minPrice !== undefined) {
    params.append("min_price", minPrice);
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    params.append("max_price", maxPrice);
  }

  const res = await fetch(
    `${BASE_URL}/houses/filter?${params.toString()}`
  );

  if (!res.ok) throw new Error("Error filtrando viviendas");

  return res.json();
}
