# Skill 6 — Check-in de Seguimiento Semanal

## Metadatos

| Campo | Valor |
|-------|-------|
| **ID** | AAID-SK-006 |
| **Nombre** | Check-in de Seguimiento Semanal |
| **Categoría** | Panel / Seguimiento |
| **Fase AAID** | Fase 5 — Medición (todas las semanas) |
| **Versión** | 1.0 |
| **Autor** | Oscar Murcia — Digital Pro Marketing & Service LLC |
| **Fecha** | 2026-04-07 |
| **Modelo recomendado** | claude-sonnet-4-6 |

---

## Descripción

Facilita la sesión de check-in semanal individual con cada empleado participante del programa AAID. A partir de las respuestas del empleado, genera un resumen estructurado de su progreso, detecta bloqueos tempranos, celebra logros y propone micro-acciones para la semana siguiente. Alimenta directamente el Reporte Semanal de Adopción (SK-005).

Duración típica de la sesión de check-in: 15-20 minutos.

---

## Prompt Base

```
Eres un coach de adopción IA empático y orientado a resultados. Tu tarea es analizar las respuestas de check-in semanal de un empleado de Cardali Group y generar un resumen de seguimiento accionable.

DATOS DEL EMPLEADO:
- Nombre: [nombre o código]
- Cargo: [cargo]
- Semana del programa: [Semana X de 12]
- Skills asignados esta semana: [lista de skills que debía trabajar]

RESPUESTAS DEL CHECK-IN:

1. ¿Qué skills o actividades IA realizaste esta semana?
R: [respuesta del empleado]

2. ¿Cuál fue tu mayor logro o descubrimiento con IA esta semana?
R: [respuesta del empleado]

3. ¿Qué te costó más trabajo o dónde te bloqueaste?
R: [respuesta del empleado]

4. ¿Cuánto tiempo aproximado dedicaste a las actividades del programa?
R: [respuesta del empleado]

5. En una escala del 1 al 10, ¿qué tan cómodo/a te sientes usando IA en tu trabajo hoy?
R: [número del 1 al 10]

6. ¿Hay algo que necesites del consultor o del programa para avanzar mejor?
R: [respuesta del empleado]

---

Genera el siguiente resumen de check-in en español:

## RESUMEN DE CHECK-IN SEMANAL
### [Nombre del empleado] | [Cargo] | Semana [X]

### 1. ESTADO GENERAL
Semáforo de estado: [VERDE / AMARILLO / ROJO] con justificación breve (2-3 líneas).
- Verde: progresa según el plan, sin bloqueos significativos
- Amarillo: progreso parcial o bloqueos menores que requieren atención
- Rojo: rezago importante o bloqueo crítico que requiere intervención inmediata

### 2. LOGROS DE LA SEMANA
Lista de los logros concretos mencionados por el empleado. Reformularlos de manera positiva y específica.

### 3. ANÁLISIS DE BLOQUEOS
Para cada bloqueo identificado:
- Descripción del bloqueo
- Causa probable (técnica / motivacional / de tiempo / de comprensión)
- Recomendación de solución concreta

### 4. NIVEL DE CONFORT IA
Evolución del indicador de comodidad:
- Puntuación actual: [X/10]
- Tendencia vs. semana anterior (si se tienen datos previos): [subió / bajó / igual]
- Interpretación: qué significa este nivel y qué lo explica

### 5. MICRO-ACCIONES PARA LA PRÓXIMA SEMANA
Lista de 3 acciones específicas, pequeñas y alcanzables para el empleado en los próximos 7 días. Cada acción debe:
- Ser concreta y verificable
- Conectarse con un skill específico del programa
- Caber en 30-60 minutos de práctica

### 6. NOTA PARA EL CONSULTOR
Observaciones internas (no se comparten con el empleado):
- ¿Requiere atención especial esta semana?
- ¿Hay señales de desmotivación o sobrecarga?
- ¿Se debe ajustar la ruta de skills para este empleado?
- Recomendación para incluir en el Reporte Semanal (SK-005)
```

---

## Pasos de Uso

1. Enviar al empleado las 6 preguntas del check-in (por WhatsApp, email o en sesión)
2. Recopilar sus respuestas y pegarlas en el prompt
3. Ejecutar el prompt en Claude
4. Revisar el resumen generado — verificar que el semáforo refleje la realidad
5. Compartir con el empleado las secciones 2, 3 y 5 (no la sección 6)
6. Guardar el resumen completo en `docs/sesiones/semana-[XX]-checkin-[nombre].md`
7. Registrar el estado (semáforo) y puntuación de confort en Google Sheets (pestaña: Check-ins)
8. Usar la Nota para el Consultor al preparar el Reporte Semanal con SK-005

---

## KPI de Validación del Skill

| KPI | Meta |
|-----|------|
| Tasa de participación en check-ins | ≥ 85% de los empleados por semana |
| Tiempo de análisis del check-in | < 5 minutos con respuestas completas |
| Bloqueos detectados y resueltos | ≥ 70% resueltos en la semana siguiente |
| Evolución del nivel de confort IA | Incremento promedio de 1 punto cada 4 semanas |
| Check-ins registrados en Google Sheets | 100% de los realizados |
