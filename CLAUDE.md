# CLAUDE.md — Cardali AI Adoption Platform

## Contexto del Proyecto

**Proyecto:** AI Adoption & Integration Development (AAID)
**Cliente:** Cardali Group
**Consultor:** Oscar Murcia — Digital Pro Marketing & Service LLC
**Idioma del proyecto:** Español

---

## Metodología AAID

El proyecto sigue la metodología **AI Adoption & Integration Development (AAID)**, estructurada en fases progresivas:

1. **Diagnóstico** — Evaluar el nivel de madurez digital y disposición al cambio de la organización
2. **Estrategia** — Definir hoja de ruta de adopción de IA personalizada para Cardali Group
3. **Implementación** — Desarrollar herramientas y flujos de trabajo con IA
4. **Capacitación (e-Learning)** — Formación del equipo interno en herramientas y mindset IA
5. **Medición** — Seguimiento de KPIs de adopción, eficiencia y ROI

---

## Stack Tecnológico

- **Frontend:** HTML + CSS + JavaScript (vanilla, sin frameworks)
- **IA:** Claude API (Anthropic) — modelo `claude-sonnet-4-6` por defecto
- **Almacenamiento de datos:** Google Sheets (via Google Apps Script o API)
- **Despliegue:** Estático (archivos HTML directos o hosting simple)

---

## Estructura del Proyecto

```
cardali-ai-platform/
├── CLAUDE.md                  # Este archivo — contexto del proyecto
├── config/                    # Configuración global (API keys, constantes)
├── docs/
│   ├── sesiones/              # Notas y minutas de sesiones con Cardali
│   ├── reportes/              # Reportes generados para el cliente
│   └── proceso/               # Documentación de metodología y procesos
└── skills/
    ├── diagnostico/           # Herramienta de diagnóstico de madurez IA
    ├── elearning/             # Módulos de capacitación interactivos
    └── panel/                 # Panel de seguimiento y métricas AAID
```

---

## Convenciones de Desarrollo

- Todo el código y comentarios en **español**
- Los archivos HTML son autocontenidos cuando sea posible
- Usar la Claude API directamente desde el frontend con fetch (proteger API key en config)
- Los datos del cliente se gestionan en Google Sheets como base de datos ligera
- Nombrar archivos en `kebab-case`

---

## Roles en el Proyecto

| Rol | Responsable |
|-----|-------------|
| Consultor líder / arquitecto | Oscar Murcia (Digital Pro Marketing & Service LLC) |
| Cliente / stakeholder | Cardali Group |
| Asistente de desarrollo | Claude Code (Anthropic) |

---

## Notas Importantes

- Este proyecto es **confidencial** — no compartir datos del cliente fuera del entorno seguro
- Priorizar **simplicidad y usabilidad** sobre complejidad técnica
- Cada herramienta debe poder ser utilizada por usuarios no técnicos del equipo Cardali
- Documentar cada sesión de trabajo en `docs/sesiones/`
