# Skill 2 — Priorización de Skills por Perfil

## Metadatos

| Campo | Valor |
|-------|-------|
| **ID** | AAID-SK-002 |
| **Nombre** | Priorización de Skills por Perfil |
| **Categoría** | Diagnóstico |
| **Fase AAID** | Fase 1 — Diagnóstico / Fase 2 — Estrategia |
| **Versión** | 1.0 |
| **Autor** | Oscar Murcia — Digital Pro Marketing & Service LLC |
| **Fecha** | 2026-04-07 |
| **Modelo recomendado** | claude-sonnet-4-6 |

---

## Descripción

Dado el perfil de un empleado y el banco de skills IA disponibles en el sistema AAID, genera una lista priorizada de skills recomendados ordenados por:
- Relevancia para el cargo
- Impacto operativo esperado
- Facilidad de adopción según nivel del empleado
- Secuencia lógica de aprendizaje

Ideal para usarse después del Skill 1 (AAID-SK-001) o cuando se incorpora un nuevo empleado al programa.

---

## Prompt Base

```
Eres un experto en diseño de rutas de aprendizaje IA para equipos corporativos. Tu tarea es priorizar el banco de skills de IA disponibles para un perfil específico de empleado de Cardali Group.

PERFIL DEL EMPLEADO:
- Cargo: [cargo]
- Departamento: [departamento]
- Nivel tecnológico: [básico / intermedio / avanzado]
- Funciones clave: [funciones principales]
- Diagnóstico previo (si existe): [puntaje de madurez IA del SK-001, o N/A]

BANCO DE SKILLS DISPONIBLES:
[pegar aquí la lista de skills del banco, con ID y descripción breve de cada uno]

---

Genera el siguiente análisis en español:

## 1. MATRIZ DE PRIORIZACIÓN
Tabla con todos los skills evaluados en estas columnas:
| ID | Nombre del Skill | Relevancia (1-5) | Impacto (1-5) | Facilidad (1-5) | Puntaje Total | Prioridad |

Ordena por Puntaje Total descendente.

## 2. RUTA RECOMENDADA (TOP 5 SKILLS)
Para los 5 skills con mayor puntaje:
- Nombre del skill
- Por qué es prioritario para este perfil
- En qué semana de la ruta de 12 semanas debería iniciarse
- Prerequisito (skill que debe completarse antes, si aplica)

## 3. SKILLS A POSPONER
Lista de skills no recomendados en esta etapa con justificación breve.

## 4. RUTA VISUAL DE APRENDIZAJE
Describe la secuencia en formato de texto:
Semana 1-2 → [Skill A] → Semana 3-4 → [Skill B] → ... hasta semana 12

## 5. NOTA PARA EL CONSULTOR
Observaciones sobre gaps de skills no cubiertos por el banco actual y recomendación de crear nuevos skills (usar AAID-SK-003).
```

---

## Pasos de Uso

1. Completar el perfil del empleado en el prompt
2. Pegar el listado actualizado del banco de skills (disponible en `config/banco-skills.md`)
3. Ejecutar el prompt en Claude
4. Registrar la ruta priorizada en Google Sheets (pestaña: Rutas de Aprendizaje)
5. Compartir el resultado con el empleado y ajustar según su feedback
6. Actualizar `docs/sesiones/` con la sesión de priorización

---

## KPI de Validación del Skill

| KPI | Meta |
|-----|------|
| Skills relevantes identificados | ≥ 3 de los top 5 aceptados por el empleado |
| Tiempo de priorización | < 10 minutos |
| Cobertura del banco de skills | 100% de skills evaluados en la matriz |
| Uso de la ruta generada | El empleado completa al menos el 60% de los skills priorizados en 12 semanas |
