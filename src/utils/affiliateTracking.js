/**
 * Utilidades para Tracking de Afiliadas
 * SuperPreciosa - Sistema de Embajadoras
 */

import { AFFILIATE_CONFIG } from '../config/affiliates';
import affiliatesData from '../data/affiliates.json';

/**
 * Detecta el código de afiliada en la URL
 * @returns {string|null} Código de afiliada o null si no existe
 */
export const detectAffiliateCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get(AFFILIATE_CONFIG.urlParam);

    if (code) {
        return code.toLowerCase().trim();
    }

    return null;
};

/**
 * Valida si un código de afiliada existe y está activo
 * @param {string} code - Código a validar
 * @returns {boolean}
 */
export const isValidAffiliateCode = (code) => {
    if (!code) return false;

    // CORRECCIÓN: Buscamos dentro de la lista (Array) en vez de buscar por clave
    const affiliate = affiliatesData.find(a => a.code === code.toLowerCase());
    return affiliate && affiliate.active === true;
};

/**
 * Obtiene información completa de una afiliada
 * @param {string} code - Código de afiliada
 * @returns {object|null}
 */
export const getAffiliateInfo = (code) => {
    if (!code) return null;
    // CORRECCIÓN: Usamos .find para recuperar los datos de la lista
    return affiliatesData.find(a => a.code === code.toLowerCase()) || null;
};

/**
 * Guarda el código de afiliada en localStorage con expiración
 * @param {string} code - Código de afiliada
 * @returns {boolean} true si se guardó correctamente
 */
export const saveAffiliateCode = (code) => {
    // Esta validación ahora SÍ funcionará porque ya sabe leer la lista
    if (!isValidAffiliateCode(code)) {
        console.warn('Código de afiliada inválido:', code);
        return false;
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + AFFILIATE_CONFIG.cookieDuration);

    const affiliateData = {
        code: code.toLowerCase(),
        savedAt: new Date().toISOString(),
        expiresAt: expirationDate.toISOString(),
    };

    try {
        localStorage.setItem(
            AFFILIATE_CONFIG.storageKey,
            JSON.stringify(affiliateData)
        );
        console.log('✅ Código de afiliada guardado:', code);
        return true;
    } catch (error) {
        console.error('Error guardando código de afiliada:', error);
        return false;
    }
};

/**
 * Obtiene el código de afiliada activo (si existe y no ha expirado)
 * @returns {object|null} Objeto con información de afiliada o null
 */
export const getActiveAffiliate = () => {
    try {
        const stored = localStorage.getItem(AFFILIATE_CONFIG.storageKey);

        if (!stored) return null;

        const affiliateData = JSON.parse(stored);
        const now = new Date();
        const expiresAt = new Date(affiliateData.expiresAt);

        // Verificar si expiró
        if (now > expiresAt) {
            clearAffiliateCode();
            return null;
        }

        // Verificar si el código sigue siendo válido
        if (!isValidAffiliateCode(affiliateData.code)) {
            clearAffiliateCode();
            return null;
        }

        // Obtener información completa de la afiliada
        const affiliateInfo = getAffiliateInfo(affiliateData.code);

        return {
            ...affiliateInfo,
            savedAt: affiliateData.savedAt,
            expiresAt: affiliateData.expiresAt,
        };
    } catch (error) {
        console.error('Error obteniendo afiliada activa:', error);
        return null;
    }
};

/**
 * Limpia el código de afiliada del localStorage
 */
export const clearAffiliateCode = () => {
    try {
        localStorage.removeItem(AFFILIATE_CONFIG.storageKey);
        console.log('🗑️ Código de afiliada eliminado');
    } catch (error) {
        console.error('Error limpiando código de afiliada:', error);
    }
};

/**
 * Obtiene el texto formateado para incluir en WhatsApp
 * @returns {string} Texto formateado o string vacío
 */
export const getAffiliateWhatsAppText = () => {
    const affiliate = getActiveAffiliate();

    if (!affiliate) return '';

    return `\n\n🎁 *Código de Referencia:* ${affiliate.code.toUpperCase()}\n👤 Embajadora: ${affiliate.name}`;
};

/**
 * Verifica si hay una afiliada activa
 * @returns {boolean}
 */
export const hasActiveAffiliate = () => {
    return getActiveAffiliate() !== null;
};

export default {
    detectAffiliateCode,
    isValidAffiliateCode,
    getAffiliateInfo,
    saveAffiliateCode,
    getActiveAffiliate,
    clearAffiliateCode,
    getAffiliateWhatsAppText,
    hasActiveAffiliate,
};