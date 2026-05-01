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
  
  // Remove trailing slashes and common API suffixes if they were accidentally included in the base env var
  sanitized = sanitized.replace(/\/+$/, '').replace(/\/api$/, '');

  // Add protocol if missing
  if (!sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
    // If it's a localhost URL, use http, otherwise for anything else (especially .onrender.com), use https
    if (sanitized.includes('localhost') || sanitized.includes('127.0.0.1')) {
      sanitized = `http://${sanitized}`;
    } else {
      sanitized = `https://${sanitized}`;
    }
  }

  return sanitized;
};

const rawAuthUrl = import.meta.env.VITE_AUTH_API_URL;
const rawAiUrl = import.meta.env.VITE_AI_API_URL;

/**
 * Smart Discovery: If env vars are missing on Render, attempt to derive them.
 */
const getDiscoveryUrl = (raw, type) => {
  if (raw && raw !== "" && !raw.includes("localhost")) return raw;
  
  // If we are on Render but vars are missing, guess the URL
  if (typeof window !== 'undefined' && window.location.hostname.includes('onrender.com')) {
    console.warn(`[SkillNova Discovery] ${type} URL missing. Attempting auto-discovery...`);
    if (type === 'AUTH') return 'https://skillnova-auth-node.onrender.com';
    if (type === 'AI') return 'https://skillnova-ai-engine.onrender.com';
  }
  
  return raw || (type === 'AUTH' ? 'http://localhost:5001' : 'http://localhost:8000');
};

const baseAuth = cleanUrl(getDiscoveryUrl(rawAuthUrl, 'AUTH'));
const baseAi = cleanUrl(getDiscoveryUrl(rawAiUrl, 'AI'));

export const AUTH_API_URL = `${baseAuth}/api`;
export const AI_API_URL = `${baseAi}/api`;

console.log(`[SkillNova Sync] Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`[SkillNova Sync] Auth Node: ${AUTH_API_URL}`);
console.log(`[SkillNova Sync] AI Node: ${AI_API_URL}`);
if (!rawAuthUrl) console.warn("[SkillNova Sync] WARNING: VITE_AUTH_API_URL is undefined. Using discovery/fallback.");


