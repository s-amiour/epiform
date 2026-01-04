// utils/translate.js
export const translate = (value, lang, fallback = "en") => {
  if (!value) return "";
  if (typeof value === "string") return value; // legacy support
  return value[lang] ?? value[fallback] ?? "";
};
