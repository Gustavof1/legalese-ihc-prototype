import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Send, User, Briefcase, ArrowLeft, Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import type { Case, UserType } from '../App';

interface Message {
  id: string;
  sender: 'user' | 'lawyer';
  text: string;
  timestamp: Date;
}

interface ChatWithLawyerProps {
  userName: string;
  userType: UserType;
  caseData: Case | null;
  onBack: () => void;
}

export function ChatWithLawyer({ userName, userType, caseData, onBack }: ChatWithLawyerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const callIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const initialMessages: Message[] = userType === 'lawyer' 
      ? [
          {
            id: '1',
            sender: 'lawyer',
            text: `Olá ${caseData?.userName}! Sou a advogada Luiza Lima. Li sobre seu caso e estou aqui para te ajudar. Podemos conversar por aqui ou fazer uma chamada de voz. O que prefere?`,
            timestamp: new Date()
          }
        ]
      : [
          {
            id: '1',
            sender: 'lawyer',
            text: `Olá ${userName}! Sou a advogada Luiza Lima, especialista em direito trabalhista. Estou aqui para te ajudar gratuitamente. Podemos conversar por aqui ou fazer uma chamada de voz. O que você prefere?`,
            timestamp: new Date()
          }
        ];
    
    setMessages(initialMessages);
  }, [userType, userName, caseData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isInCall) {
      callIntervalRef.current = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callIntervalRef.current) {
        clearInterval(callIntervalRef.current);
        callIntervalRef.current = null;
      }
      setCallDuration(0);
    }

    return () => {
      if (callIntervalRef.current) {
        clearInterval(callIntervalRef.current);
      }
    };
  }, [isInCall]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: userType === 'lawyer' ? 'lawyer' : 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: userType === 'lawyer' ? 'user' : 'lawyer',
        text: userType === 'lawyer' 
          ? "Obrigada por me responder. Estou analisando sua situação."
          : "Entendo. Vou preparar os documentos necessários para você.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const handleStartCall = () => {
    setIsInCall(true);
    const callMessage: Message = {
      id: Date.now().toString(),
      sender: userType === 'lawyer' ? 'lawyer' : 'user',
      text: `Chamada iniciada...`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, callMessage]);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setIsMuted(false);
    const endCallMessage: Message = {
      id: Date.now().toString(),
      sender: userType === 'lawyer' ? 'lawyer' : 'user',
      text: `Chamada encerrada. Duração: ${formatDuration(callDuration)}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, endCallMessage]);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const otherPersonName = userType === 'lawyer' ? (caseData?.userName || 'Usuário') : 'Luiza Lima';

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            userType === 'lawyer' ? 'bg-green-100' : 'bg-white'
          }`}>
            {userType === 'lawyer' ? (
              <User className="w-5 h-5 text-green-600" />
            ) : (
              <Briefcase className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white truncate">{otherPersonName}</h2>
            <p className="text-blue-100 text-xs">
              {userType === 'lawyer' ? 'Cidadão' : 'Advogada'}
            </p>
          </div>
        </div>

        {!isInCall ? (
          <Button 
            onClick={handleStartCall} 
            className="w-full bg-white text-blue-600 hover:bg-blue-50"
            size="sm"
          >
            <Phone className="w-4 h-4 mr-2" />
            Iniciar Chamada de Voz
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsMuted(!isMuted)} 
              variant="outline"
              size="sm"
              className={`flex-1 ${isMuted ? 'bg-yellow-500 text-white' : 'bg-white'}`}
            >
              {isMuted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isMuted ? 'Ativar' : 'Mutar'}
            </Button>
            <Button 
              onClick={handleEndCall} 
              size="sm"
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              Encerrar ({formatDuration(callDuration)})
            </Button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4" ref={scrollRef}>
        {isInCall && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <Phone className="w-4 h-4 text-green-600" />
            <AlertDescription className="ml-2">
              <div className="text-sm">
                <div className="flex justify-between text-green-700">
                  <span>Chamada em andamento</span>
                  <span>{formatDuration(callDuration)}</span>
                </div>
                {isMuted && (
                  <p className="text-yellow-700 text-xs mt-1">Microfone mutado</p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                (userType === 'lawyer' && message.sender === 'lawyer') ||
                (userType !== 'lawyer' && message.sender === 'user')
                  ? 'flex-row-reverse'
                  : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'lawyer' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {message.sender === 'lawyer' ? (
                  <Briefcase className="w-4 h-4 text-blue-600" />
                ) : (
                  <User className="w-4 h-4 text-green-600" />
                )}
              </div>
              <div className={`flex flex-col max-w-[75%] ${
                (userType === 'lawyer' && message.sender === 'lawyer') ||
                (userType !== 'lawyer' && message.sender === 'user')
                  ? 'items-end'
                  : ''
              }`}>
                <div className={`px-3 py-2 rounded-2xl ${
                  (userType === 'lawyer' && message.sender === 'lawyer') ||
                  (userType !== 'lawyer' && message.sender === 'user')
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-gray-100 rounded-tl-sm'
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
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isInCall ? "Chat desabilitado durante chamada" : "Digite sua mensagem..."}
            className="flex-1 rounded-full"
            disabled={isInCall}
          />
          <Button type="submit" size="icon" className="rounded-full flex-shrink-0" disabled={isInCall}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}