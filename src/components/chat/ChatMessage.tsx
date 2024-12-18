import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-in-message opacity-0",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-4 py-3 glass-morphism",
          isUser
            ? "bg-primary/90 text-primary-foreground font-medium"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="text-sm sm:text-base">{content}</p>
        <span className="absolute -bottom-5 text-xs text-muted-foreground">
          {format(timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
};