import { useEffect, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { Card, CardContent } from "@heroui/react";
import { DocumentationDecorator, DocumentationLayout } from "@package/storybook";

export default {
  title: "Design System/Colors",
  tags: ["no-tests"],
  decorators: [DocumentationDecorator],
  parameters: {
    a11y: {
      test: "off",
    },
    layout: "fullscreen",
  },
};

function resolveContrastColor(el: HTMLElement): "black" | "white" {
  const bg = getComputedStyle(el).backgroundColor;
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "black";
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--background").trim() || "#ffffff";
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1, 1);
  const { data } = ctx.getImageData(0, 0, 1, 1);
  const r = data[0] ?? 0;
  const g = data[1] ?? 0;
  const b = data[2] ?? 0;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.5 ? "black" : "white";
}

function ColorSection({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <div>
      <p className="text-xl font-medium">{title}</p>
      <div className="h-2" />
      <div className="flex h-full w-full flex-row flex-wrap items-center justify-start px-4 py-1">{children}</div>
    </div>
  );
}

function ColorItem({ text, bgColor }: { text: string; bgColor: string }): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [textColor, setTextColor] = useState<"black" | "white">("black");

  useEffect(() => {
    function update(): void {
      if (ref.current) setTextColor(resolveContrastColor(ref.current));
    }
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return (): void => observer.disconnect();
  }, [bgColor]);

  return (
    <Card variant="secondary" ref={ref} className={`m-2 h-15 w-35 ${bgColor}`}>
      <CardContent className="items-center justify-center truncate text-xs" style={{ color: textColor }}>
        {text}
      </CardContent>
    </Card>
  );
}

function GradientSwatch({ text, style }: { text: string; style: CSSProperties }): ReactElement {
  return (
    <div className="m-2 flex h-15 w-35 items-center justify-center overflow-hidden rounded-xl" style={style}>
      <span className="truncate px-3 text-xs text-white">{text}</span>
    </div>
  );
}

function GradientBar(): ReactElement {
  return <div className="mx-6 my-3 h-3 rounded-full" style={{ background: "var(--brand-gradient)" }} />;
}

export function Colors(): ReactElement {
  return (
    <DocumentationLayout label="Colors">
      <div className="h-8" />
      <div className="flex flex-col gap-4">
        <ColorSection title="Background & Surfaces">
          <ColorItem text="--background" bgColor="bg-background" />
          <ColorItem text="--foreground" bgColor="bg-foreground" />
          <ColorItem text="--surface" bgColor="bg-surface" />
          <ColorItem text="--surface-foreground" bgColor="bg-surface-foreground" />
          <ColorItem text="--surface-secondary" bgColor="bg-surface-secondary" />
          <ColorItem text="--surface-secondary-fg" bgColor="bg-surface-secondary-foreground" />
          <ColorItem text="--surface-tertiary" bgColor="bg-surface-tertiary" />
          <ColorItem text="--surface-tertiary-fg" bgColor="bg-surface-tertiary-foreground" />
          <ColorItem text="--overlay" bgColor="bg-overlay" />
          <ColorItem text="--overlay-foreground" bgColor="bg-overlay-foreground" />
        </ColorSection>

        <ColorSection title="Brand Colors">
          <ColorItem text="--accent" bgColor="bg-accent" />
          <ColorItem text="--secondary" bgColor="bg-[var(--secondary)]" />
          <ColorItem text="--accent-soft" bgColor="bg-accent-soft" />
        </ColorSection>

        <div>
          <p className="text-xl font-medium">Brand Gradient</p>
          <div className="h-2" />
          <GradientBar />
          <div className="flex flex-row flex-wrap items-center justify-start px-4 py-1">
            <GradientSwatch text="--brand-grad-1" style={{ background: "var(--brand-grad-1)" }} />
            <GradientSwatch text="--brand-grad-2" style={{ background: "var(--brand-grad-2)" }} />
            <GradientSwatch text="--brand-grad-3" style={{ background: "var(--brand-grad-3)" }} />
            <GradientSwatch text="--brand-gradient" style={{ background: "var(--brand-gradient)", width: "9.5rem" }} />
          </div>
        </div>

        <ColorSection title="Status Colors">
          <ColorItem text="--success" bgColor="bg-success" />
          <ColorItem text="--success-foreground" bgColor="bg-success-foreground" />
          <ColorItem text="--warning" bgColor="bg-warning" />
          <ColorItem text="--warning-foreground" bgColor="bg-warning-foreground" />
          <ColorItem text="--danger" bgColor="bg-danger" />
          <ColorItem text="--danger-foreground" bgColor="bg-danger-foreground" />
        </ColorSection>

        <ColorSection title="Form Field Colors">
          <ColorItem text="--field-background" bgColor="bg-field" />
          <ColorItem text="--field-foreground" bgColor="bg-field-foreground" />
          <ColorItem text="--field-placeholder" bgColor="bg-field-placeholder" />
          <ColorItem text="--field-border" bgColor="bg-field-border" />
        </ColorSection>

        <ColorSection title="Other Colors">
          <ColorItem text="--default" bgColor="bg-default" />
          <ColorItem text="--default-foreground" bgColor="bg-default-foreground" />
          <ColorItem text="--muted" bgColor="bg-muted" />
          <ColorItem text="--border" bgColor="bg-border" />
          <ColorItem text="--separator" bgColor="bg-separator" />
          <ColorItem text="--focus" bgColor="bg-focus" />
          <ColorItem text="--link" bgColor="bg-link" />
          <ColorItem text="--backdrop" bgColor="bg-[var(--backdrop)]" />
          <ColorItem text="--scrollbar" bgColor="bg-[var(--scrollbar)]" />
        </ColorSection>
      </div>
    </DocumentationLayout>
  );
}
