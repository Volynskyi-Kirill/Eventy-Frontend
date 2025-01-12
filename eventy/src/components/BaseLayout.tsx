import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from './Navigation/Navigation';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html className='h-full' lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Toaster />
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
