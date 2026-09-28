# 🎮 Triqui — Tres en Línea

Juego clásico de Triqui (Tic-Tac-Toe) desarrollado con HTML5, CSS3 y JavaScript vanilla. Sin frameworks, sin librerías externas, 100% funcional en el navegador.

## 👤 Autor

**Juan Sebastián Moreno Rizo**

## 📚 Asignatura

Desarrollo Full Stack con IA

---

## ✨ Características

### Modos de juego
- **👤 vs 👤** — Dos jugadores humanos se turnan en el mismo dispositivo
- **👤 vs 🤖** — Juega contra la computadora con 3 niveles de dificultad:
  - 🟢 **Fácil** — Movimientos aleatorios, ideal para principiantes
  - 🟡 **Intermedio** — La IA bloquea y ataca, pero comete errores ocasionales
  - 🔴 **Difícil** — Algoritmo Minimax perfecto, invencible

### Funcionalidades
- Tablero 3x3 interactivo
- Detección automática de las 8 combinaciones ganadoras
- Detección de empate
- Resaltado visual de la combinación ganadora con animación pulsante
- Marcador persistente (victorias de X, O y empates) guardado en `localStorage`
- Botón "Nueva partida" para reiniciar sin recargar
- Botón "Reiniciar marcador" con confirmación
- Bloqueo del tablero al finalizar una partida
- Indicador visual del turno actual

### Diseño
- Interfaz moderna con fondo degradado oscuro
- Tarjeta principal con efecto glassmorphism
- Animaciones suaves al colocar fichas (`pop-in`)
- Animación de victoria en las celdas ganadoras (`win-pulse`)
- Colores diferenciados para X (rojo) y O (azul)
- Totalmente responsive para celular, tablet y escritorio
- Sin desplazamiento horizontal en pantallas pequeñas

### Accesibilidad
- HTML semántico
- Atributos `aria-label` descriptivos en cada celda
- Navegación completa con teclado (Enter / Espacio)
- Estados visuales claros con `focus-visible`
- Contraste suficiente entre texto y fondo

---

## 🚀 Cómo ejecutar

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Juansmorenor/Triqui-JuanMoreno.git
   ```
2. Abrir `index.html` en cualquier navegador moderno

No se necesita servidor, instalación ni conexión a internet.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica y accesible |
| CSS3 | Diseño responsive, animaciones, flexbox, grid |
| JavaScript vanilla | Lógica del juego, IA con Minimax, localStorage |

---

## 📁 Estructura del proyecto

```
triqui/
├── index.html    ← Estructura HTML
├── style.css     ← Estilos y animaciones
├── script.js     ← Lógica del juego e IA
└── README.md     ← Este archivo
```

---

## 📄 Licencia

Proyecto académico — Desarrollo Full Stack con IA
