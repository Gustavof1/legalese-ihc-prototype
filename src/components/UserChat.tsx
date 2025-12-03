import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Bot, User, Menu, Sparkles, Paperclip, ArrowLeft, FileText, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface UserChatProps {
  userName: string;
  onConnectWithLawyer: () => void;
  onLogout: () => void;
  onBackToDashboard?: () => void;
}

export function UserChat({ userName, onConnectWithLawyer, onLogout, onBackToDashboard }: UserChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Olá ${userName}! Bem-vinda ao Legalese. Sou seu assistente virtual e estou aqui para ajudar você com questões jurídicas. Pode me contar o que está acontecendo?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showLawyerSuggestion, setShowLawyerSuggestion] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const aiResponses = [
    "Entendo que você foi dispensada sem carteira assinada e não recebeu seus direitos. Isso é uma situação séria. Vou te fazer algumas perguntas para entender melhor o caso, está bem?",
    "Por quanto tempo você trabalhou nesse emprego?",
    "Você tem alguma prova de que trabalhou lá? Como recibos, mensagens, fotos, ou testemunhas?",
    "Entendi. Você tem direito a receber todos os valores devidos, incluindo salários atrasados, férias proporcionais, 13º salário e FGTS. Posso te conectar com um advogado especializado em direito trabalhista que pode te ajudar gratuitamente. Você gostaria disso?"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      if (conversationStep < aiResponses.length) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiResponses[conversationStep],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setConversationStep(prev => prev + 1);

        if (conversationStep === aiResponses.length - 1) {
          setShowLawyerSuggestion(true);
        }
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "Posso continuar te ajudando com outras dúvidas ou te conectar com um advogado agora mesmo.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    }, 1000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: `📎 Arquivo enviado: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Recebi seu arquivo! Vou analisar e te dar um retorno em breve.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white relative" data-sheet-container>
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-white truncate">Assistente Jurídico</h2>
            <p className="text-blue-100 text-xs">Online</p>
          </div>
        </div>
        <button onClick={() => setShowMenu(!showMenu)} className="text-white p-2">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Side Menu Sheet */}
      <Sheet open={showMenu} onOpenChange={setShowMenu}>
        <SheetContent side="left" className="w-[280px] z-[9999]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            <div className="mb-4 pb-4 border-b">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{userName}</p>
                  <p className="text-sm text-gray-500">Chat com IA</p>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost"
              className="w-full justify-start"
            >
              <Bot className="w-4 h-4 mr-2" />
              Conversar com IA
            </Button>
            <Button 
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setShowMenu(false);
                onConnectWithLawyer();
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Conversar com Advogado
            </Button>
            <Button 
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                if (onBackToDashboard) {
                  setShowMenu(false);
                  onBackToDashboard();
                }
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Menu Principal
            </Button>
            <div className="pt-4 border-t mt-4">
              <Button 
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  setShowMenu(false);
                  onLogout();
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'ai' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {message.sender === 'ai' ? (
                  <Bot className="w-4 h-4 text-blue-600" />
                ) : (
                  <User className="w-4 h-4 text-green-600" />
                )}
              </div>
              <div className={`flex flex-col max-w-[75%] ${message.sender === 'user' ? 'items-end' : ''}`}>
                <div className={`px-3 py-2 rounded-2xl ${
                  message.sender === 'ai' 
                    ? 'bg-gray-100 rounded-tl-sm' 
                    : 'bg-blue-600 text-white rounded-tr-sm'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}

          {showLawyerSuggestion && (
            <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <AlertDescription className="ml-2">
                <p className="text-sm text-gray-700 mb-2">
                  Encontrei um advogado especializado disponível!
                </p>
                <Button onClick={onConnectWithLawyer} size="sm" className="w-full">
                  Conectar com Advogado
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-full"
          />
          <Button type="submit" size="icon" className="rounded-full flex-shrink-0">
            <Send className="w-4 h-4" />
          </Button>
          <Button size="icon" className="rounded-full flex-shrink-0" onClick={handleFileUpload}>
            <Paperclip className="w-4 h-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </form>
      </div>
    </div>
  );
}