import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

const defaultNS = 'ns1';

const resources = {
  en: {
    translation: {
      'datetime.days': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'datetime.months': [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  },
  fr: {
    translation: {
      'datetime.days': ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      'datetime.months': [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
      ]
    }
  }
} as const;

const i18n = createInstance({
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr'],
  interpolation: {
    escapeValue: false
  },
  resources
});

void i18n.use(initReactI18next).init();

export { i18n as default, defaultNS, resources };
