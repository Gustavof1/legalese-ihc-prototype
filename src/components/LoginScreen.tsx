import { useState } from 'react';
import { Scale, User, Briefcase, Building2, UserCircle, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { UserType } from '../App';

interface LoginScreenProps {
  onLogin: (type: UserType, name: string) => void;
  onRegister: () => void;
}

export function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState('user');
  const [showExamples, setShowExamples] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleQuickAccess = (type: UserType, name: string) => {
    onLogin(type, name);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login
    onLogin('user', 'Usuário Logado');
  };

  if (showLoginForm) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto">
        <div className="flex-1 flex flex-col p-6">
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLoginForm(false)}
              className="mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-3">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-blue-900 mb-2">Legalese</h1>
            <p className="text-gray-600">
              Entre na sua conta
            </p>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Login</CardTitle>
              <CardDescription className="text-xs">
                Digite suas credenciais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="[contact omitted]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-4">
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto">
      <div className="flex-1 flex flex-col p-6">
        <div className="text-center mb-6 mt-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-3">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-blue-900 mb-2">Legalese</h1>
          <p className="text-gray-600">
            Acesso à justiça para todos
          </p>
        </div>

        <div className="space-y-3 mt-8">
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => setShowLoginForm(true)}
          >
            Login
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            size="lg"
            onClick={onRegister}
          >
            Criar Nova Conta
          </Button>

          <Button
            variant="ghost"
            className="w-full text-gray-500 text-sm mt-4"
            onClick={() => setShowExamples(!showExamples)}
          >
            Perfis de Exemplo
            {showExamples ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
          </Button>
        </div>

        {showExamples && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="user" className="text-xs">
                  Cidadão
                </TabsTrigger>
                <TabsTrigger value="lawyer" className="text-xs">
                  Advogado
                </TabsTrigger>
                <TabsTrigger value="institutional" className="text-xs">
                  Institucional
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="mt-0">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Acesso para Cidadãos</CardTitle>
                    <CardDescription className="text-xs">
                      Orientação jurídica gratuita
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      className="w-full justify-start h-auto py-3"
                      onClick={() => handleQuickAccess('user', 'Mariana Costa')}
                    >
                      <div className="flex items-start gap-3 text-left">
                        <UserCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <div>Mariana Costa</div>
                          <div className="text-xs opacity-90">Diarista - Problema trabalhista</div>
                        </div>
                      </div>
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start h-auto py-3"
                      onClick={() => handleQuickAccess('user', 'Matheus Souza')}
                    >
                      <div className="flex items-start gap-3 text-left">
                        <UserCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <div>Matheus Souza</div>
                          <div className="text-xs opacity-70">Entregador - Bloqueio de app</div>
                        </div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lawyer" className="mt-0">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Acesso para Advogados</CardTitle>
                    <CardDescription className="text-xs">
                      Ajude quem precisa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full justify-start h-auto py-3"
                      onClick={() => handleQuickAccess('lawyer', 'Luiza Lima')}
                    >
                      <div className="flex items-start gap-3 text-left">
                        <Briefcase className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <div>Luiza Lima</div>
                          <div className="text-xs opacity-90">Advogada - Dir. Trabalhista</div>
                        </div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="institutional" className="mt-0">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Acesso Institucional</CardTitle>
                    <CardDescription className="text-xs">
                      Análise de dados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full justify-start h-auto py-3"
                      onClick={() => handleQuickAccess('institutional', 'Carlos Teixeira')}
                    >
                      <div className="flex items-start gap-3 text-left">
                        <Building2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <div>Carlos Teixeira</div>
                          <div className="text-xs opacity-90">Defensor Público</div>
                        </div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}