import { cn } from "@/lib/utils";

interface EyebrowProps {
  index?: string;
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ index, children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        className
      )}
    >
      {index && <span className="text-accent">{index}</span>}
      {!index && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
      <span>{children}</span>
    </p>
  );
}