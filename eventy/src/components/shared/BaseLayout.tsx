import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from './Navigation/Navigation';
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';
import { Providers } from './Providers';

type Props = {
  children: ReactNode;
  locale: string;
};

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html className={`${inter.variable} h-full`} lang={locale}>
      <body className='font-inter'>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Toaster />
            <Navigation />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
