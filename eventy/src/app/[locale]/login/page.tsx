import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function LoginPage() {
  const t = useTranslations('LoginPage');

  return (
    <div className='d-flex align-items-center justify-content-center min-vh-100 bg-dark'>
      {/* Контейнер страницы логина */}
      <div
        className='container row mx-auto bg-light shadow rounded-3 p-0'
        style={{ maxWidth: '1122px', height: '1080px' }}
      >
        {/* Левая часть: изображение */}
        <div className='col-6 p-0 position-relative'>
          <Image
            src='/login-imagejpeg.jpeg' // Укажите путь к вашему изображению
            alt='Login background' // Альтернативный текст
            layout='fill' // Заполнение контейнера
            objectFit='cover' // Покрытие контейнера без искажений
            priority // Повышает приоритет загрузки для важного изображения
          />
        </div>

        {/* Правая часть: форма */}
        <div className='col-6 p-5 d-flex flex-column justify-content-center'>
          <h1 className='fw-bold text-dark mb-4'>{t('title')}</h1>
          <p className='text-muted'>{t('subtitle')}</p>

          {/* Поля ввода */}
          <form className='mb-4'>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                {t('emailPlaceholder')}
              </label>
              <input
                type='email'
                id='email'
                placeholder={t('emailPlaceholder')}
                className='form-control'
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                {t('passwordPlaceholder')}
              </label>
              <input
                type='password'
                id='password'
                placeholder={t('passwordPlaceholder')}
                className='form-control'
              />
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4'>
              <Link
                href='/forgot-password'
                className='text-decoration-none text-primary'
              >
                {t('forgotPassword')}
              </Link>
            </div>

            {/* Кнопка логина */}
            <button type='submit' className='btn btn-success w-100 mb-4'>
              {t('loginButton')}
            </button>
          </form>

          {/* Линия или текст */}
          <div className='text-center mb-4 text-muted'>
            {t('orContinueWith')}
          </div>

          {/* Кнопка входа через Google */}
          <button className='btn btn-outline-dark w-100 mb-4'>
            {t('loginWithGoogle')}
          </button>

          {/* Ссылка на регистрацию */}
          <p className='text-center text-muted'>
            {t('noAccount')}{' '}
            <Link
              href='/sign-up'
              className='text-decoration-none text-primary fw-bold'
            >
              {t('signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
