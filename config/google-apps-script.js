/**
 * ============================================================
 * CARDALI GROUP — AAID Platform
 * Google Apps Script — Proxy Claude + Receptor de Diagnósticos
 * ============================================================
 * Versión:  2.0
 * Autor:    Oscar Murcia — Digital Pro Marketing & Service LLC
 * Proyecto: AI Adoption & Integration Development (AAID)
 * Fecha:    2026-04-12
 *
 * DESCRIPCIÓN:
 * Este script hace DOS cosas desde una sola URL:
 *   1. PROXY de Claude API → los usuarios NO necesitan API key propia
 *   2. GUARDAR diagnósticos en Google Sheets automáticamente
 *
 * El formulario HTML llama a este script. El script tiene tu
 * API key guardada de forma segura en Propiedades del Script.
 *
 * ============================================================
 * INSTALACIÓN — PASO A PASO (5 minutos)
 * ============================================================
 *
 * PASO 1 — Crear el Google Sheet
 * ─────────────────────────────────────────────────────────
 *  1. Ve a https://sheets.google.com
 *  2. Crea un nuevo spreadsheet
 *  3. Renómbralo: "AAID — Diagnósticos Cardali Group"
 *
 * PASO 2 — Abrir Apps Script
 * ─────────────────────────────────────────────────────────
 *  1. En el Sheet: Extensiones → Apps Script
 *  2. Borra todo el contenido por defecto
 *  3. Pega TODO el contenido de este archivo
 *  4. Guarda (Ctrl+S) — nombre del proyecto: "AAID Proxy"
 *
 * PASO 3 — Guardar tu API key de Anthropic (UNA SOLA VEZ)
 * ─────────────────────────────────────────────────────────
 *  1. En el editor de Apps Script: Proyecto → Propiedades del proyecto
 *     (ícono de engranaje ⚙ en el panel izquierdo → "Propiedades del script")
 *  2. Haz clic en "Agregar propiedad"
 *  3. Nombre:  ANTHROPIC_API_KEY
 *     Valor:   sk-ant-api03-XXXXXXXXXXXX  ← tu clave real de Anthropic
 *  4. Haz clic en "Guardar propiedades del script"
 *  Tu API key queda guardada de forma segura. Nunca aparece en el código.
 *
 * PASO 4 — Inicializar las hojas
 * ─────────────────────────────────────────────────────────
 *  1. En el menú de funciones (arriba) selecciona: "configurarHojas"
 *  2. Haz clic en ▶ Ejecutar
 *  3. Acepta los permisos que solicite Google
 *  4. Verifica que se crearon 6 hojas en tu Sheet
 *
 * PASO 5 — Publicar como Web App
 * ─────────────────────────────────────────────────────────
 *  1. Clic en "Implementar" → "Nueva implementación"
 *  2. Clic en ⚙ junto a "Tipo" → selecciona "Aplicación web"
 *  3. Configurar así:
 *       Ejecutar como:       Yo (tu@email.com)
 *       Quién tiene acceso:  Cualquier persona
 *  4. Clic en "Implementar"
 *  5. COPIA la URL — se ve así:
 *     https://script.google.com/macros/s/XXXXXXXX/exec
 *
 * PASO 6 — Pegar la URL en el HTML
 * ─────────────────────────────────────────────────────────
 *  1. Abre diagnostico-ai-cardali.html
 *  2. Busca esta línea cerca del inicio del <script>:
 *       const APPS_SCRIPT_URL = '';
 *  3. Pega tu URL:
 *       const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/TU_ID/exec';
 *  4. Guarda y sube a GitHub:
 *       git add index.html diagnostico-ai-cardali.html
 *       git commit -m "Conectar proxy Apps Script"
 *       git push
 *
 * ¡Listo! Los usuarios abren la URL y usan el formulario sin API key.
 *
 * ============================================================
 * ACTUALIZAR EL SCRIPT EN EL FUTURO
 * ============================================================
 *  1. Modifica el código en el editor
 *  2. Implementar → Gestionar implementaciones → ✏️ Editar
 *  3. Versión → "Nueva versión" → Implementar
 *  La URL no cambia.
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

const ENCABEZADOS = {
  DIAGNOSTICOS: [
    'ID Diagnóstico','Fecha y Hora','Nombre','Cargo','Departamento',
    'Antigüedad','Nivel IA (0-4)','Nivel IA Descripción',
    'POA Score (0-100)','Nivel Madurez','Descripción Madurez','Resumen Ejecutivo'
  ],
  FUNCIONES:     ['ID Diagnóstico','Nombre Empleado','N° Función','Descripción','Frecuencia','Horas por Semana'],
  PROCESOS:      ['ID Diagnóstico','Nombre Empleado','N° Proceso','Nombre del Proceso','Pasos','Entregable Final','Herramientas Actuales','Tiempo (h)'],
  DOLORES:       ['ID Diagnóstico','Nombre Empleado','N° Dolor','Tipo','Descripción','Impacto'],
  OPORTUNIDADES: ['ID Diagnóstico','Nombre Empleado','N°','Título','Proceso','Herramienta IA','Impacto','Dificultad','Descripción','Ahorro Estimado'],
  RUTA:          ['ID Diagnóstico','Nombre Empleado','Semana','Bloque','Actividad','Herramienta','Entregable']
};


// ─────────────────────────────────────────────────────────────
// PUNTO DE ENTRADA PRINCIPAL
// Recibe todas las peticiones del formulario HTML
// ─────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const accion  = payload.accion || '';

    // ── Proxy: llamar a Claude API ────────────────────────────
    if (accion === 'claude') {
      return proxyClaude(payload.prompt, payload.max_tokens);
    }

    // ── Guardar diagnóstico en Sheets ─────────────────────────
    if (accion === 'guardar') {
      return guardarDiagnostico(payload);
    }

    return respuestaError('Acción no reconocida: ' + accion);

  } catch (err) {
    return respuestaError('Error interno: ' + err.message);
  }
}


// ─────────────────────────────────────────────────────────────
// PROXY CLAUDE — Llama a la API con tu key guardada de forma segura
// ─────────────────────────────────────────────────────────────
function proxyClaude(prompt, maxTokens) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');

  if (!apiKey) {
    return respuestaError('API key no configurada. Sigue el Paso 3 de las instrucciones.');
  }

  const requestBody = {
    model:      'claude-sonnet-4-6',
    max_tokens: maxTokens || 4096,
    messages:   [{ role: 'user', content: prompt }]
  };

  const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method:  'post',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01'
    },
    payload:            JSON.stringify(requestBody),
    muteHttpExceptions: true
  });

  const codigo     = response.getResponseCode();
  const contenido  = response.getContentText();

  if (codigo !== 200) {
    return respuestaError('Error de Claude API (código ' + codigo + '): ' + contenido);
  }

  // Devolver la respuesta de Claude tal cual al HTML
  return ContentService
    .createTextOutput(contenido)
    .setMimeType(ContentService.MimeType.JSON);
}


// ─────────────────────────────────────────────────────────────
// GUARDAR DIAGNÓSTICO EN SHEETS
// ─────────────────────────────────────────────────────────────
function guardarDiagnostico(payload) {
  if (!payload.empleado || !payload.empleado.nombre) {
    return respuestaError('Payload inválido: falta empleado.nombre');
  }

  configurarHojas();

  const id       = generarId(payload.empleado.nombre);
  const fecha    = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
  const { empleado, funciones, procesos, dolores, analisis } = payload;

  agregarFila(HOJAS.DIAGNOSTICOS, [
    id, fecha,
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

  (funciones || []).forEach(function(f, i) {
    agregarFila(HOJAS.FUNCIONES, [id, empleado.nombre, i+1, f.descripcion||'', f.frecuencia||'', f.horas||'']);
  });

  (procesos || []).forEach(function(p, i) {
    agregarFila(HOJAS.PROCESOS, [id, empleado.nombre, i+1, p.nombre||'', p.pasos||'', p.entregable||'', p.herramientas||'', p.tiempo||'']);
  });

  (dolores || []).forEach(function(d, i) {
    agregarFila(HOJAS.DOLORES, [id, empleado.nombre, i+1, d.tipo||'', d.descripcion||'', d.impacto||'']);
  });

  (analisis.oportunidades || []).forEach(function(op, i) {
    agregarFila(HOJAS.OPORTUNIDADES, [id, empleado.nombre, i+1, op.titulo||'', op.proceso||'', op.herramienta||'', op.impacto||'', op.dificultad||'', op.descripcion||'', op.ahorro_estimado||'']);
  });

  (analisis.ruta_12_semanas || []).forEach(function(s) {
    agregarFila(HOJAS.RUTA, [id, empleado.nombre, s.semana||'', s.bloque||'', s.actividad||'', s.herramienta||'', s.entregable||'']);
  });

  return respuestaExito({ mensaje: 'Diagnóstico guardado', id_diagnostico: id, fecha: fecha });
}


// ─────────────────────────────────────────────────────────────
// CONFIGURAR HOJAS — Ejecutar manualmente una vez (Paso 4)
// ─────────────────────────────────────────────────────────────
function configurarHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HOJAS).forEach(function(clave) {
    const nombre = HOJAS[clave];
    let hoja = ss.getSheetByName(nombre);
    if (!hoja) hoja = ss.insertSheet(nombre);
    if (hoja.getLastRow() === 0) {
      hoja.appendRow(ENCABEZADOS[clave]);
      const rango = hoja.getRange(1, 1, 1, ENCABEZADOS[clave].length);
      rango.setFontWeight('bold');
      rango.setBackground('#1e40af');
      rango.setFontColor('#ffffff');
      hoja.setFrozenRows(1);
    }
  });
}


// ─────────────────────────────────────────────────────────────
// UTILIDADES
// ─────────────────────────────────────────────────────────────
function agregarFila(nombreHoja, fila) {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombreHoja);
  if (!hoja) throw new Error('Hoja no encontrada: ' + nombreHoja);
  hoja.appendRow(fila);
}

function generarId(nombre) {
  const ahora    = new Date();
  const fecha    = Utilities.formatDate(ahora, 'America/Mexico_City', 'yyyyMMdd');
  const hora     = Utilities.formatDate(ahora, 'America/Mexico_City', 'HHmmss');
  const iniciales = (nombre || 'XX').trim().split(' ').map(function(p) { return p.charAt(0).toUpperCase(); }).slice(0,2).join('');
  return 'DX-' + fecha + '-' + hora + '-' + iniciales;
}

function respuestaExito(datos) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, datos: datos }))
    .setMimeType(ContentService.MimeType.JSON);
}

function respuestaError(mensaje) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: mensaje }))
    .setMimeType(ContentService.MimeType.JSON);
}
