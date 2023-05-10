import { createI18n } from 'next-international'

export const {
	useI18n,
	I18nProvider,
	useChangeLocale,
  useCurrentLocale,
} = createI18n({
  en: () => import('./en'),
  pt: () => import('./pt'),

})