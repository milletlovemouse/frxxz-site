'use client';

import {
  type MouseEvent,
  type WheelEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'neutral',
  themeVariables: {
    fontFamily: 'var(--font-sans)',
  },
});

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replaceAll(':', '');
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const zoomRef = useRef(1);
  const mountedRef = useRef(true);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  function clampZoom(value: number) {
    return Math.min(Math.max(value, 1), 2.5);
  }

  function updateZoom(nextZoom: number) {
    const targetZoom = clampZoom(nextZoom);

    if (targetZoom === zoomRef.current) return;

    zoomRef.current = targetZoom;
    setZoom(targetZoom);
  }

  function zoomIn() {
    updateZoom(zoom + 0.2);
  }

  function zoomOut() {
    updateZoom(zoom - 0.2);
  }

  function resetZoom() {
    updateZoom(1);
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    updateZoom(zoom + delta);
  }

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (!viewportRef.current || event.button !== 0) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: viewportRef.current.scrollLeft,
      scrollTop: viewportRef.current.scrollTop,
    };
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!isDragging || !viewportRef.current) return;

    event.preventDefault();
    const { x, y, scrollLeft, scrollTop } = dragStartRef.current;
    viewportRef.current.scrollLeft = scrollLeft - (event.clientX - x);
    viewportRef.current.scrollTop = scrollTop - (event.clientY - y);
  }

  function stopDragging() {
    setIsDragging(false);
  }

  function toggleFullscreen() {
    setIsFullscreen((current) => !current);
  }

  function downloadImage() {
    if (!svg) return;

    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement('a');

    link.download = 'mermaid-graph.svg';
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  useEffect(() => {
    mountedRef.current = true;

    async function renderChart() {
      try {
        const result = await mermaid.render(`mermaid-${id}`, chart);

        if (mountedRef.current) {
          setSvg(result.svg);
          setError(null);
        }
      } catch (err) {
        if (mountedRef.current) {
          setSvg('');
          setError(err instanceof Error ? err.message : 'Mermaid 图谱渲染失败');
        }
      }
    }

    renderChart();

    return () => {
      mountedRef.current = false;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        <p className="font-medium">Mermaid 图谱渲染失败</p>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs">{error}</pre>
      </div>
    );
  }

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 m-0 flex flex-col rounded-none border-0 bg-card shadow-none'
          : 'my-6 rounded-xl border bg-card shadow-sm'
      }
    >
      <div className="flex items-center justify-between gap-3 border-b px-3 py-2 text-xs text-muted-foreground">
        <span>图谱缩放：{Math.round(zoom * 100)}%（100%-250%，滚轮缩放）</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            className="rounded-md border px-2 py-1 transition hover:bg-muted"
            aria-label="缩小图谱"
          >
            -
          </button>
          <button
            type="button"
            onClick={resetZoom}
            className="rounded-md border px-2 py-1 transition hover:bg-muted"
          >
            重置
          </button>
          <button
            type="button"
            onClick={zoomIn}
            className="rounded-md border px-2 py-1 transition hover:bg-muted"
            aria-label="放大图谱"
          >
            +
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-md border px-2 py-1 transition hover:bg-muted"
          >
            {isFullscreen ? '退出全屏' : '全屏'}
          </button>
          <button
            type="button"
            onClick={downloadImage}
            disabled={!svg}
            className="rounded-md border px-2 py-1 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            下载图片
          </button>
        </div>
      </div>
      <div
        ref={viewportRef}
        className={`${isFullscreen ? 'min-h-0 flex-1' : ''} overflow-hidden p-4 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {svg ? (
          <div
            className="min-w-fit origin-top-left transition-transform [&_svg]:h-auto [&_svg]:max-w-none"
            style={{ transform: `scale(${zoom})`, width: `${zoom * 100}%` }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="text-sm text-muted-foreground">图谱加载中...</div>
        )}
      </div>
    </div>
  );
}
