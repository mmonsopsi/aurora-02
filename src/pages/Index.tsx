import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/components/ui/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      navigate("/setup");
    }
  }, [navigate]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const newMessage = {
      id: String(messages.length + 1),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const apiKey = localStorage.getItem("openai_api_key");
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            ...messages.map((msg) => ({
              role: msg.isUser ? "user" : "assistant",
              content: msg.content,
            })),
            { role: "user", content },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const aiResponse = {
        id: String(messages.length + 2),
        content: data.choices[0].message.content,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get response from OpenAI. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages(INITIAL_MESSAGES);
    console.log("New chat created");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        chats={[]}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onNewChat={handleNewChat}
      />
      <div className="relative flex-1">
        <div className="mx-auto max-w-[750px] h-full flex flex-col">
          <div className="absolute right-4 top-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="glass-morphism"
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
            <ChatInterface 
              messages={messages} 
              onSendMessage={handleSendMessage}
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;