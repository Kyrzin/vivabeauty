const DEFAULT_LANG = 'en';
const scriptSrc = document.currentScript.src;
const basePath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);

function loadTranslations(lang) {
  return fetch(`${basePath}i18n/${lang}.json`).then(r => r.json());
}

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = key.split('.').reduce((o, i) => (o ? o[i] : null), translations);
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = key.split('.').reduce((o, i) => (o ? o[i] : null), translations);
    if (value) el.setAttribute('placeholder', value);
  });
}

function setLanguage(lang) {
  loadTranslations(lang).then(t => {
    applyTranslations(t);
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  });
}

const select = document.getElementById('language-select');
const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;
if (select) {
  select.value = savedLang;
  select.addEventListener('change', e => setLanguage(e.target.value));
}
setLanguage(savedLang);
