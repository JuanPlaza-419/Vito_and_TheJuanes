# Sistema Inteligente de Estimación de Precios de Viviendas

---

# 1. Definición del proyecto

## 1.1 Propósito del sistema

El objetivo de este proyecto es desarrollar una aplicación que permita:

- Estimar el precio de una vivienda mediante Machine Learning  
- Generar automáticamente una descripción atractiva usando Inteligencia Artificial  
- Exponer todo el sistema mediante una API REST  

En el sector inmobiliario, el precio de una vivienda depende de múltiples factores como:

- Tamaño  
- Número de habitaciones  
- Servicios disponibles  
- Ubicación  

Este sistema automatiza el proceso de valoración usando datos históricos y modelos de IA.

---

### Casos de uso

- Usuarios que quieren estimar el precio de una vivienda  
- Aplicaciones inmobiliarias  
- Proyectos educativos  

---

## 1.2 Dataset utilizado

Dataset original:

https://www.kaggle.com/datasets/yasserh/housing-prices-dataset

Variables utilizadas:

- `price` (objetivo)
- `area`
- `bedrooms`
- `bathrooms`
- `stories`
- `mainroad`
- `guestroom`
- `basement`
- `hotwaterheating`
- `airconditioning`
- `parking`
- `prefarea`
- `furnishingstatus`

---

## Preprocesamiento

### Variables binarias

- `yes → 1`
- `no → 0`

Columnas:
- mainroad  
- guestroom  
- basement  
- hotwaterheating  
- airconditioning  
- prefarea  

---

### Variable categórica

`furnishingstatus`:

- furnished → 2  
- semi-furnished → 1  
- unfurnished → 0  

---

## 1.3 Tipo de aplicación

Sistema híbrido:

- Machine Learning → predicción de precio  
- IA generativa → generación de descripción  
- API REST → interacción externa  

---

# 2. Arquitectura del sistema

---

## 2.1 Modelo de Machine Learning

Tipo:
- Regresión (Linear Regression)

Función:
- Estimar el precio de una vivienda

Proceso:

1. Carga del dataset CSV  
2. Preprocesamiento de datos  
3. Entrenamiento del modelo  
4. Guardado en: models/price_model.pkl

---

## 2.2 Modelo de IA Generativa

Se utiliza el modelo:

**microsoft/phi-2**

### Función

Generar descripciones inmobiliarias a partir de datos estructurados.

### Características

- Modelo ligero (~2.7B parámetros)  
- Buen seguimiento de instrucciones  
- Generación coherente y controlada  

---

### Funcionamiento

1. Se construye un **prompt estructurado**
2. Se pasan los datos de la vivienda
3. El modelo genera una descripción basada SOLO en esos datos

---

## 2.3 Persistencia de datos

Ruta: data/houses.csv


Cada fila contiene:

- Características de la vivienda  
- Precio estimado  
- Descripción generada  

---

## 2.4 API REST

Framework:

- FastAPI

Permite:

- Crear viviendas  
- Consultarlas  
- Filtrarlas por precio  

---

# 3. Endpoints

---

## 1️ Crear vivienda

### Endpoint POST /houses


### Descripción

- Predice el precio  
- Genera descripción con IA  
- Guarda en CSV  

---

### Entrada

```json
{
  "area": 7420,
  "bedrooms": 4,
  "bathrooms": 2,
  "stories": 3,
  "mainroad": 1,
  "guestroom": 0,
  "basement": 0,
  "hotwaterheating": 0,
  "airconditioning": 1,
  "parking": 2,
  "prefarea": 1,
  "furnishingstatus": 2
}
```
### Respuesta

```json
{
  "area": 7420,
  "bedrooms": 4,
  "bathrooms": 2,
  "stories": 3,
  "mainroad": 1,
  "guestroom": 0,
  "basement": 0,
  "hotwaterheating": 0,
  "airconditioning": 1,
  "parking": 2,
  "prefarea": 1,
  "furnishingstatus": 2,
  "price": 8238642,
  "description": "Amplia vivienda con excelente distribución..."
}
```

## 2 Obtener viviendas

### Endpoint GET /houses


### Descripción

- Devuelve todas las viviendas almacenadas en el CSV.

---

## 2 Obtener viviendas

### Endpoint GET /houses


### Descripción

- Devuelve todas las viviendas almacenadas en el CSV.

---

## 3 Filtrar por precio

### Endpoint GET /houses/filter

### Parametros

- min_price (opcional)
- max_price (opcional)

### Ejemplo

GET /houses/filter?min_price=500000&max_price=1000000

---

## 5. Validaciones y errores

## El sistema incluye:

- Validación de tipos de datos
- Conversión automática de variables
- Control de errores

## Códigos HTTP

- 400 → Datos incorrectos
- 404 → No encontrado
- 500 → Error interno

---

## 6. Estructura del proyecto

```json
Vito_and_TheJuanes/
│
├── main.py
├── routes/
│   ├── create_house.py
│   ├── get_houses.py
│   └── filter_houses.py
│
├── app/
│   ├── functions.py
│   └── schemas.py
│
├── models/
│   ├── train_model.py
│   ├── generator.py
│   └── price_model.pkl
│
├── data/
│   ├── housing.csv
│   └── houses.csv
```
