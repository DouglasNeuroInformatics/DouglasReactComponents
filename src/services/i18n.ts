import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

const defaultNS = 'translations';

const resources = {
  en: {
    translations: {
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
      ],
      'form.errors.required': 'This field is required',
      'form.errors.unknown': 'Unknown error',
      'form.radio.labels.false': 'False',
      'form.radio.labels.true': 'True',
      'form.reset': 'Clear',
      'form.submit': 'Submit',
      'form.append': 'Append',
      'form.remove': 'Remove',
      'notifications.types.error': 'Error',
      'notifications.types.info': 'Info',
      'notifications.types.success': 'Success',
      'notifications.types.warning': 'Warning',
      'searchBar.placeholder': 'Search...'
    }
  },
  fr: {
    translations: {
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
      ],
      'form.errors.required': 'Ce champ est obligatoire',
      'form.errors.unknown': 'Erreur inconnue',
      'form.radio.labels.false': 'Faux',
      'form.radio.labels.true': 'Vrai',
      'form.reset': 'Réinitialiser',
      'form.submit': 'Soumettre',
      'form.append': 'Ajouter',
      'form.remove': 'Supprimer',
      'notifications.types.error': 'Erreur',
      'notifications.types.info': 'Attention',
      'notifications.types.success': 'Succès',
      'notifications.types.warning': 'Avertissement',
      'searchBar.placeholder': 'Rechercher...'
    }
  }
} as const;

const i18n = createInstance({
  defaultNS,
  resources,
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr'],
  interpolation: {
    escapeValue: false
  },
  returnObjects: true
});

void i18n.use(initReactI18next).init();

export { i18n as default, defaultNS, resources };
