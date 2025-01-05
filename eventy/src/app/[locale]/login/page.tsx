import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LoginPage() {
  const t = useTranslations('LoginPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>

      <div>
        <label>{t('emailPlaceholder')}</label>
        <input type='email' placeholder={t('emailPlaceholder')} />
      </div>

      <div>
        <label>{t('passwordPlaceholder')}</label>
        <input type='password' placeholder={t('passwordPlaceholder')} />
      </div>

      <Link href='/forgot-password'>{t('forgotPassword')}</Link>

      <button>{t('loginButton')}</button>

      <div>
        <span>{t('orContinueWith')}</span>
      </div>

      <button>{t('loginWithGoogle')}</button>

      <div>
        <p>
          {t('noAccount')} <Link href='/sign-up'>{t('signUp')}</Link>
        </p>
      </div>
    </div>
  );
}
