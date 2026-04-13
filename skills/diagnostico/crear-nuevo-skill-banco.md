# Skill 3 — Crear Nuevo Skill para el Banco

## Metadatos

| Campo | Valor |
|-------|-------|
| **ID** | AAID-SK-003 |
| **Nombre** | Crear Nuevo Skill para el Banco |
| **Categoría** | Diagnóstico / Gestión del Sistema |
| **Fase AAID** | Transversal (todas las fases) |
| **Versión** | 1.0 |
| **Autor** | Oscar Murcia — Digital Pro Marketing & Service LLC |
| **Fecha** | 2026-04-07 |
| **Modelo recomendado** | claude-sonnet-4-6 |

---

## Descripción

Genera la documentación completa de un nuevo skill IA para incorporarlo al banco del sistema AAID. El skill resultante tendrá el mismo formato estándar que los demás skills del sistema (metadatos, descripción, prompt base, pasos, KPIs), garantizando consistencia y reusabilidad.

Se activa cuando:
- El Skill 2 (SK-002) detecta un gap en el banco actual
- El cliente identifica una necesidad específica no cubierta
- El consultor observa un patrón repetitivo de uso en sesiones

---

## Prompt Base

```
Eres un especialista en diseño instruccional y sistemas de gestión del conocimiento IA. Tu tarea es crear un nuevo skill documentado para el banco del sistema AAID de Cardali Group.

INFORMACIÓN DEL NUEVO SKILL:
- Nombre propuesto: [nombre descriptivo del skill]
- Necesidad que cubre: [problema o caso de uso que origina este skill]
- Departamento(s) objetivo: [uno o varios departamentos de Cardali]
- Nivel de usuario: [básico / intermedio / avanzado]
- Herramienta IA principal: [Claude / ChatGPT / otra herramienta]
- Contexto de uso: [cuándo y cómo se usaría este skill]
- Ejemplo de tarea que resuelve: [ejemplo concreto]

---

Genera la documentación completa del skill en español con este formato exacto:

## METADATOS
- ID: AAID-SK-[siguiente número disponible]
- Nombre: [nombre del skill]
- Categoría: [Diagnóstico / E-Learning / Panel / Operaciones / Comunicación / otro]
- Fase AAID: [indicar en qué fase(s) aplica]
- Versión: 1.0
- Fecha de creación: [fecha actual]
- Modelo recomendado: claude-sonnet-4-6

## DESCRIPCIÓN
Párrafo de 3-5 líneas explicando qué hace el skill, qué problema resuelve y cuándo usarlo.

## PROMPT BASE
Prompt listo para usar, con todas las variables marcadas entre corchetes [variable]. El prompt debe:
- Comenzar definiendo el rol del asistente
- Incluir la sección de datos de entrada del usuario
- Especificar el formato exacto de salida esperada
- Ser autoexplicativo para un usuario no técnico

## PASOS DE USO
Lista numerada de 4-6 pasos concretos para ejecutar el skill de principio a fin, incluyendo dónde guardar el resultado.

## KPI DE VALIDACIÓN
Tabla con 3-4 KPIs medibles para saber si el skill está funcionando correctamente.

## NOTAS ADICIONALES
Variaciones del skill, casos de uso alternativos o integraciones con otros skills AAID.
```

---

## Pasos de Uso

1. Identificar la necesidad y reunir el contexto del nuevo skill
2. Completar los campos de "INFORMACIÓN DEL NUEVO SKILL" en el prompt
3. Ejecutar el prompt en Claude
4. Revisar la documentación generada y ajustar el prompt base si es necesario
5. Asignar el ID secuencial correcto (consultar `config/banco-skills.md` para el último ID)
6. Guardar el archivo en la carpeta correspondiente: `skills/[categoria]/[nombre-kebab-case].md`
7. Actualizar `config/banco-skills.md` con la entrada del nuevo skill
8. Registrar en Google Sheets (pestaña: Banco de Skills)

---

## KPI de Validación del Skill

| KPI | Meta |
|-----|------|
| Skills creados por mes | ≥ 1 nuevo skill/mes durante los primeros 3 meses |
| Calidad del prompt generado | Utilizable sin modificaciones en ≥ 70% de los casos |
| Adopción del nuevo skill | Usado al menos 3 veces en el mes siguiente a su creación |
| Consistencia con el formato estándar | 5/5 secciones presentes y completas |
