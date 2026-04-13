# Skill 5 — Reporte Semanal de Adopción

## Metadatos

| Campo | Valor |
|-------|-------|
| **ID** | AAID-SK-005 |
| **Nombre** | Reporte Semanal de Adopción |
| **Categoría** | Panel / Seguimiento |
| **Fase AAID** | Fase 5 — Medición |
| **Versión** | 1.0 |
| **Autor** | Oscar Murcia — Digital Pro Marketing & Service LLC |
| **Fecha** | 2026-04-07 |
| **Modelo recomendado** | claude-sonnet-4-6 |

---

## Descripción

Genera automáticamente el reporte semanal de adopción IA del programa AAID para Cardali Group. Consolida el progreso de todos los empleados participantes, identifica rezagos, celebra avances y emite recomendaciones para la semana siguiente. El reporte está diseñado para ser entregado directamente al cliente (Cardali Group) y al consultor.

---

## Prompt Base

```
Eres un analista de programas de adopción IA. Tu tarea es generar el reporte semanal de adopción del programa AAID para Cardali Group.

DATOS DE LA SEMANA:
- Número de semana del programa: [Semana X de 12]
- Período: [fecha inicio] al [fecha fin]
- Total de participantes activos: [número]

DATOS POR PARTICIPANTE (repetir para cada empleado):
---
Nombre: [nombre o código del empleado]
Cargo: [cargo]
Skills completados esta semana: [lista de skills completados]
Skills en progreso: [lista de skills iniciados]
Check-ins realizados: [número de check-ins de la semana]
Incidencias o bloqueos reportados: [descripción o N/A]
---

MÉTRICAS GLOBALES DE LA SEMANA:
- Total de skills completados: [número]
- Total de check-ins realizados: [número]
- Tasa de participación semanal: [%]
- Skills más utilizados: [lista]
- Skills menos utilizados: [lista]

---

Genera el reporte completo en español con esta estructura:

## REPORTE SEMANAL AAID — CARDALI GROUP
### Semana [X] | [Fecha inicio] – [Fecha fin]

### 1. RESUMEN EJECUTIVO
Párrafo de 3-5 líneas con los hallazgos más importantes de la semana para liderazgo de Cardali. Tono positivo pero honesto.

### 2. TABLERO DE PROGRESO GRUPAL
Tabla con todos los participantes:
| Empleado | Cargo | Skills completados | Progreso acumulado | Estado |
(Estado: En ritmo / Atención requerida / Destacado)

### 3. LOGROS DE LA SEMANA
Lista de los 3-5 avances más significativos del programa esta semana.

### 4. ALERTAS Y REZAGOS
Lista de participantes o áreas que requieren intervención, con causa probable y acción recomendada.

### 5. ANÁLISIS DE SKILLS
- Skills con mayor adopción: análisis breve de por qué están funcionando
- Skills con menor adopción: hipótesis y recomendación de ajuste

### 6. RECOMENDACIONES PARA LA SEMANA SIGUIENTE
Lista de 3-5 acciones concretas para el consultor y para el equipo Cardali.

### 7. MÉTRICAS CLAVE (SEMANA VS. META)
Tabla comparativa:
| Métrica | Meta semanal | Resultado | Variación |

### 8. PROYECCIÓN DE CIERRE (Semana 12)
Con base en el ritmo actual, proyección de: % de completación del programa, número de skills dominados por participante, nivel de madurez IA esperado al cierre.
```

---

## Pasos de Uso

1. Exportar los datos de la semana desde Google Sheets (pestaña: Seguimiento Semanal)
2. Completar todas las secciones de datos en el prompt
3. Ejecutar el prompt en Claude
4. Revisar el reporte generado — ajustar tonos o datos incorrectos
5. Guardar en `docs/reportes/semana-[XX]-reporte-adopcion.md`
6. Enviar al cliente (Cardali Group) en el formato acordado (PDF / email / Google Docs)
7. Archivar en Google Sheets con fecha de entrega

---

## KPI de Validación del Skill

| KPI | Meta |
|-----|------|
| Tiempo de generación del reporte | < 10 minutos con datos completos |
| Completitud del reporte | 8/8 secciones presentes |
| Puntualidad de entrega al cliente | Cada lunes antes de las 10am |
| Satisfacción del cliente con el reporte | ≥ 4/5 en encuesta mensual |
| Acciones tomadas por el cliente basadas en el reporte | ≥ 1 acción/semana |
