/**
 * ============================================================
 * CARDALI GROUP — AAID Platform
 * Google Apps Script — Receptor de Diagnósticos IA
 * ============================================================
 * Versión:  1.0
 * Autor:    Oscar Murcia — Digital Pro Marketing & Service LLC
 * Proyecto: AI Adoption & Integration Development (AAID)
 * Fecha:    2026-04-12
 *
 * DESCRIPCIÓN:
 * Recibe los datos del formulario de diagnóstico (diagnostico-ai-cardali.html)
 * vía HTTP POST y los distribuye en 6 hojas del Google Sheet:
 *
 *   1. Diagnósticos       → Resumen principal (1 fila por empleado)
 *   2. Funciones          → Funciones principales del empleado
 *   3. Procesos           → Procesos operativos detallados
 *   4. Dolores            → Fricciones y cuellos de botella
 *   5. Oportunidades      → Top 3 oportunidades IA generadas por Claude
 *   6. Ruta12Semanas      → Plan de implementación semana a semana
 *
 * ============================================================
 * INSTRUCCIONES DE INSTALACIÓN — PASO A PASO
 * ============================================================
 *
 * PASO 1 — Crear el Google Sheet
 * ─────────────────────────────────────────────────────────
 *  1. Ve a https://sheets.google.com
 *  2. Crea un nuevo spreadsheet
 *  3. Renómbralo: "AAID — Diagnósticos Cardali Group"
 *  4. NO necesitas crear las hojas manualmente — el script
 *     las crea automáticamente la primera vez que recibe datos.
 *
 * PASO 2 — Abrir el editor de Apps Script
 * ─────────────────────────────────────────────────────────
 *  1. En tu Google Sheet, ve al menú: Extensiones → Apps Script
 *  2. Se abrirá el editor en una nueva pestaña
 *  3. Borra todo el contenido que aparece por defecto
 *     (la función vacía "myFunction")
 *  4. Pega TODO el contenido de este archivo
 *  5. Haz clic en el ícono de guardar (💾) o Ctrl+S
 *  6. Ponle nombre al proyecto: "AAID Receptor Diagnósticos"
 *
 * PASO 3 — Ejecutar la configuración inicial
 * ─────────────────────────────────────────────────────────
 *  1. En el menú desplegable de funciones (arriba, junto al
 *     botón ▶ Ejecutar), selecciona: "configurarHojas"
 *  2. Haz clic en ▶ Ejecutar
 *  3. Google te pedirá permisos — acéptalos todos:
 *     - "Ver y administrar tus hojas de cálculo"
 *     - Cualquier otro permiso que solicite
 *  4. Verifica en tu Sheet que se crearon las 6 hojas
 *     con sus encabezados
 *
 * PASO 4 — Publicar como Web App
 * ─────────────────────────────────────────────────────────
 *  1. En el editor de Apps Script, haz clic en:
 *     "Implementar" → "Nueva implementación"
 *  2. Haz clic en el ícono de engranaje ⚙ junto a "Tipo"
 *     y selecciona: "Aplicación web"
 *  3. Configura así:
 *     - Descripción: "AAID Receptor Diagnósticos v1"
 *     - Ejecutar como: "Yo (tu@email.com)"
 *     - Quién tiene acceso: "Cualquier persona"
 *  4. Haz clic en "Implementar"
 *  5. Copia la URL que aparece — se ve así:
 *     https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
 *  6. GUARDA esta URL, la necesitas en el siguiente paso.
 *
 * PASO 5 — Conectar el formulario HTML
 * ─────────────────────────────────────────────────────────
 *  1. Abre el archivo: diagnostico-ai-cardali.html
 *  2. Busca esta línea cerca del inicio del <script>:
 *
 *       const SHEETS_SCRIPT_URL = '';
 *
 *  3. Pega tu URL entre las comillas:
 *
 *       const SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/TU_ID/exec';
 *
 *  4. Guarda el archivo HTML
 *
 * PASO 6 — Probar la integración
 * ─────────────────────────────────────────────────────────
 *  1. Abre el formulario HTML en el navegador
 *  2. Completa un diagnóstico de prueba y espera el análisis
 *  3. Verifica en tu Google Sheet que aparecieron los datos
 *  4. Si ves el mensaje "✓ Guardado en Sheets" en el formulario,
 *     todo funciona correctamente.
 *
 * PASO 7 — Actualizaciones futuras del script
 * ─────────────────────────────────────────────────────────
 *  Si necesitas actualizar el script después de publicarlo:
 *  1. Modifica el código en el editor
 *  2. Ve a "Implementar" → "Gestionar implementaciones"
 *  3. Haz clic en el ícono de edición (lápiz)
 *  4. En "Versión" selecciona "Nueva versión"
 *  5. Haz clic en "Implementar"
 *  La URL permanece igual — no necesitas actualizar el HTML.
 *
 * ============================================================
 * SOLUCIÓN DE PROBLEMAS COMUNES
 * ============================================================
 *
 *  Error "Script has not been deployed as a web app"
 *  → Asegúrate de completar el Paso 4 antes de probar.
 *
 *  Error CORS en el navegador
 *  → Verifica que "Quién tiene acceso" sea "Cualquier persona"
 *    (no "Cualquier persona con cuenta de Google").
 *
 *  Los datos llegan pero las hojas no existen
 *  → Ejecuta la función "configurarHojas" manualmente (Paso 3).
 *
 *  El formulario muestra "Error al guardar en Sheets"
 *  → Abre la consola del navegador (F12) y busca el error.
 *  → Verifica que SHEETS_SCRIPT_URL esté correctamente pegada.
 *
 * ============================================================
 */


