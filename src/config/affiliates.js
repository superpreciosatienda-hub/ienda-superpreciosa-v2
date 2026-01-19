/**
 * Configuración del Sistema de Afiliados SuperPreciosa
 * 
 * IMPORTANTE: Cambia AFFILIATE_SYSTEM_ENABLED a true para activar el sistema
 */

// 🟢 FEATURE FLAG - Sistema ACTIVADO
export const AFFILIATE_SYSTEM_ENABLED = true;

// Configuración de comisiones
export const AFFILIATE_CONFIG = {
    // Porcentaje de comisión
    commissionRate: 0.15, // 15%

    // Duración de la cookie de afiliado (en días)
    cookieDuration: 60,

    // Mínimo para retiro
    minimumPayout: 50, // $50

    // Periodo de retención (días)
    retentionPeriod: 15,

    // Nombre de la clave en localStorage
    storageKey: 'superpreciosa_affiliate',

    // Parámetro de URL para tracking
    urlParam: 'ref',
};

// Mensajes del sistema
export const AFFILIATE_MESSAGES = {
    invalidCode: 'Código de afiliada no válido',
    codeApplied: 'Código de afiliada aplicado correctamente',
    referredBy: 'Recomendado por',
};

export default AFFILIATE_CONFIG;
