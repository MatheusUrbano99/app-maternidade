"use client";

import { useState, useEffect } from "react";
import { Baby, Heart, Calendar, Camera, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "desenvolvimento" | "saude" | "alimentacao" | "sono" | "outro";
  photo?: string;
}

// Função para formatar data de forma consistente
const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function Home() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      date: "2024-01-15",
      title: "Primeiro Sorriso",
      description: "Hoje o bebê sorriu pela primeira vez! Foi um momento mágico e emocionante.",
      category: "desenvolvimento",
    },
    {
      id: "2",
      date: "2024-02-20",
      title: "Primeira Papinha",
      description: "Introdução alimentar começou! Experimentou cenoura e adorou.",
      category: "alimentacao",
    },
  ]);

  const [newMilestone, setNewMilestone] = useState({
    date: "",
    title: "",
    description: "",
    category: "desenvolvimento" as Milestone["category"],
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Evita hydration mismatch renderizando datas apenas no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.date) {
      const milestone: Milestone = {
        id: Date.now().toString(),
        ...newMilestone,
      };
      setMilestones([milestone, ...milestones]);
      setNewMilestone({
        date: "",
        title: "",
        description: "",
        category: "desenvolvimento",
      });
      setIsDialogOpen(false);
    }
  };

  const getCategoryColor = (category: Milestone["category"]) => {
    const colors = {
      desenvolvimento: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      saude: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      alimentacao: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      sono: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      outro: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    };
    return colors[category];
  };

  const getCategoryLabel = (category: Milestone["category"]) => {
    const labels = {
      desenvolvimento: "Desenvolvimento",
      saude: "Saúde",
      alimentacao: "Alimentação",
      sono: "Sono",
      outro: "Outro",
    };
    return labels[category];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-2 rounded-2xl">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Mamãe & Baby
                </h1>
                <p className="text-xs text-muted-foreground">Acompanhamento da Maternidade</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Heart className="w-4 h-4" />
              Perfil
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
              Módulo 1 - Linha do Tempo do Bebê
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Registre Cada Momento Especial
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Acompanhe o desenvolvimento do seu bebê, registre marcos importantes e crie memórias que durarão para sempre.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="timeline" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Linha do Tempo
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Baby className="w-4 h-4" />
              Estatísticas
            </TabsTrigger>
            <TabsTrigger value="photos" className="gap-2">
              <Camera className="w-4 h-4" />
              Galeria
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            {/* Add Milestone Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg">
                  <Plus className="w-5 h-5" />
                  Adicionar Novo Marco
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Registrar Novo Marco</DialogTitle>
                  <DialogDescription>
                    Adicione um momento especial na linha do tempo do seu bebê.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newMilestone.date}
                      onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Primeiro Sorriso"
                      value={newMilestone.title}
                      onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      value={newMilestone.category}
                      onChange={(e) => setNewMilestone({ ...newMilestone, category: e.target.value as Milestone["category"] })}
                    >
                      <option value="desenvolvimento">Desenvolvimento</option>
                      <option value="saude">Saúde</option>
                      <option value="alimentacao">Alimentação</option>
                      <option value="sono">Sono</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Conte mais sobre esse momento especial..."
                      rows={4}
                      value={newMilestone.description}
                      onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600" onClick={handleAddMilestone}>
                    Salvar Marco
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Timeline */}
            <div className="space-y-4">
              {milestones.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Baby className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum marco registrado ainda</h3>
                    <p className="text-muted-foreground mb-6">
                      Comece a registrar os momentos especiais do seu bebê!
                    </p>
                    <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Adicionar Primeiro Marco
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                milestones.map((milestone) => (
                  <Card key={milestone.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(milestone.category)}`}>
                              {getCategoryLabel(milestone.category)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {isMounted ? formatDate(milestone.date) : milestone.date}
                            </span>
                          </div>
                          <CardTitle className="text-xl">{milestone.title}</CardTitle>
                        </div>
                        <Heart className="w-5 h-5 text-pink-400 hover:text-pink-600 cursor-pointer transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{milestone.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas do Desenvolvimento</CardTitle>
                <CardDescription>Acompanhe o crescimento e evolução do seu bebê</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Baby className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Funcionalidade de estatísticas será implementada no próximo módulo
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Galeria de Fotos</CardTitle>
                <CardDescription>Todos os momentos capturados em um só lugar</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Funcionalidade de galeria será implementada no próximo módulo
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Mamãe & Baby - Acompanhamento da Maternidade © 2024
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Criado com 💗 para mães e bebês
          </p>
        </div>
      </footer>
    </div>
  );
}