// ─────────────────────────────────────────────────────────────
// NOMBRES DE LAS HOJAS
// ─────────────────────────────────────────────────────────────
const HOJAS = {
  DIAGNOSTICOS:  'Diagnósticos',
  FUNCIONES:     'Funciones',
  PROCESOS:      'Procesos',
  DOLORES:       'Dolores',
  OPORTUNIDADES: 'Oportunidades',
  RUTA:          'Ruta12Semanas'
};

// ─────────────────────────────────────────────────────────────
// ENCABEZADOS DE CADA HOJA
// ─────────────────────────────────────────────────────────────
const ENCABEZADOS = {
  DIAGNOSTICOS: [
    'ID Diagnóstico',
    'Fecha y Hora',
    'Nombre',
    'Cargo',
    'Departamento',
    'Antigüedad',
    'Nivel IA (0-4)',
    'Nivel IA Descripción',
    'POA Score (0-100)',
    'Nivel Madurez',
    'Descripción Madurez',
    'Resumen Ejecutivo'
  ],
  FUNCIONES: [
    'ID Diagnóstico',
    'Nombre Empleado',
    'N° Función',
    'Descripción',
    'Frecuencia',
    'Horas por Semana'
  ],
  PROCESOS: [
    'ID Diagnóstico',
    'Nombre Empleado',
    'N° Proceso',
    'Nombre del Proceso',
    'Pasos',
    'Entregable Final',
    'Herramientas Actuales',
    'Tiempo de Ejecución (h)'
  ],
  DOLORES: [
    'ID Diagnóstico',
    'Nombre Empleado',
    'N° Dolor',
    'Tipo',
    'Descripción',
    'Impacto'
  ],
  OPORTUNIDADES: [
    'ID Diagnóstico',
    'Nombre Empleado',
    'N° Oportunidad',
    'Título',
    'Proceso que Optimiza',
    'Herramienta IA',
    'Impacto',
    'Dificultad',
    'Descripción',
    'Ahorro Estimado'
  ],
  RUTA: [
    'ID Diagnóstico',
    'Nombre Empleado',
    'Semana',
    'Bloque',
    'Actividad Principal',
    'Herramienta',
    'Entregable'
  ]
};


