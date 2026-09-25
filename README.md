# EDU-IA: Directorio de Herramientas de Inteligencia Artificial Gratuitas

Sitio web estático completo (HTML5, CSS3, JavaScript Vanilla), optimizado para SEO, móvil y preparado para monetizar con **Google AdSense** y **enlaces de afiliados**. Dirigido a estudiantes y docentes.

---

## 📁 Estructura del Proyecto

```text
ia-educacion-web/
├── index.html                     # Portada: Hero con buscador, categorías, destacadas y FAQ
├── categoria.html                 # Directorio filtrable por categoría y audiencia en tiempo real
├── article.html                   # Plantilla maestra reutilizable para nuevas reseñas
├── sobre.html                     # Misión y criterios editoriales (autoridad para AdSense)
├── privacidad.html                # Política de Privacidad, Cookies y Aviso de Afiliados (GDPR/AdSense)
├── contacto.html                  # Formulario accesible de contacto y soporte
├── robots.txt                     # Directivas para rastreadores de búsqueda
├── sitemap.xml                    # Mapa del sitio XML indexable
├── css/
│   └── styles.css                 # Sistema de diseño SaaS: variables, responsive, modo claro/oscuro
├── js/
│   ├── main.js                    # Modo claro/oscuro (localStorage), menú móvil, acordeones
│   ├── tools-data.js              # Base de datos centralizada de herramientas y artículos
│   └── search-filter.js           # Motor de búsqueda y filtrado dinámico del lado cliente
├── articulos/
│   ├── chatgpt-gratis-estudiantes.html  # Reseña de ejemplo 1
│   ├── canva-ia-profesores.html         # Reseña de ejemplo 2
│   └── notion-ia-productividad.html     # Reseña de ejemplo 3
└── assets/                        # Directorio para capturas de pantalla e imágenes
```

---

## 🚀 Cómo Añadir un Nuevo Artículo Paso a Paso

Todo el contenido que debes personalizar está identificado con la marca `[PLACEHOLDER]`. Para añadir una nueva herramienta:

### 1. Crear el archivo HTML del artículo
1. Copia el archivo `article.html` (o cualquiera dentro de la carpeta `articulos/`).
2. Guárdalo dentro de `articulos/` con un nombre descriptivo en minúsculas y guiones (ejemplo: `articulos/perplexity-estudiantes.html`).
3. Abre el archivo y sustituye los bloques marcados con `[PLACEHOLDER]`:
   - `<title>` y `<meta name="description">`
   - Los datos estructurados `<script type="application/ld+json">`
   - El resumen rápido (TL;DR)
   - Los puntos fuertes (Pros) y limitaciones (Contras)
   - El apartado "¿Para quién es ideal?"
   - El enlace de afiliado y el botón CTA final

### 2. Registrar la herramienta en el buscador y catálogo
Abre `js/tools-data.js` y añade un nuevo objeto al array `TOOLS_DATA`:

```javascript
{
  id: 'perplexity-ai',
  name: 'Perplexity AI',
  initials: 'PPL',
  tagline: 'Buscador conversacional con citas académicas exactas',
  category: 'estudiar',               // 'escribir', 'estudiar', 'diseno', 'productividad'
  categoryLabel: 'IA para Estudiar',
  audience: 'estudiantes',            // 'estudiantes', 'profesores', 'ambos'
  audienceLabel: 'Para Estudiantes',
  pricing: 'Plan Gratuito',
  rating: 4.8,
  ratingCount: 110,
  description: 'Tu descripción personalizada...',
  features: [
    'Citas directas de fuentes académicas',
    'Búsqueda en papers y artículos científicos',
    'Modo gratuito sin necesidad de pago'
  ],
  articleUrl: 'articulos/perplexity-estudiantes.html',
  affiliateUrl: 'https://www.perplexity.ai',
  featured: false
}
```

### 3. Actualizar el Mapa del Sitio (`sitemap.xml`)
Añade la URL del nuevo artículo dentro de `sitemap.xml`:

```xml
<url>
  <loc>https://tudominio.com/articulos/perplexity-estudiantes.html</loc>
  <lastmod>2026-09-25</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 💰 Configuración de Monetización

### 1. Google AdSense
Todas las páginas incluyen contenedores claramente identificados con IDs semánticos:
- `#adsense-header`: Banner horizontal superior (728x90 o adaptable).
- `#adsense-in-article`: Bloque intermedio dentro de la lectura.
- `#adsense-category-top` y `#adsense-category-bottom`: Espacios publicitarios en el catálogo.
- `#adsense-article-bottom`: Bloque cuadrado o adaptable (336x280) al pie del artículo.

**Para activarlos una vez te aprueben en AdSense:**
1. Inserta el script oficial de Google AdSense en el `<head>` de tus páginas:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
2. Reemplaza el contenido interior de cada `div.adsense-placeholder` por tu bloque `<ins class="adsbygoogle" ...></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`.

### 2. Enlaces de Afiliados
Cada reseña dispone del componente `.affiliate-box`. Para cumplir con las directrices de Google, la FTC y la normativa europea:
- Añade siempre los atributos `rel="noopener noreferrer nofollow"` a tus enlaces de afiliado.
- Mantén visible el aviso legal incluido en el componente (`.affiliate-disclaimer`), indicando con total transparencia que el portal percibe una comisión sin coste extra para el usuario.

---

## 🌐 Cómo Desplegar Gratis en GitHub Pages

1. **Crear repositorio en GitHub:**
   - Inicia sesión en [GitHub](https://github.com/) y haz clic en **New Repository**.
   - Ponle nombre (por ejemplo `ia-educacion-web` o `<tu-usuario>.github.io`).
   - Déjalo como **Public**.
2. **Subir los archivos:**
   - Sube todos los archivos y carpetas del proyecto a la rama principal (`main`):
     ```bash
     git init
     git add .
     git commit -m "Lanzamiento web EDU-IA"
     git branch -M main
     git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
     git push -u origin main
     ```
3. **Activar GitHub Pages:**
   - Entra en tu repositorio en GitHub y ve a **Settings** > **Pages** (menú lateral izquierdo).
   - En **Build and deployment > Source**, selecciona **Deploy from a branch**.
   - En **Branch**, elige `main` y la carpeta `/ (root)`. Haz clic en **Save**.
4. ¡Listo! En 1 o 2 minutos tu sitio web estará disponible públicamente en una dirección del tipo:
   `https://<tu-usuario>.github.io/<tu-repositorio>/`

---

## 🎨 Personalización de Marca
- Para cambiar la paleta de colores, edita las variables en las primeras líneas de `css/styles.css` (`--primary`, `--accent`, `--bg-body`, etc.).
- Para cambiar el nombre del sitio, edita la clase `.logo-text` en la cabecera y el pie de página de cada archivo HTML.
