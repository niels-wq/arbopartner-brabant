/**
 * Headers op elk HTTP-antwoord van de Node-server.
 *
 * frame-ancestors staat in een afdwingende Content-Security-Policy.
 * In Report-Only negeert de browser die richtlijn, dus X-Frame-Options
 * alleen dekt dat niet voor nieuwere browsers.
 *
 * Het rapportbeleid noemt wat de pagina's laden: eigen scripts, css,
 * lettertypen (Fontsource, zelf gehost) en beelden, het inline
 * dataLayer-script, de Calendly-widget en het OpenStreetMap-iframe.
 * dataLayer en gtag() zijn de haak voor Tag Manager en Analytics; het
 * sjabloon laadt die scripts nu niet, de herkomst staat er wel in zodat
 * een container geen schending wordt. WhatsApp-links (wa.me) zijn
 * navigatie; form-action noemt ze zodat een formulier daarheen mag.
 */

const reportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "font-src 'self' https://assets.calendly.com",
  "img-src 'self' data: https://assets.calendly.com https://www.google-analytics.com https://www.googletagmanager.com",
  "connect-src 'self' https://calendly.com https://assets.calendly.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src 'self' https://calendly.com https://www.openstreetmap.org https://www.googletagmanager.com",
  "frame-ancestors 'self'",
  "form-action 'self' https://wa.me",
].join("; ");

export const securityHeaders = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Content-Security-Policy": "frame-ancestors 'self'",
  "Content-Security-Policy-Report-Only": reportOnly,
};

export function applySecurityHeaders(res) {
  for (const [name, value] of Object.entries(securityHeaders)) {
    res.setHeader(name, value);
  }
}
