import { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Image, PenLine, Lightbulb, ClipboardList, Gift } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const MOCK_CHATS = [
  {
    id: "1",
    title: "ChatGPT",
    preview: "Bem-vindo ao chat!",
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "Explorar GPTs",
    preview: "Descubra novos GPTs",
    timestamp: new Date(),
  },
];

const INITIAL_MESSAGES = [
  {
    id: "1",
    content: "Como posso ajudar?",
    isUser: false,
    timestamp: new Date(),
  },
];

const QUICK_ACTIONS = [
  { icon: Image, label: "Criar imagem", color: "text-green-500" },
  { icon: PenLine, label: "Ajudar a escrever", color: "text-purple-500" },
  { icon: Lightbulb, label: "Sugerir", color: "text-yellow-500" },
  { icon: ClipboardList, label: "Fazer um plano", color: "text-yellow-500" },
  { icon: Gift, label: "Surpreender", color: "text-blue-500" },
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
    // Implementation for new chat creation
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
        <div className="p-4 flex flex-wrap gap-2 justify-center">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.label}
              variant="secondary"
              className="gap-2"
              onClick={() => handleSendMessage(`/${action.label.toLowerCase()}`)}
            >
              <action.icon className={`h-4 w-4 ${action.color}`} />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;