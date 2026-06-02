import Link from 'next/link';
import { ArrowRight, BookOpen, Network, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  {
    title: '世界观图谱',
    description: '从三界结构进入人界、灵界、仙界与势力索引。',
    href: '/docs/world/overview',
    icon: Network,
  },
  {
    title: '韩立成长线',
    description: '用主角路线串起资质、功法、法宝、灵宠与法则。',
    href: '/docs/characters/han-li',
    icon: BookOpen,
  },
  {
    title: '核心关系图谱',
    description: '以掌天瓶、青元剑诀、灵宠与三大法则构建实体关系。',
    href: '/docs/graph/core-relations',
    icon: Sparkles,
  },
];

export default function HomePage() {
  return (
    <main className="relative flex flex-1 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.14),transparent_30%)]" />
      <section className="mx-auto flex w-full max-w-6xl flex-col px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
            Fumadocs + Next.js + MDX 知识库
          </div>
          <h1 className="font-serif-cn text-4xl font-bold tracking-tight md:text-6xl">
            凡人修仙传知识库
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            将原始设定资料重组为可检索、可扩展的专题知识库，细分世界观、修炼体系、人物图谱、功法神通、器物资源、修仙百艺、灵兽法则与实体关系图谱。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/docs">
                进入知识库
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs/graph/core-relations">查看知识图谱</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border bg-card/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
            >
              <item.icon className="mb-5 size-6 text-muted-foreground transition group-hover:text-foreground" />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
