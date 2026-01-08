# SuperPreciosa (Antes LuxeHair) - Contexto del Proyecto

## Estado Actual: "Rebranding y Rediseño Premium"

### 1. Rebranding Completo
* **Nombre:** De "LuxeHair" a **"SuperPreciosa"**.
* **Eslogan:** "Expertos en Color".
* **Identidad Visual:** Logo con ícono de Sparkles (✨) y acentos dorados (Gold: #d4af37).

### 2. Stack Tecnológico Actualizado
* **Framework CSS:** Tailwind CSS (Instalado y configurado).
* **Fuentes:**
    * Títulos: *Playfair Display* (Serif).
    * Texto: *Inter* (Sans-serif).
* **Configuración:** `tailwind.config.js` personalizado con paleta de colores.

### 3. Componentes y Diseño (Glassmorphism)
* **Hero Section (Nuevo):** Diseño full-width, imagen de fondo de alta calidad, gradiente oscuro y CTA con sombras doradas.
* **ProductCard:** Refactorizado con efecto **Glassmorphism** (`bg-white/5`, `backdrop-blur-lg`), bordes sutiles y animaciones de zoom al hacer hover.
* **Navbar:** Sticky, efecto blur, contador de carrito con badge dorado.
* **Checkout Form:** Inputs con estilo glassmorphism y botón de WhatsApp premium.

### 4. Estructura de Archivos Clave
* `src/components/Hero.jsx` (Nuevo)
* `src/components/ProductCard.jsx` (Refactorizado con Tailwind)
* `src/components/Navbar.jsx` (Refactorizado con Branding)
* `src/components/CheckoutForm.jsx` (Refactorizado)
* `tailwind.config.js` y `postcss.config.js` (Configuración)

### 5. Funcionalidad Mantendida
* Carrito de compras funcional (Agregar/Eliminar).
* Integración con WhatsApp para finalizar pedido.
* Carga de productos desde JSON.