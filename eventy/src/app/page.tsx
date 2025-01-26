import { redirect } from 'next/navigation';

export default function RootPage() {
  //TODO move to const DEFAULT_LOCALE
  redirect('/en');
}
