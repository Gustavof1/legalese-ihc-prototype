import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, MessageSquare, Bot, User as UserIcon, Menu, ArrowLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';

interface UserDashboardProps {
  userName: string;
  onStartAIChat: () => void;
  onStartLawyerChat: () => void;
  onLogout: () => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
}

interface Conversation {
  id: string;
  with: 'AI' | 'Advogado';
  name: string;
  lastMessage: string;
  date: string;
  unread?: boolean;
}

export function UserDashboard({ userName, onStartAIChat, onStartLawyerChat, onLogout }: UserDashboardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const documents: Document[] = [
    { id: '1', name: 'Reclamação Trabalhista', type: 'PDF', date: '20/11/2025' },
    { id: '2', name: 'Contrato de Trabalho', type: 'PDF', date: '15/11/2025' },
    { id: '3', name: 'Comprovante de Residência', type: 'PDF', date: '10/11/2025' }
  ];

  const conversations: Conversation[] = [
    { 
      id: '1', 
      with: 'AI', 
      name: 'Assistente Jurídico',
      lastMessage: 'Posso te ajudar com mais alguma dúvida?',
      date: '23/11/2025',
      unread: false
    },
    { 
      id: '2', 
      with: 'Advogado', 
      name: 'Dra. Luiza Lima',
      lastMessage: 'Vou preparar os documentos necessários...',
      date: '22/11/2025',
      unread: true
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 relative" data-sheet-container>
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-white">Olá, {userName}</h2>
            <p className="text-blue-100 text-xs">Painel Principal</p>
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
                  <UserIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{userName}</p>
                  <p className="text-sm text-gray-500">Cidadão</p>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setShowMenu(false);
                onStartAIChat();
              }}
            >
              <Bot className="w-4 h-4 mr-2" />
              Conversar com IA
            </Button>
            <Button 
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setShowMenu(false);
                onStartLawyerChat();
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Conversar com Advogado
            </Button>
            <Button 
              variant="ghost"
              className="w-full justify-start"
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 pb-4">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-start"
                onClick={onStartAIChat}
              >
                <Bot className="w-4 h-4 mr-2" />
                Conversar com IA
              </Button>
              <Button 
                variant="outline"
                className="w-full justify-start"
                onClick={onStartLawyerChat}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar com Advogado
              </Button>
            </CardContent>
          </Card>

          {/* Conversations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Conversas</CardTitle>
              <CardDescription className="text-xs">
                {conversations.length} conversas ativas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className="w-full p-3 rounded-lg border hover:bg-gray-50 text-left transition-colors"
                  onClick={() => {
                    if (conversation.with === 'AI') {
                      onStartAIChat();
                    } else {
                      onStartLawyerChat();
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {conversation.with === 'AI' ? (
                        <Bot className="w-4 h-4 text-blue-600" />
                      ) : (
                        <UserIcon className="w-4 h-4 text-green-600" />
                      )}
                      <span className="text-sm">{conversation.name}</span>
                    </div>
                    {conversation.unread && (
                      <Badge variant="default" className="text-xs">Nova</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{conversation.date}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Meus Documentos</CardTitle>
              <CardDescription className="text-xs">
                {documents.length} documentos salvos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.type} • {doc.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}