# Banco de Skills AAID — Cardali Group
**Índice Maestro del Sistema**

> Documento de referencia central para todos los skills del programa AI Adoption & Integration Development.
> Actualizar cada vez que se cree, modifique o retire un skill del sistema.

**Última actualización:** 2026-04-07
**Total de skills activos:** 6
**Próximo ID disponible:** AAID-SK-007

---

## Tabla Maestra de Skills

| ID | Nombre | Categoría | Herramienta IA | Nivel | ROI Estimado | Ruta del Archivo |
|----|--------|-----------|----------------|-------|--------------|------------------|
| AAID-SK-001 | Análisis de Diagnóstico Completo | Diagnóstico | Claude API | Básico | Alto — elimina 2-3h de diagnóstico manual por empleado | `skills/diagnostico/analisis-diagnostico-completo.md` |
| AAID-SK-002 | Priorización de Skills por Perfil | Diagnóstico | Claude API | Básico | Medio — reduce 60% el tiempo de diseño de rutas de aprendizaje | `skills/diagnostico/priorizacion-skills-por-perfil.md` |
| AAID-SK-003 | Crear Nuevo Skill para el Banco | Diagnóstico / Gestión | Claude API | Intermedio | Alto — escala el sistema sin costo adicional de consultoría | `skills/diagnostico/crear-nuevo-skill-banco.md` |
| AAID-SK-004 | Convertir Skill en Módulo de Aprendizaje | E-Learning | Claude API | Intermedio | Alto — multiplica capacidad de capacitación sin aumentar horas consultor | `skills/elearning/convertir-skill-modulo-aprendizaje.md` |
| AAID-SK-005 | Reporte Semanal de Adopción | Panel / Medición | Claude API | Básico | Medio — reduce 80% el tiempo de generación de reportes al cliente | `skills/panel/reporte-semanal-adopcion.md` |
| AAID-SK-006 | Check-in de Seguimiento Semanal | Panel / Medición | Claude API | Básico | Alto — detecta bloqueos temprano, aumenta retención del programa | `skills/panel/checkin-seguimiento-semanal.md` |

---

## Leyenda de Niveles y ROI

### Niveles de usuario
| Nivel | Descripción |
|-------|-------------|
| **Básico** | No requiere experiencia previa con IA. Instrucciones paso a paso. |
| **Intermedio** | Requiere haber completado al menos 2 skills básicos del programa. |
| **Avanzado** | Requiere dominio de los fundamentos IA y contexto profundo del proyecto. |

### Escala de ROI Estimado
| Nivel | Criterio |
|-------|----------|
| **Alto** | Ahorra ≥ 2 horas/semana o tiene impacto directo en decisiones del cliente |
| **Medio** | Ahorra entre 30 min y 2 horas/semana o mejora la calidad del entregable |
| **Bajo** | Ahorra < 30 min/semana pero aporta valor en consistencia o escalabilidad |

---

## Mapa de Dependencias entre Skills

```
SK-001 (Diagnóstico completo)
    └── SK-002 (Priorización de skills)
            └── SK-003 (Crear nuevo skill) ← se activa si hay gaps
                        └── SK-004 (Convertir skill en módulo)

SK-001 + SK-002 → alimentan →
    SK-006 (Check-in semanal)
        └── SK-005 (Reporte semanal) ← consolida todos los check-ins
```

**Regla:** Ejecutar SK-001 antes que cualquier otro skill para un empleado nuevo.

---

## Cómo Agregar Nuevos Skills al Banco

### Proceso estándar (usar SK-003 como apoyo)

**Paso 1 — Identificar la necesidad**
Antes de crear un skill, verificar que:
- [ ] No existe un skill activo que cubra esa necesidad (revisar esta tabla)
- [ ] La necesidad se ha presentado al menos 2 veces en sesiones reales
- [ ] El caso de uso aplica a ≥ 2 empleados de Cardali (no es un one-off)

