const locale = 'fr'

export default {
  // current locale
  locale,

  // when translation is not available fallback to that locale
  fallbackLocale: 'fr',

  // availabled locales for user selection
  availableLocales: [{
    code: 'en',
    flag: 'us',
    name: 'English',
    file: 'en.js'
  },
  {
    code: 'fr',
    flag: 'fr',
    name: 'Français',
    file: 'fr.js'
  }]
}
