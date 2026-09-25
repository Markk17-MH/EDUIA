/**
 * EDU-IA: Base de datos de herramientas de Inteligencia Artificial (Cliente)
 * Estructura extensible para renderizar tarjetas estáticas y filtrado dinámico.
 * Los textos están marcados con [PLACEHOLDER] para fácil edición del usuario.
 */

const TOOLS_DATA = [
  {
    id: 'chatgpt-gratis',
    name: 'ChatGPT Free (OpenAI)',
    initials: 'GPT',
    tagline: 'Asistente conversacional para redacción, esquemas y resolución de dudas académicas',
    category: 'escribir',
    categoryLabel: 'IA para Escribir',
    audience: 'estudiantes',
    audienceLabel: 'Para Estudiantes',
    pricing: 'Plan Gratuito',
    rating: 4.8,
    ratingCount: 320,
    description: '[PLACEHOLDER - Resumen de la herramienta: ChatGPT en su versión gratuita ofrece capacidades de procesamiento de lenguaje natural ideales para estudiantes que necesitan sintetizar textos extensos, practicar idiomas o estructurar trabajos académicos sin costo alguno.]',
    features: [
      '[PLACEHOLDER - Redacción y corrección de borradores académicos]',
      '[PLACEHOLDER - Explicación de conceptos complejos paso a paso]',
      '[PLACEHOLDER - Modo gratuito accesible sin tarjeta de crédito]'
    ],
    articleUrl: 'articulos/chatgpt-gratis-estudiantes.html',
    affiliateUrl: 'https://chat.openai.com',
    featured: true
  },
  {
    id: 'canva-educacion',
    name: 'Canva Magic Studio',
    initials: 'CNV',
    tagline: 'Suite de diseño visual con IA para presentaciones de clase y material didáctico',
    category: 'diseno',
    categoryLabel: 'IA para Diseño',
    audience: 'profesores',
    audienceLabel: 'Para Profesores',
    pricing: '100% Gratis para Docentes',
    rating: 4.9,
    ratingCount: 245,
    description: '[PLACEHOLDER - Resumen de la herramienta: Canva ofrece herramientas de generación de imágenes, redacción mágica y diseño automático de diapositivas con acceso gratuito verificado para profesores y centros educativos acreditados.]',
    features: [
      '[PLACEHOLDER - Generación de diapositivas e infografías con IA]',
      '[PLACEHOLDER - Eliminación de fondos y retoque fotográfico rápido]',
      '[PLACEHOLDER - Licencia educativa gratuita con acreditación escolar]'
    ],
    articleUrl: 'articulos/canva-ia-profesores.html',
    affiliateUrl: 'https://www.canva.com/education/',
    featured: true
  },
  {
    id: 'notion-ia-educativa',
    name: 'Notion IA para Educación',
    initials: 'NTN',
    tagline: 'Espacio de trabajo modular con asistente de IA para organizar apuntes y lecciones',
    category: 'productividad',
    categoryLabel: 'IA para Productividad',
    audience: 'ambos',
    audienceLabel: 'Profesores y Estudiantes',
    pricing: 'Plan Gratuito Disponible',
    rating: 4.7,
    ratingCount: 198,
    description: '[PLACEHOLDER - Resumen de la herramienta: Notion integra funciones de IA para extraer resúmenes de apuntes, generar listas de tareas y planificar unidades didácticas dentro de un sistema unificado con plan gratuito para cuentas .edu.]',
    features: [
      '[PLACEHOLDER - Resumen automático de notas de clase y lecturas]',
      '[PLACEHOLDER - Plantillas prediseñadas para cursos y semestres]',
      '[PLACEHOLDER - Organización colaborativa de asignaturas y proyectos]'
    ],
    articleUrl: 'articulos/notion-ia-productividad.html',
    affiliateUrl: 'https://www.notion.so/product/ai',
    featured: true
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOOLS_DATA;
}
