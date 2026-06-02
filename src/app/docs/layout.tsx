import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { I18nProvider } from 'fumadocs-ui/contexts/i18n';
import { getI18nProvider, i18n } from '@/lib/i18n';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const locale = i18n.defaultLanguage;

  return (
    <I18nProvider {...getI18nProvider(locale)}>
      <DocsLayout tree={source.getPageTree(locale)} {...baseOptions()}>
        {children}
      </DocsLayout>
    </I18nProvider>
  );
}
