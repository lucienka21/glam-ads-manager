import { cn } from "@/lib/utils";

interface MentionProps {
  name: string;
  className?: string;
  variant?: 'chat-own' | 'chat-other' | 'default';
}

export function Mention({ name, className, variant = 'default' }: MentionProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-200 shadow-sm",
        variant === 'chat-own' && "bg-white/30 text-white hover:bg-white/45 backdrop-blur-sm border border-white/20",
        variant === 'chat-other' && "bg-gradient-to-r from-pink-500/40 to-rose-500/40 text-pink-200 hover:from-pink-500/50 hover:to-rose-500/50 ring-1 ring-pink-400/50 shadow-pink-500/20",
        variant === 'default' && "bg-gradient-to-r from-pink-500/30 to-rose-500/30 text-pink-300 hover:from-pink-500/40 hover:to-rose-500/40 ring-1 ring-pink-400/40 shadow-pink-500/10",
        className
      )}
    >
      <span className="text-pink-300/80">@</span>
      <span className="font-bold">{name}</span>
    </span>
  );
}

// Helper to parse and render mentions in text
export function renderMentions(content: string, variant: 'chat-own' | 'chat-other' | 'default' = 'default') {
  const mentionRegex = /@(\w+)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    
    parts.push(
      <Mention 
        key={match.index} 
        name={match[1]}
        variant={variant}
      />
    );
    
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts;
}
