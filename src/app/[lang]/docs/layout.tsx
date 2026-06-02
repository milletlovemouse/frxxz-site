import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { I18nProvider } from 'fumadocs-ui/contexts/i18n';
import { getI18nProvider, i18n } from '@/lib/i18n';
import { baseOptions } from '@/lib/layout.shared';
import { notFound } from 'next/navigation';

type LocalizedDocsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function Layout({ children, params }: LocalizedDocsLayoutProps) {
  const { lang } = await params;
  if (!i18n.languages.includes(lang as (typeof i18n.languages)[number])) notFound();

  return (
    <I18nProvider {...getI18nProvider(lang)}>
      <DocsLayout tree={source.getPageTree(lang)} {...baseOptions()}>
        {children}
      </DocsLayout>
    </I18nProvider>
  );
}