// ─────────────────────────────────────────────────────────────
// PUNTO DE ENTRADA — Recibe el POST del formulario HTML
// ─────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    // Parsear el body JSON enviado por el formulario
    const payload = JSON.parse(e.postData.contents);

    // Validar que los campos mínimos estén presentes
    if (!payload.empleado || !payload.empleado.nombre) {
      return respuestaError('Payload inválido: falta el campo "empleado.nombre"');
    }

    // Obtener o crear las hojas necesarias
    configurarHojas();

    // Generar ID único para este diagnóstico
    const idDiagnostico = generarId(payload.empleado.nombre);
    const fechaHora     = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

    const { empleado, funciones, procesos, dolores, analisis } = payload;

    // ── 1. Hoja Diagnósticos ──────────────────────────────────
    agregarFila(HOJAS.DIAGNOSTICOS, [
      idDiagnostico,
      fechaHora,
      empleado.nombre            || '',
      empleado.cargo             || '',
      empleado.departamento      || '',
      empleado.antiguedad        || '',
      empleado.nivelAI           || '',
      empleado.nivelAILabel      || '',
      analisis.poa_score         || '',
      analisis.nivel_madurez     || '',
      analisis.poa_descripcion   || '',
      analisis.resumen_ejecutivo || ''
    ]);

    // ── 2. Hoja Funciones ─────────────────────────────────────
    (funciones || []).forEach(function(f, i) {
      agregarFila(HOJAS.FUNCIONES, [
        idDiagnostico,
        empleado.nombre,
        i + 1,
        f.descripcion || '',
        f.frecuencia  || '',
        f.horas       || ''
      ]);
    });

    // ── 3. Hoja Procesos ──────────────────────────────────────
    (procesos || []).forEach(function(p, i) {
      agregarFila(HOJAS.PROCESOS, [
        idDiagnostico,
        empleado.nombre,
        i + 1,
        p.nombre       || '',
        p.pasos        || '',
        p.entregable   || '',
        p.herramientas || '',
        p.tiempo       || ''
      ]);
    });

    // ── 4. Hoja Dolores ───────────────────────────────────────
    (dolores || []).forEach(function(d, i) {
      agregarFila(HOJAS.DOLORES, [
        idDiagnostico,
        empleado.nombre,
        i + 1,
        d.tipo        || '',
        d.descripcion || '',
        d.impacto     || ''
      ]);
    });

    // ── 5. Hoja Oportunidades ─────────────────────────────────
    (analisis.oportunidades || []).forEach(function(op, i) {
      agregarFila(HOJAS.OPORTUNIDADES, [
        idDiagnostico,
        empleado.nombre,
        i + 1,
        op.titulo           || '',
        op.proceso          || '',
        op.herramienta      || '',
        op.impacto          || '',
        op.dificultad       || '',
        op.descripcion      || '',
        op.ahorro_estimado  || ''
      ]);
    });

    // ── 6. Hoja Ruta 12 Semanas ───────────────────────────────
    (analisis.ruta_12_semanas || []).forEach(function(s) {
      agregarFila(HOJAS.RUTA, [
        idDiagnostico,
        empleado.nombre,
        s.semana      || '',
        s.bloque      || '',
        s.actividad   || '',
        s.herramienta || '',
        s.entregable  || ''
      ]);
    });

    // Responder con éxito al formulario
    return respuestaExito({
      mensaje:        'Diagnóstico guardado correctamente',
      id_diagnostico: idDiagnostico,
      fecha:          fechaHora
    });

  } catch (err) {
    return respuestaError('Error interno: ' + err.message);
  }
}


// ─────────────────────────────────────────────────────────────
// CONFIGURAR HOJAS — Crea las hojas y encabezados si no existen
// Ejecutar manualmente una vez antes del primer uso (Paso 3)
// ─────────────────────────────────────────────────────────────
function configurarHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(HOJAS).forEach(function(clave) {
    const nombreHoja  = HOJAS[clave];
    const encabezados = ENCABEZADOS[clave];

    let hoja = ss.getSheetByName(nombreHoja);

    // Crear la hoja si no existe
    if (!hoja) {
      hoja = ss.insertSheet(nombreHoja);
    }

    // Escribir encabezados solo si la hoja está vacía
    if (hoja.getLastRow() === 0) {
      hoja.appendRow(encabezados);
      formatearEncabezados(hoja, encabezados.length);
    }
  });
}


