# frxxz-site

`frxxz-site` 是一个基于 Next.js、Fumadocs 与 MDX 构建的《凡人修仙传知识库》站点。项目将《凡人修仙传》与《凡人修仙之仙界篇》的设定资料拆分为可检索、可维护的专题文档，覆盖世界观、修炼体系、人物关系、功法神通、器物资源、修仙百艺、灵兽妖兽、法则大道与知识图谱。

## 功能特性

- **文档知识库**：使用 Fumadocs 管理 MDX/Markdown 内容，提供侧边栏、目录、页面元信息与文档布局。
- **中文检索**：内置面向 CJK 的分词逻辑，支持中文字符、词组与 2-4 字 n-gram 检索。
- **知识图谱**：支持 Mermaid 图谱渲染、缩放、拖拽、全屏查看与 SVG 下载。
- **LLM 友好输出**：提供 `llms.txt`、`llms-full.txt` 与单页 Markdown 路由，方便大模型读取文档内容。
- **静态导出**：Next.js 配置为 `output: 'export'`，支持生成静态站点，并兼容 GitHub Actions 下的 `/frxxz-site` 路径前缀。
- **中文本地化**：默认语言为 `zh-CN`，UI 文案、搜索、主题切换与页面操作均使用中文。

## 技术栈

- **框架**：Next.js 16、React 19、TypeScript
- **文档系统**：Fumadocs UI、Fumadocs MDX、Fumadocs Core
- **样式与组件**：Tailwind CSS 4、shadcn、Radix UI、Lucide React
- **图谱渲染**：Mermaid
- **包管理器**：pnpm

## 目录结构

```text
frxxz-site/
├── content/docs/              # 文档内容源，按语言与专题组织
│   ├── zh-CN/                 # 简体中文文档
│   └── en/                    # 英文文档内容
├── src/app/                   # Next.js App Router 页面与接口
│   ├── (home)/                # 首页
│   ├── docs/                  # 默认语言文档路由
│   ├── [lang]/docs/           # 多语言文档路由
│   ├── api/search/route.ts    # 文档搜索接口
│   ├── llms.txt/route.ts      # LLM 文档索引
│   ├── llms-full.txt/route.ts # LLM 全量文本
│   └── og/docs/               # 文档 Open Graph 图片
├── src/components/            # MDX 组件与 UI 组件
├── src/lib/                   # 文档源、i18n、布局与共享配置
├── source.config.ts           # Fumadocs MDX 内容源配置
├── next.config.mjs            # Next.js 与静态导出配置
└── components.json            # shadcn 组件配置
```

## 内容分区

当前知识库主要包含以下专题：

- **世界观**：三界结构、人界地域、灵界族群、仙界势力与宗门地图。
- **修炼体系**：灵根、体质、境界、天劫、寿元、夺舍与资源瓶颈。
- **人物图谱**：韩立主线、道侣红颜、师友盟友、敌手与势力首领。
- **功法神通**：基础功法、剑诀、炼体、神识、遁术、雷法与仙界法则功法。
- **器物资源**：法器、法宝、通天灵宝、玄天之宝、掌天瓶与材料。
- **修仙百艺**：炼丹、炼器、阵法、符箓、傀儡、御兽与虫修。
- **灵兽妖兽**：韩立灵宠伙伴、真灵体系、傀儡与灵虫成长线。
- **法则大道**：时间、空间、轮回、混沌与其他法则。
- **知识图谱**：实体字段、关系边、稳定锚点与维护策略。
- **资料治理**：来源优先级、置信度与待复核项。

## 本地开发

安装依赖：

```bash
pnpm install
```

启动开发服务器：

```bash
pnpm dev
```

访问：

```text
http://localhost:3000
```

## 可用脚本

```bash
pnpm dev          # 启动 Next.js 开发服务器
pnpm build        # 构建并静态导出站点
pnpm start        # 启动 Next.js 生产服务器
pnpm lint         # 运行 ESLint
pnpm types:check  # 生成 Fumadocs/Next 类型并执行 TypeScript 类型检查
```

## 文档维护

### 新增文档页面

1. 在 `content/docs/zh-CN/` 下选择或创建专题目录。
2. 新建 `.md` 或 `.mdx` 文件，并添加 frontmatter：

```md
---
title: 页面标题
description: 页面描述
---
```

3. 如需出现在侧边栏中，更新同目录或上级目录的 `meta.json`。
4. 页面链接会根据文件路径生成，例如 `content/docs/zh-CN/world/overview.md` 对应 `/docs/world/overview`。

### 更新专题顺序

各目录下的 `meta.json` 控制标题与页面顺序。根目录 `content/docs/zh-CN/meta.json` 定义知识库一级分区顺序。

### 使用 Mermaid 图谱

项目已注册 `Mermaid` MDX 组件，可在 MDX 页面中渲染关系图谱。图谱组件支持缩放、拖拽、全屏与下载，适合维护人物、势力、功法、器物之间的关系。

## 关键配置

- `source.config.ts`：定义文档源目录为 `content/docs`，支持 `.md` 与 `.mdx`，并启用 Mermaid remark 插件。
- `src/lib/source.ts`：通过 Fumadocs `loader()` 创建文档数据源，并生成文档图片、Markdown 与 LLM 文本路由。
- `src/lib/i18n.ts`：配置默认语言 `zh-CN` 与中文 UI 文案。
- `src/app/api/search/route.ts`：配置文档搜索，并为中文内容启用自定义 tokenizer。
- `next.config.mjs`：启用静态导出、图片非优化模式，以及 GitHub Actions 环境下的路径前缀。

## 构建与部署

生成静态站点：

```bash
pnpm build
```

构建产物输出到 `out/` 目录。由于项目使用静态导出，可以部署到 GitHub Pages、静态托管服务或任意支持静态资源的网站服务器。GitHub Actions 环境下会自动使用 `/frxxz-site` 作为 `basePath` 与 `assetPrefix`。

## 许可证

本项目使用 MIT License。
