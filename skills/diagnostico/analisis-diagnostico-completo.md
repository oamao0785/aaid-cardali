# Skill 1 — Análisis de Diagnóstico Completo

## Metadatos

| Campo | Valor |
|-------|-------|
| **ID** | AAID-SK-001 |
| **Nombre** | Análisis de Diagnóstico Completo |
| **Categoría** | Diagnóstico |
| **Fase AAID** | Fase 1 — Diagnóstico |
| **Versión** | 1.0 |
| **Autor** | Oscar Murcia — Digital Pro Marketing & Service LLC |
| **Fecha** | 2026-04-07 |
| **Modelo recomendado** | claude-sonnet-4-6 |

---

## Descripción

Analiza el perfil completo de un empleado de Cardali Group — cargo, funciones, procesos diarios y dolores operativos — para generar un diagnóstico estructurado que incluye:
- **POA** (Plan Operativo de Adopción IA personalizado)
- **Top 3 oportunidades de IA** priorizadas por impacto y viabilidad
- **Ruta de 12 semanas** de implementación progresiva

---

## Prompt Base

```
Eres un consultor experto en adopción de inteligencia artificial para empresas. Tu tarea es realizar un diagnóstico completo de adopción IA para un empleado de Cardali Group.

Con base en la siguiente información del empleado:

CARGO: [cargo del empleado]
DEPARTAMENTO: [área o departamento]
FUNCIONES PRINCIPALES:
[lista de funciones principales, una por línea]

PROCESOS DIARIOS:
[descripción de los procesos que realiza cotidianamente]

DOLORES Y FRICCIONES ACTUALES:
[problemas, cuellos de botella, tareas repetitivas o frustraciones]

NIVEL DE DOMINIO TECNOLÓGICO: [básico / intermedio / avanzado]
HERRAMIENTAS QUE USA HOY: [lista de herramientas actuales]

---

Genera el siguiente análisis estructurado en español:

## 1. DIAGNÓSTICO DE MADUREZ IA
Evalúa el perfil en una escala del 1 al 5 en estas dimensiones:
- Alfabetización digital
- Exposición previa a IA
- Carga de tareas automatizables
- Disposición al cambio
Incluye un puntaje global y nivel: [Inicial / En desarrollo / Intermedio / Avanzado / Líder]

## 2. TOP 3 OPORTUNIDADES DE IA
Para cada oportunidad incluye:
- Nombre de la oportunidad
- Proceso que optimiza
- Herramienta IA recomendada
- Impacto estimado (alto/medio/bajo)
- Dificultad de implementación (alta/media/baja)
- Ejemplo concreto de uso en su rol

## 3. PLAN OPERATIVO DE ADOPCIÓN (POA)
Documento estructurado con:
- Objetivo general de adopción para este perfil
- 3 objetivos específicos medibles
- Recursos necesarios
- Riesgos anticipados y mitigaciones

## 4. RUTA DE 12 SEMANAS
Divide en 3 bloques de 4 semanas:
- Semanas 1-4: Fundamentos y sensibilización
- Semanas 5-8: Práctica y primeras implementaciones
- Semanas 9-12: Consolidación y medición de resultados
Para cada semana: actividad principal, herramienta a usar, entregable esperado.

## 5. MÉTRICAS DE ÉXITO
Define 3 KPIs concretos y medibles para evaluar la adopción IA de este perfil al cabo de 12 semanas.
```

---

## Pasos de Uso

1. Completar la sección de datos del empleado en el prompt (reemplazar los corchetes)
2. Pegar el prompt completo en Claude (claude.ai o via API)
3. Revisar y validar el diagnóstico con el empleado en sesión de 30 min
4. Guardar el resultado en `docs/sesiones/YYYY-MM-DD-diagnostico-[nombre].md`
5. Registrar los KPIs baseline en Google Sheets (pestaña: Diagnósticos)

---

## KPI de Validación del Skill

| KPI | Meta |
|-----|------|
| Tiempo de generación del diagnóstico | < 5 minutos |
| Aceptación del POA por el empleado | ≥ 80% de acuerdo |
| Oportunidades implementadas al mes 3 | ≥ 1 de las 3 |
| Completitud del reporte generado | 5/5 secciones presentes |
