# Adivina el Número

Juego simple de lógica hecho en Next.js + TailwindCSS.

## Concepto
Se genera un número secreto de N dígitos (por defecto 4). Cada intento que haces se compara **posición por posición** y se te informa cuántas posiciones acertaste exactamente (no se mira sólo el dígito, sino coincidencia exacta en la posición).

## Futuro Backend
Se podrá conectar luego a un backend (API / scoreboard / auth) sin cambiar la UI; se puede exponer un endpoint para generar y validar intentos en lugar de hacerlo en cliente.

## Ejecutar
Instala dependencias y lanza el servidor de desarrollo:

```
pm install
npm run dev
```

Abre http://localhost:3000

## Personalización
- Cambia los colores en `tailwind.config.js`.
- Lógica para garantizar dígitos únicos (si lo deseas) se puede ajustar en `lib/secret.ts`.

## Ideas Próximas
- Limitar intentos / modo difícil.
- Mostrar historial con animaciones.
- Compartir un código seed para mismo secreto entre amigos.
- Internacionalización.

Disfruta programando :)
