// SkillNova API Configuration
// This file centralizes all backend URLs for easy deployment.

const isProduction = import.meta.env.PROD;

/**
 * Sanitizes and ensures the URL is absolute with a protocol.
 * @param {string} url - The raw URL from environment or default.
 * @returns {string} - A clean, absolute URL.
 */
const cleanUrl = (url) => {
  if (!url) return '';
  
  let sanitized = url.trim();
  
  // Remove trailing slashes
  sanitized = sanitized.replace(/\/+$/, '');

  // Add protocol if missing
  if (!sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
    // If it's a localhost URL, use http, otherwise assume https for production
    if (sanitized.includes('localhost') || sanitized.includes('127.0.0.1')) {
      sanitized = `http://${sanitized}`;
    } else {
      sanitized = `https://${sanitized}`;
    }
  }

  return sanitized;
};

const rawAuthUrl = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5001';
const rawAiUrl = import.meta.env.VITE_AI_API_URL || 'http://localhost:8000';

const baseAuth = cleanUrl(rawAuthUrl);
const baseAi = cleanUrl(rawAiUrl);

export const AUTH_API_URL = `${baseAuth}/api`;
export const AI_API_URL = `${baseAi}/api`;

console.log(`[SkillNova Sync] Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`[SkillNova Sync] Auth Node: ${AUTH_API_URL}`);
console.log(`[SkillNova Sync] AI Node: ${AI_API_URL}`);

