import { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const MOCK_CHATS = [
  {
    id: "1",
    title: "Getting Started",
    preview: "Welcome to the chat!",
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "Project Ideas",
    preview: "Let's brainstorm some ideas",
    timestamp: new Date(),
  },
];

const INITIAL_MESSAGES = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
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
        content: "I'm a mock response. The real AI integration will go here!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleNewChat = () => {
    // Implementation for new chat creation
    console.log("New chat created");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden p-4 gap-4">
      <ChatSidebar
        chats={MOCK_CHATS}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onNewChat={handleNewChat}
      />
      <div className="relative flex-1 rounded-lg glass-morphism">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Index;