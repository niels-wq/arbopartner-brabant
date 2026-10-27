const SECRET_ENV = ["XAI_API_KEY", "FORM_HMAC_SECRET", "SMTP_PASS", "SMTP_USER"];

export function publicError(error) {
  let text = error instanceof Error ? error.message : String(error ?? "onbekend");
  text = text.replace(/\s+/g, " ").trim();
  for (const name of SECRET_ENV) {
    const secret = String(process.env[name] || "").trim();
    if (secret.length < 8) continue;
    text = text.split(secret).join("[weggelaten]");
  }
  return text.slice(0, 300);
}
