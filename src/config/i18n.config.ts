import * as path from 'path';
import {
  QueryResolver,
  AcceptLanguageResolver,
  I18nOptions,
} from 'nestjs-i18n';

export const i18nConfig = (): I18nOptions => {
  return {
    fallbackLanguage: 'zh',
    // supportedLanguages: ['zh-CN', 'en-US'],
    loaderOptions: {
      path: path.join(__dirname, '../i18n/'),
      watch: true,
    },
    resolvers: [new QueryResolver(['lang', 'l']), AcceptLanguageResolver],
  };
};
