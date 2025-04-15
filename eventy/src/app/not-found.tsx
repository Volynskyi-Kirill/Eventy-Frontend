import BaseLayout from '@/components/shared/BaseLayout';
import NotFoundPage from '@/components/shared/NotFoundPage';

import { routing } from '@/i18n/routing';

export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}
