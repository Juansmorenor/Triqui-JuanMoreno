# Triqui — Tres en Linea

Juego clasico de Triqui (Tic-Tac-Toe) desarrollado con HTML5, CSS3 y JavaScript vanilla. Sin frameworks, sin librerias externas, 100% funcional en el navegador.

## Autor

**Juan Sebastian Moreno Rizo**

## Asignatura

Desarrollo Full Stack con IA

---

## Caracteristicas

### Modos de juego
- **Jugador vs Jugador** — Dos jugadores humanos se turnan en el mismo dispositivo
- **Jugador vs Computadora** — Juega contra la computadora con 3 niveles de dificultad:
  - **Facil** — Movimientos aleatorios, ideal para principiantes
  - **Intermedio** — La IA bloquea y ataca, pero comete errores ocasionales
  - **Dificil** — Algoritmo Minimax perfecto, invencible

### Funcionalidades
- Tablero 3x3 interactivo
- Deteccion automatica de las 8 combinaciones ganadoras
- Deteccion de empate
- Resaltado visual de la combinacion ganadora con animacion pulsante
- Marcador persistente (victorias de X, O y empates) guardado en `localStorage`
- Boton "Nueva partida" para reiniciar sin recargar
- Boton "Reiniciar marcador" con confirmacion
- Bloqueo del tablero al finalizar una partida
- Indicador visual del turno actual

### Diseno
- Interfaz moderna con fondo degradado oscuro
- Tarjeta principal con efecto glassmorphism
- Animaciones suaves al colocar fichas (`pop-in`)
- Animacion de victoria en las celdas ganadoras (`win-pulse`)
- Colores diferenciados para X (rojo) y O (azul)
- Totalmente responsive para celular, tablet y escritorio
- Sin desplazamiento horizontal en pantallas pequenas

### Accesibilidad
- HTML semantico
- Atributos `aria-label` descriptivos en cada celda
- Navegacion completa con teclado (Enter / Espacio)
- Estados visuales claros con `focus-visible`
- Contraste suficiente entre texto y fondo

---

## Como ejecutar

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Juansmorenor/Triqui-JuanMoreno.git
   ```
2. Abrir `index.html` en cualquier navegador moderno

No se necesita servidor, instalacion ni conexion a internet.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estructura semantica y accesible |
| CSS3 | Diseno responsive, animaciones, flexbox, grid |
| JavaScript vanilla | Logica del juego, IA con Minimax, localStorage |

---

## Estructura del proyecto

```
triqui/
├── index.html    ← Estructura HTML
├── style.css     ← Estilos y animaciones
├── script.js     ← Logica del juego e IA
└── README.md     ← Este archivo
```

---

## Licencia

Proyecto academico — Desarrollo Full Stack con IA