// ─────────────────────────────────────────────────────────────
// UTILIDADES INTERNAS
// ─────────────────────────────────────────────────────────────

/**
 * Agrega una fila de datos en la hoja indicada.
 */
function agregarFila(nombreHoja, fila) {
  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(nombreHoja);
  if (!hoja) {
    throw new Error('Hoja no encontrada: ' + nombreHoja + '. Ejecuta configurarHojas() primero.');
  }
  hoja.appendRow(fila);
}

/**
 * Genera un ID único para el diagnóstico.
 * Formato: DX-YYYYMMDD-HHMMSS-[iniciales]
 * Ejemplo: DX-20260412-143022-JG
 */
function generarId(nombreEmpleado) {
  const ahora      = new Date();
  const fecha      = Utilities.formatDate(ahora, 'America/Mexico_City', 'yyyyMMdd');
  const hora       = Utilities.formatDate(ahora, 'America/Mexico_City', 'HHmmss');
  const palabras   = (nombreEmpleado || 'XX').trim().split(' ');
  const iniciales  = palabras.map(function(p) { return p.charAt(0).toUpperCase(); }).slice(0, 2).join('');
  return 'DX-' + fecha + '-' + hora + '-' + iniciales;
}

/**
 * Aplica formato visual a la fila de encabezados de una hoja.
 */
function formatearEncabezados(hoja, numColumnas) {
  const rango = hoja.getRange(1, 1, 1, numColumnas);
  rango.setFontWeight('bold');
  rango.setBackground('#1e40af');
  rango.setFontColor('#ffffff');
  rango.setFontSize(11);
  hoja.setFrozenRows(1);
}

/**
 * Devuelve una respuesta JSON de éxito con cabeceras CORS.
 */
function respuestaExito(datos) {
  const output = ContentService
    .createTextOutput(JSON.stringify({ ok: true, datos: datos }))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Devuelve una respuesta JSON de error con cabeceras CORS.
 */
function respuestaError(mensaje) {
  const output = ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: mensaje }))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}


