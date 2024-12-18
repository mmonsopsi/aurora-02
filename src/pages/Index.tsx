import { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const MOCK_CHATS: any[] = [];

const INITIAL_MESSAGES = [
  {
    id: "1",
    content: "Como posso ajudar?",
    isUser: false,
    timestamp: new Date(),
  },
];

const Index = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const { theme, setTheme } = useTheme();

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = {
        id: String(messages.length + 2),
        content: "Estou aqui para ajudar! Como posso ser útil?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages(INITIAL_MESSAGES);
    console.log("New chat created");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        chats={MOCK_CHATS}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onNewChat={handleNewChat}
      />
      <div className="relative flex-1 flex flex-col">
        <div className="absolute right-4 top-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Index;