**Paso 2 — Generar la documentación**
Usar el skill SK-003 con el prompt base para generar la documentación completa del nuevo skill. El documento resultante debe tener las siguientes secciones obligatorias:
- Metadatos (ID, nombre, categoría, fase, versión, fecha, modelo)
- Descripción
- Prompt base
- Pasos de uso
- KPI de validación

**Paso 3 — Asignar el ID**
- Consultar el campo "Próximo ID disponible" en el encabezado de este archivo
- Asignar el número secuencial: `AAID-SK-00X`
- Actualizar el contador en este archivo después de crearlo

**Paso 4 — Guardar el archivo**
Ubicar el archivo en la carpeta correspondiente según la categoría:
| Categoría | Carpeta |
|-----------|---------|
| Diagnóstico | `skills/diagnostico/` |
| E-Learning | `skills/elearning/` |
| Panel / Medición | `skills/panel/` |
| Operaciones | `skills/operaciones/` *(crear si no existe)* |
| Comunicación | `skills/comunicacion/` *(crear si no existe)* |

Nombre del archivo: `[nombre-del-skill-en-kebab-case].md`

**Paso 5 — Actualizar este índice**
- Agregar la nueva fila en la Tabla Maestra de Skills
- Actualizar el campo "Total de skills activos"
- Actualizar el campo "Próximo ID disponible"
- Actualizar el campo "Última actualización"
- Actualizar el Mapa de Dependencias si el skill depende de o activa otros skills

**Paso 6 — Registrar en Google Sheets**
Agregar una fila en la pestaña **Banco de Skills** con:
- ID, nombre, categoría, fecha de creación, estado (Activo / Borrador / Archivado)

---

## Skills Pendientes por Crear

Lista de necesidades identificadas que aún no tienen skill documentado. Priorizadas por urgencia.

### Prioridad Alta

| # | Nombre Propuesto | Necesidad que Cubre | Departamento Objetivo | Estado |
|---|-----------------|--------------------|-----------------------|--------|
| P-001 | Redacción de Correos y Comunicados con IA | Empleados dedican exceso de tiempo a redacción formal | Todos | Pendiente |
| P-002 | Resumen y Análisis de Documentos Largos | Contratos, reportes y manuales se leen manualmente | Operaciones / Legal | Pendiente |
| P-003 | Generación de Presentaciones con IA | Preparación de presentaciones toma 3-5h por evento | Gerencia / Ventas | Pendiente |

### Prioridad Media

| # | Nombre Propuesto | Necesidad que Cubre | Departamento Objetivo | Estado |
|---|-----------------|--------------------|-----------------------|--------|
| P-004 | Análisis de Datos con IA (Google Sheets) | Interpretación manual de datos sin insights automáticos | Finanzas / Operaciones | Pendiente |
| P-005 | Atención a Clientes Asistida por IA | Respuestas a consultas frecuentes toman mucho tiempo | Servicio al Cliente | Pendiente |
| P-006 | Generación de Contenido para Redes Sociales | Creación de contenido requiere muchas horas semanales | Marketing | Pendiente |

### Prioridad Baja (Fase 2 del programa)

| # | Nombre Propuesto | Necesidad que Cubre | Departamento Objetivo | Estado |
|---|-----------------|--------------------|-----------------------|--------|
| P-007 | Automatización de Tareas Repetitivas con IA | Tareas manuales y repetitivas de bajo valor | Administración | Pendiente |
| P-008 | Evaluación de Desempeño Asistida por IA | Proceso de evaluación anual lento y subjetivo | RRHH | Pendiente |
| P-009 | Investigación de Mercado con IA | Análisis competitivo manual y esporádico | Estrategia / Ventas | Pendiente |

---

## Historial de Cambios

| Fecha | Acción | Descripción | Autor |
|-------|--------|-------------|-------|
| 2026-04-07 | Creación | Banco inicial con 6 skills fundacionales del sistema AAID | Oscar Murcia |

---

*Para crear un nuevo skill, usar **AAID-SK-003 — Crear Nuevo Skill para el Banco** y seguir el proceso descrito en este documento.*