// ─────────────────────────────────────────────────────────────
// FUNCIÓN DE PRUEBA — Ejecutar desde el editor para verificar
// que todo funciona antes de publicar como Web App
// ─────────────────────────────────────────────────────────────
function probarScript() {
  const payloadSimulado = {
    empleado: {
      nombre:       'Juan García',
      cargo:        'Coordinador de Operaciones',
      departamento: 'Operaciones',
      antiguedad:   '3 años',
      nivelAI:      '1',
      nivelAILabel: 'Ha probado ocasionalmente'
    },
    funciones: [
      { descripcion: 'Elaborar reportes mensuales de desempeño', frecuencia: 'mensual',  horas: '4' },
      { descripcion: 'Coordinación de proveedores',              frecuencia: 'semanal',  horas: '6' }
    ],
    procesos: [
      {
        nombre:       'Cierre de nómina mensual',
        pasos:        'Paso 1: Recopilar asistencias\nPaso 2: Verificar horas extra\nPaso 3: Calcular deducciones',
        entregable:   'Archivo Excel con nómina completa',
        herramientas: 'Excel, sistema interno',
        tiempo:       '8'
      }
    ],
    dolores: [
      { tipo: 'Fuga de tiempo',    descripcion: 'Los reportes toman 4 horas cada mes',        impacto: 'alto' },
      { tipo: 'Cuello de botella', descripcion: 'Aprobaciones dependen solo del director',     impacto: 'medio' }
    ],
    analisis: {
      poa_score:         72,
      nivel_madurez:     'En desarrollo',
      poa_descripcion:   'Perfil con alta carga de tareas automatizables y disposición al cambio moderada.',
      resumen_ejecutivo: 'Juan tiene un perfil ideal para iniciar con herramientas de IA en tareas repetitivas.',
      oportunidades: [
        {
          titulo:          'Automatización de reportes mensuales',
          proceso:         'Cierre de nómina',
          herramienta:     'Claude',
          impacto:         'alto',
          dificultad:      'baja',
          descripcion:     'Usar Claude para redactar automáticamente el resumen narrativo del reporte.',
          ahorro_estimado: '3 horas por mes'
        },
        {
          titulo:          'Resumen de correos de proveedores',
          proceso:         'Coordinación de proveedores',
          herramienta:     'Claude',
          impacto:         'medio',
          dificultad:      'baja',
          descripcion:     'Resumir hilos de correo largos con proveedores en bullet points accionables.',
          ahorro_estimado: '2 horas por semana'
        },
        {
          titulo:          'Plantillas de comunicación interna',
          proceso:         'Reportes de desempeño',
          herramienta:     'Claude',
          impacto:         'medio',
          dificultad:      'baja',
          descripcion:     'Generar plantillas reutilizables para comunicados recurrentes del área.',
          ahorro_estimado: '1 hora por semana'
        }
      ],
      ruta_12_semanas: [
        { semana: 1,  bloque: 'Fundamentos',    actividad: 'Introducción a Claude y prompts básicos',      herramienta: 'Claude',   entregable: 'Primer reporte redactado con IA' },
        { semana: 2,  bloque: 'Fundamentos',    actividad: 'Prompts para resumir correos de proveedores',  herramienta: 'Claude',   entregable: '5 correos resumidos' },
        { semana: 3,  bloque: 'Fundamentos',    actividad: 'Creación de plantillas de comunicación',       herramienta: 'Claude',   entregable: '3 plantillas listas' },
        { semana: 4,  bloque: 'Fundamentos',    actividad: 'Revisión y ajuste de prompts aprendidos',      herramienta: 'Claude',   entregable: 'Biblioteca personal de prompts' },
        { semana: 5,  bloque: 'Práctica',       actividad: 'Automatizar reporte mensual completo',         herramienta: 'Claude',   entregable: 'Reporte de mayo generado con IA' },
        { semana: 6,  bloque: 'Práctica',       actividad: 'Análisis de datos de nómina con IA',           herramienta: 'Claude',   entregable: 'Análisis de tendencias salariales' },
        { semana: 7,  bloque: 'Práctica',       actividad: 'Coordinación de agenda con IA',                herramienta: 'Claude',   entregable: 'Template de agenda semanal' },
        { semana: 8,  bloque: 'Práctica',       actividad: 'Revisión de resultados del bloque',            herramienta: 'Claude',   entregable: 'Check-in de adopción completado' },
        { semana: 9,  bloque: 'Consolidación',  actividad: 'Flujo de trabajo IA integrado en nómina',      herramienta: 'Claude',   entregable: 'Proceso documentado' },
        { semana: 10, bloque: 'Consolidación',  actividad: 'Compartir mejores prácticas con el equipo',    herramienta: 'Claude',   entregable: 'Mini-taller interno de 30 min' },
        { semana: 11, bloque: 'Consolidación',  actividad: 'Medir ahorro de tiempo real vs. estimado',     herramienta: 'Sheets',   entregable: 'Dashboard de métricas actualizado' },
        { semana: 12, bloque: 'Consolidación',  actividad: 'Evaluación final y plan fase 2',               herramienta: 'Claude',   entregable: 'Reporte de adopción 12 semanas' }
      ]
    }
  };

  // Simular el objeto del evento POST
  const eventoSimulado = {
    postData: {
      contents: JSON.stringify(payloadSimulado)
    }
  };

  const resultado = doPost(eventoSimulado);
  Logger.log('Resultado: ' + resultado.getContent());
  Logger.log('✓ Prueba completada. Revisa tu Google Sheet.');
}
