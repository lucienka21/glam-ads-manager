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
        "inline-flex items-center px-1.5 py-0.5 rounded-md font-medium text-sm cursor-pointer transition-all",
        variant === 'chat-own' && "bg-white/25 text-white hover:bg-white/35",
        variant === 'chat-other' && "bg-gradient-to-r from-pink-500/30 to-rose-500/30 text-pink-300 hover:from-pink-500/40 hover:to-rose-500/40 ring-1 ring-pink-500/40",
        variant === 'default' && "bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-400 hover:from-pink-500/30 hover:to-rose-500/30 ring-1 ring-pink-500/30",
        className
      )}
    >
      <span className="mr-0.5 opacity-70">@</span>
      {name}
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
