import { defineI18n } from 'fumadocs-core/i18n';
import { i18nProvider, uiTranslations } from 'fumadocs-ui/i18n';

export const i18n = defineI18n({
  languages: [
    'zh-CN',
    'en'
  ] as const,
  defaultLanguage: 'zh-CN',
  hideLocale: 'default-locale',
  parser: 'dir',
  fallbackLanguage: 'zh-CN',
});

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add('ui', {
    'zh-CN': {
      displayName: '简体中文',
      search: '搜索文档',
      searchNoResult: '没有找到结果',
      toc: '本页目录',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      chooseTheme: '选择主题',
      themeLight: '浅色',
      themeDark: '深色',
      themeSystem: '跟随系统',
      editOnGithub: '在 GitHub 编辑',
      pageActionsCopyMarkdown: '复制 Markdown',
      pageActionsViewMarkdown: '查看 Markdown',
      pageActionsOpen: '页面操作',
      pageActionsOpenGitHub: '在 GitHub 打开',
      menuToggle: '切换菜单',
      sidebarOpen: '打开侧边栏',
      sidebarCollapse: '收起侧边栏',
      notFoundTitle: '页面未找到',
      notFoundDescription: '请求的页面不存在。',
      notFoundLink: '返回首页',
    },
    en: {
      displayName: 'English',
    },
  });

export function getI18nProvider(locale?: string) {
  return i18nProvider(translations, locale);
}
