import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const dynamic = 'force-static';

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

const cjkTokenizer = {
  language: 'english',
  normalizationCache: new Map<string, string>(),
  tokenize: tokenizeCjk,
};

export const { GET } = createFromSource(source, {
  localeMap: {
    'zh-CN': {
      components: {
        tokenizer: cjkTokenizer,
      },
    },
    // en: 'english',
  },
});
