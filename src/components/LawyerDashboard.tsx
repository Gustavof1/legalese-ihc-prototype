import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Briefcase, Menu, Search, MapPin, AlertCircle, Filter, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import type { Case } from '../App';

interface LawyerDashboardProps {
  lawyerName: string;
  onSelectCase: (caseData: Case) => void;
  onLogout: () => void;
}

const mockCases: Case[] = [
  {
    id: '1',
    userName: 'Mariana Costa',
    category: 'Direito Trabalhista',
    summary: 'Dispensada sem carteira assinada, não recebeu direitos trabalhistas.',
    urgency: 'alta',
    location: 'Interior de MG',
    date: '19/11/2025',
    status: 'pending'
  },
  {
    id: '2',
    userName: 'João Silva',
    category: 'Dir. Consumidor',
    summary: 'Produto com defeito não trocado pela loja.',
    urgency: 'média',
    location: 'BH, MG',
    date: '18/11/2025',
    status: 'pending'
  },
  {
    id: '3',
    userName: 'Ana Santos',
    category: 'Direito Civil',
    summary: 'Recebeu notificação de despejo sem prazo adequado.',
    urgency: 'alta',
    location: 'Contagem, MG',
    date: '17/11/2025',
    status: 'pending'
  },
  {
    id: '4',
    userName: 'Matheus Souza',
    category: 'Direito Trabalhista',
    summary: 'Bloqueio injusto de conta em aplicativo de entrega.',
    urgency: 'alta',
    location: 'BH, MG',
    date: '19/11/2025',
    status: 'pending'
  }
];

export function LawyerDashboard({ lawyerName, onSelectCase, onLogout }: LawyerDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'média': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 relative" data-sheet-container>
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-white truncate">Olá, {lawyerName}</h2>
              <p className="text-blue-100 text-xs">Casos disponíveis</p>
            </div>
          </div>
          <button onClick={() => setShowMenu(!showMenu)} className="text-white p-2">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <div className="text-white text-xs">Disponíveis</div>
            <div className="text-white">4</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <div className="text-white text-xs">Em Andamento</div>
            <div className="text-white">0</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <div className="text-white text-xs">Resolvidos</div>
            <div className="text-white">0</div>
          </div>
        </div>
      </div>

      {/* Side Menu Sheet */}
      <Sheet open={showMenu} onOpenChange={setShowMenu}>
        <SheetContent side="left" className="w-[280px] z-[9999]">
          <SheetHeader>
            <SheetTitle>Menu do Advogado</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            <div className="mb-4 pb-4 border-b">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{lawyerName}</p>
                  <p className="text-sm text-gray-500">Advogado(a)</p>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost"
              className="w-full justify-start"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Meus Casos
            </Button>
            <Button 
              variant="ghost"
              className="w-full justify-start"
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar Casos
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
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search */}
      <div className="p-3 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar casos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>
      </div>

      {/* Cases List */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-3 pb-3">
          {mockCases.map((case_) => (
            <Card key={case_.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="flex-1 min-w-0 truncate">{case_.userName}</h3>
                  <Badge variant="outline" className="text-xs flex-shrink-0">{case_.category}</Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{case_.summary}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={`${getUrgencyColor(case_.urgency)} text-xs`}>
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {case_.urgency}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{case_.location}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => onSelectCase(case_)} 
                  className="w-full"
                  size="sm"
                >
                  Aceitar Caso
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}