import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center'>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>{t('title')}</h1>
      <p className='text-lg text-gray-600 mb-6'>{t('description')}</p>
      <Link
        href='/'
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
      >
        {t('goHome')}
      </Link>
    </div>
  );
}
