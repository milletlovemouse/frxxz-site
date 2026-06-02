'use client';

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { create } from '@orama/orama';

function tokenizeCjk(input: string) {
  const normalized = input.toLowerCase();
  const segments = normalized.match(/[\p{Script=Han}]+|[\p{Letter}\p{Number}_'-]+/gu) ?? [];
  const grams = new Set<string>();

  for (const segment of segments) {
    grams.add(segment);

    if (!/[\p{Script=Han}]/u.test(segment)) continue;

    for (const char of Array.from(segment)) {
      grams.add(char);
    }

    for (let size = 2; size <= Math.min(segment.length, 4); size += 1) {
      for (let index = 0; index <= segment.length - size; index += 1) {
        grams.add(segment.slice(index, index + size));
      }
    }
  }

  return Array.from(grams);
}

function createCjkTokenizer() {
  return {
    language: 'zh-CN',
    normalizationCache: new Map<string, string>(),
    tokenize: tokenizeCjk,
  };
}

function getCurrentLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  return segments[0] === 'en' || segments[1] === 'en' ? 'en' : 'zh-CN';
}

function isCurrentLocaleUrl(url: string, locale: string) {
  if (locale === 'en') {
    return url.startsWith('/docs/en') || url.startsWith('/en/docs');
  }

  return url.startsWith('/docs') && !url.startsWith('/docs/en');
}

interface StaticSearchDialogProps extends SharedProps {
  from?: string;
}

export function StaticSearchDialog({
  from = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/search`,
  ...props
}: StaticSearchDialogProps) {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    from,
    locale: currentLocale,
    initOrama: () =>
      create({
        schema: {
          content: 'string',
          page_id: 'string',
          type: 'string',
          breadcrumbs: 'string[]',
          tags: 'enum[]',
          url: 'string',
          embeddings: 'vector[512]',
        },
        components: {
          tokenizer: createCjkTokenizer(),
        },
      }),
  });
  const items = useMemo(() => {
    if (!Array.isArray(query.data)) return query.data;

    return query.data.filter((item) => isCurrentLocaleUrl(item.url, currentLocale));
  }, [currentLocale, query.data]);

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={items !== 'empty' ? items : undefined} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
