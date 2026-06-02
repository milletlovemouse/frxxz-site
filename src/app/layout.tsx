import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Geist, Noto_Serif_SC } from 'next/font/google';
import { getI18nProvider } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { StaticSearchDialog } from '@/components/search-dialog';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-cn',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="zh-CN"
      className={cn(geist.variable, notoSerifSC.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <RootProvider
          i18n={getI18nProvider()}
          search={{
            SearchDialog: StaticSearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
