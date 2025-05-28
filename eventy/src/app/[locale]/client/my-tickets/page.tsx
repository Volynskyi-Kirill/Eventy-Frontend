import { getTranslations } from 'next-intl/server';
import { MyTicketsContent } from '@/components/client/my-tickets/MyTicketsContent';

type MyTicketsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function MyTicketsPage({ params }: MyTicketsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MyTicketsPage' });

  return (
    <div className='container px-4 md:px-6 py-8 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>{t('title')}</h1>
      <MyTicketsContent />
    </div>
  );
}
