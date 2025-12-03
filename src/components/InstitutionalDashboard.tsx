import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Building2, Menu, TrendingUp, AlertTriangle, Users, FileText, LogOut, BarChart3 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface InstitutionalDashboardProps {
  userName: string;
  onLogout: () => void;
}

const casesByCategory = [
  { name: 'Trabalhista', value: 145, color: '#3b82f6' },
  { name: 'Consumidor', value: 98, color: '#10b981' },
  { name: 'Civil', value: 76, color: '#f59e0b' },
  { name: 'Outros', value: 86, color: '#8b5cf6' }
];

const casesByRegion = [
  { region: 'BH', casos: 156 },
  { region: 'Contagem', casos: 89 },
  { region: 'Betim', casos: 67 },
  { region: 'Interior', casos: 93 }
];

export function InstitutionalDashboard({ userName, onLogout }: InstitutionalDashboardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-full flex flex-col bg-gray-50 relative" data-sheet-container>
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-white truncate">{userName}</h2>
              <p className="text-blue-100 text-xs">Defensoria Pública</p>
            </div>
          </div>
          <button onClick={() => setShowMenu(!showMenu)} className="text-white p-2">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-white" />
              <span className="text-white text-xs">Total Casos</span>
            </div>
            <div className="text-white">405</div>
            <div className="text-green-200 text-xs">+12% mês</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-white" />
              <span className="text-white text-xs">Urgentes</span>
            </div>
            <div className="text-white">35</div>
            <div className="text-red-200 text-xs">Atenção</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-white text-xs">Resolução</span>
            </div>
            <div className="text-white">78%</div>
            <div className="text-green-200 text-xs">+5% mês</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-white" />
              <span className="text-white text-xs">Advogados</span>
            </div>
            <div className="text-white">47</div>
            <div className="text-blue-200 text-xs">Ativos</div>
          </div>
        </div>
      </div>

      {/* Side Menu Sheet */}
      <Sheet open={showMenu} onOpenChange={setShowMenu}>
        <SheetContent side="left" className="w-[280px] z-[9999]">
          <SheetHeader>
            <SheetTitle>Menu Institucional</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            <div className="mb-4 pb-4 border-b">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{userName}</p>
                  <p className="text-sm text-gray-500">Institucional</p>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost"
              className="w-full justify-start"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant="ghost"
              className="w-full justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              Filtros
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3 pb-3">
          {/* Pie Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Casos por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={casesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name.slice(0, 3)} ${(percent * 100).toFixed(0)}%`}
                  >
                    {casesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Casos por Região</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={casesByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" style={{ fontSize: '12px' }} />
                  <YAxis style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Bar dataKey="casos" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Urgent Cases */}
          <Card className="border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-4 h-4" />
                Padrões Críticos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm">Despejo irregular</h3>
                  <span className="text-red-600">12 casos</span>
                </div>
                <p className="text-xs text-gray-600">Contagem, MG</p>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm">Bloqueio em apps</h3>
                  <span className="text-red-600">8 casos</span>
                </div>
                <p className="text-xs text-gray-600">Belo Horizonte, MG</p>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm">Demissão irregular</h3>
                  <span className="text-red-600">15 casos</span>
                </div>
                <p className="text-xs text-gray-600">Betim, MG</p>
              </div>
            </CardContent>
          </Card>

          {/* Export Buttons */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Exportar Relatório PDF
            </Button>
            <Button className="w-full" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Exportar Planilha
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}