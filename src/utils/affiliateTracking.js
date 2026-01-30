/**
 * Utilidades para Tracking de Afiliadas
 * SuperPreciosa - Sistema de Embajadoras
 */

import { AFFILIATE_CONFIG } from '../config/affiliates';
import affiliatesData from '../data/affiliates.json';

const AFFILIATES_API_URL = 'https://n8n.superpreciosa.com/webhook/affiliates';

/**
 * Cache simple en memoria para evitar llamadas excesivas
 */
let affiliatesCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Obtiene la lista de embajadoras válidas (desde API o JSON local)
 * @param {boolean} forceRefresh - Forzar recarga desde la API ignorando cache
 * @returns {Promise<Array>} Lista de objetos de afiliadas
 */
export const getValidAffiliates = async (forceRefresh = false) => {
    const now = Date.now();

    // 1. Usar cache si es válido y no se fuerza refresco
    if (!forceRefresh && affiliatesCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return affiliatesCache;
    }

    try {
        // 2. Intentar obtener de la API
        const response = await fetch(AFFILIATES_API_URL);
        if (!response.ok) throw new Error('API Error');

        const data = await response.json();

        if (Array.isArray(data)) {
            affiliatesCache = data;
            cacheTimestamp = now;
            console.log('📦 Embajadoras actualizadas desde API:', data.length);
            return data;
        }
    } catch (error) {
        console.warn('⚠️ Usando lista local de embajadoras (API no disponible/error)');
    }

    // 3. Fallback: Usar archivo JSON local
    return affiliatesData;
};

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
 * Valida si un código de afiliada existe (Sincrónico - Solo JSON local)
 * @deprecated Usar isValidAffiliateCodeAsync para validación completa
 */
export const isValidAffiliateCode = (code) => {
    if (!code) return false;
    const affiliate = affiliatesData.find(a => a.code === code.toLowerCase());
    return affiliate && affiliate.active === true;
};

/**
 * Valida si un código de afiliada existe y está activo (Asíncrono - API + JSON)
 * @param {string} code 
 * @returns {Promise<boolean>}
 */
export const isValidAffiliateCodeAsync = async (code) => {
    if (!code) return false;

    // Intento 1: Usar cache o lo que tengamos
    let affiliates = await getValidAffiliates(false);
    let affiliate = affiliates.find(a => a.code === code.toLowerCase());

    // Si lo encontramos y está activo, retornamos true
    if (affiliate && affiliate.active === true) return true;

    // Intento 2: Si no lo encontramos, forzamos recarga de la API (por si es nueva)
    console.log('🔄 Código no encontrado en cache, forzando recarga API...', code);
    affiliates = await getValidAffiliates(true);
    affiliate = affiliates.find(a => a.code === code.toLowerCase());

    return affiliate && affiliate.active === true;
};

/**
 * Obtiene información completa de una afiliada (Sincrono - Local)
 */
export const getAffiliateInfo = (code) => {
    if (!code) return null;
    return affiliatesData.find(a => a.code === code.toLowerCase()) || null;
};

/**
 * Guarda el código de afiliada en localStorage con expiración
 * Ahora acepta validación opcional para permitir guardar desde procesos async
 */
export const saveAffiliateCode = (code, skipValidation = false) => {
    // Si no se salta validación, usa la local (síncrona)
    if (!skipValidation && !isValidAffiliateCode(code)) {
        console.warn('Código de afiliada no encontrado en local (usar saveAsync si viene de API):', code);
        // Aun así permitimos guardar si viene de un proceso confiable
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
 * Obtiene el código de afiliada activo
 * @returns {object|null}
 */
export const getActiveAffiliate = () => {
    try {
        const stored = localStorage.getItem(AFFILIATE_CONFIG.storageKey);
        if (!stored) return null;

        const affiliateData = JSON.parse(stored);
        const now = new Date();
        const expiresAt = new Date(affiliateData.expiresAt);

        if (now > expiresAt) {
            clearAffiliateCode();
            return null;
        }

        // Recuperamos info básica del JSON local para tener el nombre
        // Si vienen datos extra en el futuro, podríamos guardarlos en localStorage
        const localInfo = getAffiliateInfo(affiliateData.code) || { name: 'Embajadora', code: affiliateData.code };

        return {
            ...localInfo,
            code: affiliateData.code, // Asegurar que usamos el código guardado
            savedAt: affiliateData.savedAt,
            expiresAt: affiliateData.expiresAt,
        };
    } catch (error) {
        console.error('Error obteniendo afiliada activa:', error);
        return null;
    }
};

export const clearAffiliateCode = () => {
    try {
        localStorage.removeItem(AFFILIATE_CONFIG.storageKey);
        console.log('🗑️ Código de afiliada eliminado');
    } catch (error) {
        console.error('Error limpiando código de afiliada:', error);
    }
};

export const getAffiliateWhatsAppText = () => {
    const affiliate = getActiveAffiliate();
    if (!affiliate) return '';
    return `\n\n🎁 *Código de Referencia:* ${affiliate.code.toUpperCase()}\n👤 Embajadora: ${affiliate.name}`;
};

export const hasActiveAffiliate = () => {
    return getActiveAffiliate() !== null;
};

export default {
    detectAffiliateCode,
    isValidAffiliateCode,
    isValidAffiliateCodeAsync,
    getValidAffiliates,
    getAffiliateInfo,
    saveAffiliateCode,
    getActiveAffiliate,
    clearAffiliateCode,
    getAffiliateWhatsAppText,
    hasActiveAffiliate,
};