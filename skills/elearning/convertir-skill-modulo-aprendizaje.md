# Skill 4 — Convertir Skill en Módulo de Aprendizaje

## Metadatos

| Campo | Valor |
|-------|-------|
| **ID** | AAID-SK-004 |
| **Nombre** | Convertir Skill en Módulo de Aprendizaje |
| **Categoría** | E-Learning |
| **Fase AAID** | Fase 4 — Capacitación |
| **Versión** | 1.0 |
| **Autor** | Oscar Murcia — Digital Pro Marketing & Service LLC |
| **Fecha** | 2026-04-07 |
| **Modelo recomendado** | claude-sonnet-4-6 |

---

## Descripción

Transforma cualquier skill del banco AAID en un módulo de aprendizaje estructurado y autónomo. El módulo resultante puede ser entregado directamente al empleado para que lo complete de forma independiente, sin necesitar al consultor presente. Incluye teoría, práctica guiada, ejercicio real y evaluación.

Ideal para escalar la capacitación a múltiples empleados de forma simultánea o asincrónica.

---

## Prompt Base

```
Eres un diseñador instruccional especializado en e-learning corporativo y adopción de IA. Tu tarea es convertir un skill del sistema AAID en un módulo de aprendizaje completo, autónomo y práctico para un empleado de Cardali Group.

SKILL A CONVERTIR:
- ID del skill: [AAID-SK-XXX]
- Nombre del skill: [nombre del skill]
- Descripción del skill: [pegar la descripción del skill]
- Prompt base del skill: [pegar el prompt base]

PERFIL DEL APRENDIZ:
- Cargo: [cargo del empleado]
- Nivel tecnológico: [básico / intermedio / avanzado]
- Tiempo disponible estimado: [30 min / 1 hora / 2 horas]

---

Genera el módulo de aprendizaje completo en español con esta estructura:

## MÓDULO [número]: [NOMBRE DEL SKILL EN MAYÚSCULAS]

### Encabezado del Módulo
- Duración estimada: [X minutos]
- Nivel: [Básico / Intermedio / Avanzado]
- Prerequisitos: [módulos o conocimientos previos requeridos]
- Herramienta a usar: [nombre de la herramienta IA]

### 1. ¿QUÉ VAS A APRENDER?
Párrafo motivador de 3-4 líneas que explique el valor práctico de este skill para el empleado, usando lenguaje cercano y enfocado en su rol específico.

### 2. CONTEXTO: ¿POR QUÉ IMPORTA?
Explicación de 5-7 líneas del problema que resuelve este skill en el contexto laboral del empleado. Incluir un caso real o analogía relatable.

### 3. CONCEPTOS CLAVE
Lista de 3-5 conceptos fundamentales que el empleado debe entender antes de practicar. Cada concepto con nombre y explicación breve en lenguaje no técnico.

### 4. DEMOSTRACIÓN PASO A PASO
Tutorial detallado de cómo usar el skill, escrito como si estuvieras guiando al empleado en tiempo real:
Paso 1: [instrucción concreta]
Paso 2: [instrucción concreta]
... (todos los pasos necesarios)

### 5. EJERCICIO PRÁCTICO
Ejercicio concreto usando datos o situaciones reales del rol del empleado:
- Contexto del ejercicio: [situación específica]
- Instrucción: [qué debe hacer el empleado]
- Prompt de práctica: [prompt adaptado para el ejercicio]
- Resultado esperado: [cómo saber si lo hizo bien]

### 6. CHECKLIST DE VERIFICACIÓN
Lista de 5 ítems que el empleado puede marcar al terminar el módulo para confirmar que dominó el skill:
[ ] [ítem 1]
[ ] [ítem 2]
...

### 7. RECURSOS ADICIONALES
- Variaciones del skill para casos más avanzados
- Errores comunes y cómo evitarlos
- Cuándo NO usar este skill

### 8. EVALUACIÓN RÁPIDA (3 preguntas)
3 preguntas de opción múltiple con respuesta correcta indicada, para verificar comprensión.
```

---

## Pasos de Uso

1. Seleccionar el skill del banco a convertir (tener el archivo `.md` del skill a la mano)
2. Completar los datos del skill y del perfil del aprendiz en el prompt
3. Ejecutar el prompt en Claude
4. Revisar el módulo generado y ajustar ejemplos para que sean 100% relevantes al contexto Cardali
5. Guardar el módulo en `skills/elearning/modulos/[ID-skill]-modulo.md`
6. Registrar en Google Sheets (pestaña: Módulos E-Learning) con estado: Borrador / Revisado / Publicado
7. Compartir con el empleado y recoger feedback post-módulo

---

## KPI de Validación del Skill

| KPI | Meta |
|-----|------|
| Tiempo de creación del módulo | < 15 minutos |
| Completitud del módulo | 8/8 secciones presentes |
| Tasa de completación por aprendices | ≥ 75% completa el módulo de forma autónoma |
| Puntuación en evaluación rápida | Promedio ≥ 2/3 respuestas correctas |
| Aplicación del skill post-módulo | ≥ 70% lo usa en su trabajo dentro de 2 semanas |
