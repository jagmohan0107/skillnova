// SkillNova API Configuration
// This file centralizes all backend URLs for easy deployment.

const isProduction = import.meta.env.PROD;

// In production, these will be your Render.com / Vercel.com URLs.
// Locally, they fall back to your localhost ports.
const rawAuthUrl = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5001';
const rawAiUrl = import.meta.env.VITE_AI_API_URL || 'http://localhost:8000';

export const AUTH_API_URL = rawAuthUrl.includes('/api') ? rawAuthUrl : `${rawAuthUrl}/api`;
export const AI_API_URL = rawAiUrl.includes('/api') ? rawAiUrl : `${rawAiUrl}/api`;

console.log(`[SkillNova Sync] Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`[SkillNova Sync] Auth Node: ${AUTH_API_URL}`);
console.log(`[SkillNova Sync] AI Node: ${AI_API_URL}`);
