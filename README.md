# qa-automatizacion-selaski
Prueba de Automatización con Cypress: Validación de Proceso de Autenticación y Búsqueda de Embarque

# Automatización de Validación de Embarques

Este proyecto automatiza el proceso de validación ingreso a la busqueda de embarques

## Requisitos tecnicos
- Node.js instalado
- Cypress configurado
- Fixture `datos.json` con PIN válido y el código de embarque simulado

## Flujo Automatizado

1. **Login inválido con PIN aleatorio**
   - Se valida que el sistema muestre mensaje de error por PIN incorrecto generandolo de forma aleatoria.

2. **Login exitoso con PIN desde `datos.json`**
   - Se realiza el ingreso usando un PIN correcto del fixture.

3. **Acceso al módulo de filtros**
   - Se selecciona el tipo de registro: “Embarque”.

4. **Búsqueda de embarque existente ("Prueba 1")**
   - Se usa un código válido del fixture para validar el embarque y se añade un tiempo de espera para la visualizacion del resultado

5. **Eliminación del filtro**
   - Se elimina el filtro de busqueda de "Prueba 1"

6. **Búsqueda de embarque inexistente ("Prueba 2")**
   - Se usa un código simulado sin registros.
   - El sistema nos da el resultado de: “Sin datos para mostrar”.

7. **Agregado final**
   - Se muestra un texto al finalizar la simulacion indicando "Prueba finalizada"

## Objetivo

Simular la experiencia de usuario en el módulo de embarques, incluyendo:

- Manejo de errores
- Filtro condicional
- Eliminación de filtros
- Validación de comportamientos visuales en el DOM


