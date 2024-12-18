import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MessageSquarePlus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Chat {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat?: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

export const ChatSidebar = ({
  chats,
  selectedChat,
  onSelectChat,
  onNewChat,
}: ChatSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative h-full glass-morphism transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-80"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-50 h-8 w-8 rounded-full glass-morphism"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex h-full flex-col p-4">
        <Button
          onClick={onNewChat}
          className="mb-4 gap-2"
          variant={isCollapsed ? "ghost" : "default"}
        >
          <MessageSquarePlus className="h-5 w-5" />
          {!isCollapsed && "New Chat"}
        </Button>

        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant={selectedChat === chat.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center"
                )}
                onClick={() => onSelectChat(chat.id)}
              >
                {isCollapsed ? (
                  <div className="h-2 w-2 rounded-full bg-current" />
                ) : (
                  <div className="truncate text-left">
                    <div className="font-medium">{chat.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {chat.preview}
                    </div>
                  </div>
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};