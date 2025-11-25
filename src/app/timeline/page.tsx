"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, X, Heart, Pencil, Trash, Brain, Stethoscope, Utensils, Moon, Sparkles } from "lucide-react";
import { BabyMilestone } from "@/types/milestones";

const STORAGE_KEY = "baby-milestones";

type Category = "todos" | "desenvolvimento" | "saúde" | "alimentação" | "sono" | "outro";

export default function TimelinePage() {
  const [milestones, setMilestones] = useState<BabyMilestone[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [milestoneToDelete, setMilestoneToDelete] = useState<string | null>(null);
  const [editingMilestone, setEditingMilestone] = useState<BabyMilestone | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("todos");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "desenvolvimento" as BabyMilestone["category"],
  });

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMilestones(parsed);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar marcos do localStorage:", error);
      // Se houver erro no parse, mantém o array vazio
    }
  }, []);

  // Atualizar localStorage sempre que milestones mudar
  useEffect(() => {
    if (milestones.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
      } catch (error) {
        console.error("Erro ao salvar marcos no localStorage:", error);
      }
    }
  }, [milestones]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMilestone) {
      // Modo edição: atualizar marco existente
      setMilestones(prevMilestones =>
        prevMilestones.map(milestone =>
          milestone.id === editingMilestone.id
            ? {
                ...milestone,
                title: formData.title,
                description: formData.description,
                date: formData.date,
                category: formData.category,
              }
            : milestone
        )
      );
      setEditingMilestone(null);
    } else {
      // Modo criação: adicionar novo marco
      const newMilestone: BabyMilestone = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        date: formData.date,
        category: formData.category,
        favorite: false,
      };
      setMilestones([...milestones, newMilestone]);
    }

    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      date: "",
      category: "desenvolvimento",
    });
  };

  // Abrir modal para edição
  const handleEdit = (milestone: BabyMilestone) => {
    setEditingMilestone(milestone);
    setFormData({
      title: milestone.title,
      description: milestone.description,
      date: milestone.date,
      category: milestone.category,
    });
    setIsModalOpen(true);
  };

  // Fechar modal e limpar estado de edição
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMilestone(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      category: "desenvolvimento",
    });
  };

  // Abrir modal de confirmação de exclusão
  const handleDeleteClick = (id: string) => {
    setMilestoneToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Confirmar exclusão
  const handleConfirmDelete = () => {
    if (milestoneToDelete) {
      setMilestones(prevMilestones =>
        prevMilestones.filter(milestone => milestone.id !== milestoneToDelete)
      );
      setMilestoneToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  // Cancelar exclusão
  const handleCancelDelete = () => {
    setMilestoneToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // Alternar favorito
  const toggleFavorite = (id: string) => {
    setMilestones(prevMilestones =>
      prevMilestones.map(milestone =>
        milestone.id === id
          ? { ...milestone, favorite: !milestone.favorite }
          : milestone
      )
    );
  };

  // Filtrar marcos
  const filteredMilestones = milestones.filter(milestone => {
    // Filtro de categoria
    const categoryMatch = selectedCategory === "todos" || milestone.category === selectedCategory;
    
    // Filtro de favoritos
    const favoriteMatch = !showOnlyFavorites || milestone.favorite === true;
    
    return categoryMatch && favoriteMatch;
  });

  // Ordenar marcos por data (mais recentes primeiro)
  const sortedMilestones = [...filteredMilestones].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Ícone por categoria
  const getCategoryIcon = (category: string) => {
    const icons = {
      desenvolvimento: Brain,
      saúde: Stethoscope,
      alimentação: Utensils,
      sono: Moon,
      outro: Sparkles,
    };
    const IconComponent = icons[category as keyof typeof icons] || Sparkles;
    return <IconComponent className="w-5 h-5" />;
  };

  // Cores suaves por categoria
  const getCategoryColor = (category: string) => {
    const colors = {
      desenvolvimento: "bg-blue-100 text-blue-700 border-blue-200",
      saúde: "bg-green-100 text-green-700 border-green-200",
      alimentação: "bg-orange-100 text-orange-700 border-orange-200",
      sono: "bg-purple-100 text-purple-700 border-purple-200",
      outro: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[category as keyof typeof colors] || colors.outro;
  };

  // Gradiente suave por categoria
  const getCategoryGradient = (category: string) => {
    const gradients = {
      desenvolvimento: "from-blue-50 to-blue-100/50",
      saúde: "from-green-50 to-green-100/50",
      alimentação: "from-orange-50 to-orange-100/50",
      sono: "from-purple-50 to-purple-100/50",
      outro: "from-gray-50 to-gray-100/50",
    };
    return gradients[category as keyof typeof gradients] || gradients.outro;
  };

  // Formatar data no formato brasileiro
  const formatDateBR = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const categories: { value: Category; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "desenvolvimento", label: "Desenvolvimento" },
    { value: "saúde", label: "Saúde" },
    { value: "alimentação", label: "Alimentação" },
    { value: "sono", label: "Sono" },
    { value: "outro", label: "Outro" },
  ];

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 bg-gradient-to-b from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Linha do Tempo
      </h1>

      {/* Filtros */}
      <div className="mb-8 space-y-4">
        {/* Filtro de categorias */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat.value
                  ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filtro de favoritos */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              showOnlyFavorites
                ? "bg-pink-500 text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-600"
            }`}
          >
            <Heart className={`w-4 h-4 ${showOnlyFavorites ? "fill-current" : ""}`} />
            Só favoritos
          </button>
        </div>
      </div>

      {sortedMilestones.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-full p-6 mb-4 shadow-sm">
            <Calendar className="w-12 h-12 text-pink-300 dark:text-pink-500" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
            {showOnlyFavorites || selectedCategory !== "todos"
              ? "Nenhum marco encontrado com os filtros selecionados"
              : "Nenhum marco adicionado ainda"}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-2 max-w-sm">
            {showOnlyFavorites || selectedCategory !== "todos"
              ? "Tente ajustar os filtros para ver mais marcos"
              : "Comece a registrar os momentos especiais do seu bebê"}
          </p>
        </div>
      ) : (
        <div className="relative max-w-4xl mx-auto w-full">
          {/* Linha vertical da timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-blue-200 to-purple-200 dark:from-pink-800 dark:via-blue-800 dark:to-purple-800" />

          <div className="space-y-8">
            {sortedMilestones.map((milestone, index) => (
              <div key={milestone.id} className="relative flex items-start gap-6 pl-0">
                {/* Bolinha marcadora */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-pink-300 dark:border-pink-600 shadow-lg flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-blue-400" />
                  </div>
                </div>

                {/* Card do marco */}
                <div 
                  className={`flex-1 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 bg-gradient-to-br ${
                    milestone.favorite
                      ? "from-pink-50 via-white to-rose-50 dark:from-pink-900/20 dark:via-gray-800 dark:to-rose-900/20 border-pink-300 dark:border-pink-600"
                      : `${getCategoryGradient(milestone.category)} dark:from-gray-800 dark:to-gray-800 border-gray-200 dark:border-gray-700`
                  }`}
                >
                  {/* Badge de categoria com ícone */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(milestone.category)}`}>
                      {getCategoryIcon(milestone.category)}
                      <span>{milestone.category}</span>
                    </div>
                    
                    {/* Botões de ação */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(milestone)}
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        aria-label="Editar marco"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(milestone.id)}
                        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          milestone.favorite
                            ? "text-pink-500 hover:text-pink-600 bg-pink-100 dark:bg-pink-900/30"
                            : "text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                        }`}
                        aria-label={milestone.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        <Heart 
                          className={`w-5 h-5 transition-all ${milestone.favorite ? "fill-current" : ""}`}
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(milestone.id)}
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        aria-label="Excluir marco"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {milestone.title}
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {milestone.description}
                  </p>
                  
                  {/* Data formatada */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={milestone.date}>
                      {formatDateBR(milestone.date)}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAB - Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-40"
        aria-label="Adicionar marco"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal de Criação/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingMilestone ? "Editar Marco" : "Novo Marco"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Descrição
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Data
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Categoria
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as BabyMilestone["category"],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="desenvolvimento">Desenvolvimento</option>
                  <option value="saúde">Saúde</option>
                  <option value="alimentação">Alimentação</option>
                  <option value="sono">Sono</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white rounded-lg transition-colors"
                >
                  {editingMilestone ? "Salvar Alterações" : "Criar Marco"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Excluir marco
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tem certeza que deseja excluir este marco? Essa ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
