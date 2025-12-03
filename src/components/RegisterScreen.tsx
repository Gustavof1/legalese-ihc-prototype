import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Scale, ArrowLeft } from 'lucide-react';
import type { UserType } from '../App';

interface RegisterScreenProps {
  onRegister: (type: UserType, name: string) => void;
  onBackToLogin: () => void;
}

export function RegisterScreen({ onRegister, onBackToLogin }: RegisterScreenProps) {
  const [accountType, setAccountType] = useState<UserType>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [oab, setOab] = useState('');
  const [practiceArea, setPracticeArea] = useState('');
  const [credentials, setCredentials] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountType && name.trim()) {
      onRegister(accountType, name);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto">
      <div className="flex-1 flex flex-col p-6">
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToLogin}
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
            Crie sua conta
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Cadastro</CardTitle>
            <CardDescription className="text-xs">
              Preencha os dados abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" onValueChange={(value) => setAccountType(value as UserType)} className="w-full mb-4">
              <TabsList className="grid w-full grid-cols-3 h-auto">
                <TabsTrigger value="user" className="text-xs whitespace-normal h-auto py-2">Sou Cidadão</TabsTrigger>
                <TabsTrigger value="lawyer" className="text-xs whitespace-normal h-auto py-2">Sou Advogado</TabsTrigger>
                <TabsTrigger value="institutional" className="text-xs whitespace-normal h-auto py-2">Sou Colaborador</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="cpf" className="text-xs">CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

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

              {accountType === 'lawyer' && (
                <>
                  <div className="space-y-1">
                    <Label htmlFor="oab" className="text-xs">OAB</Label>
                    <Input
                      id="oab"
                      type="text"
                      placeholder="Número da OAB"
                      value={oab}
                      onChange={(e) => setOab(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="practiceArea" className="text-xs">Área de Atuação</Label>
                    <Input
                      id="practiceArea"
                      type="text"
                      placeholder="Ex: Direito Civil, Penal..."
                      value={practiceArea}
                      onChange={(e) => setPracticeArea(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {accountType === 'institutional' && (
                <div className="space-y-1">
                  <Label htmlFor="credentials" className="text-xs">Credenciais de Colaborador</Label>
                  <Input
                    id="credentials"
                    type="text"
                    placeholder="ID ou Código de Acesso"
                    value={credentials}
                    onChange={(e) => setCredentials(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full mt-4"
                disabled={!accountType || !name.trim()}
              >
                Criar Conta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}