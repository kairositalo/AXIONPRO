"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
import { Plus, Search, Filter, MoreHorizontal, Users, Calendar, FileText } from "lucide-react"

// Mock data
const mockUser = {
  id: 1,
  name: "João Silva",
  email: "joao.silva@empresa.com",
  role: "Administrador",
}

const mockProjects = [
  {
    id: 1,
    name: "Projeto Alpha",
    description: "Desenvolvimento de sistema de gestão",
    priority: "Alta",
    status: "Em Andamento",
    progress: 75,
    createdAt: "2024-01-15",
    assignedUsers: ["Maria Santos", "Pedro Costa"],
    filesCount: 12,
  },
  {
    id: 2,
    name: "Projeto Beta",
    description: "Implementação de nova infraestrutura",
    priority: "Média",
    status: "Revisão",
    progress: 90,
    createdAt: "2024-01-10",
    assignedUsers: ["Ana Lima"],
    filesCount: 8,
  },
  {
    id: 3,
    name: "Projeto Gamma",
    description: "Modernização do sistema legado",
    priority: "Baixa",
    status: "Iniciado",
    progress: 25,
    createdAt: "2024-01-20",
    assignedUsers: ["Carlos Oliveira", "Maria Santos"],
    filesCount: 3,
  },
]

const mockUsers = [
  { id: 1, name: "Maria Santos", role: "Projetista" },
  { id: 2, name: "Pedro Costa", role: "Analista" },
  { id: 3, name: "Ana Lima", role: "Especialista" },
  { id: 4, name: "Carlos Oliveira", role: "Técnico" },
]

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "",
    assignedUsers: [] as string[],
  })

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.description || !newProject.priority) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    const project = {
      id: projects.length + 1,
      ...newProject,
      status: "Iniciado",
      progress: 0,
      createdAt: new Date().toISOString().split("T")[0],
      filesCount: 0,
    }

    setProjects([...projects, project])
    setNewProject({ name: "", description: "", priority: "", assignedUsers: [] })
    setIsCreateDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800"
      case "Em Andamento":
        return "bg-blue-100 text-blue-800"
      case "Revisão":
        return "bg-yellow-100 text-yellow-800"
      case "Iniciado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800"
      case "Média":
        return "bg-yellow-100 text-yellow-800"
      case "Baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={mockUser} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
            <p className="text-gray-600 mt-2">Gerencie todos os seus projetos</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Projeto</DialogTitle>
                <DialogDescription>Preencha as informações do projeto</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Projeto *</Label>
                  <Input
                    id="name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Digite o nome do projeto"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Descreva o projeto"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Prioridade *</Label>
                  <Select
                    value={newProject.priority}
                    onValueChange={(value) => setNewProject({ ...newProject, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Média">Média</SelectItem>
                      <SelectItem value="Baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Usuários Alocados</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {mockUsers.map((user) => (
                      <label key={user.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newProject.assignedUsers.includes(user.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewProject({
                                ...newProject,
                                assignedUsers: [...newProject.assignedUsers, user.name],
                              })
                            } else {
                              setNewProject({
                                ...newProject,
                                assignedUsers: newProject.assignedUsers.filter((name) => name !== user.name),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{user.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateProject} className="flex-1">
                    Criar Projeto
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros e Busca */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar projetos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Iniciado">Iniciado</SelectItem>
                    <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                    <SelectItem value="Revisão">Revisão</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Projetos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{project.assignedUsers.length} usuários</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{project.filesCount} arquivos</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Criado em {new Date(project.createdAt).toLocaleDateString("pt-BR")}</span>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-gray-600 mb-2">Equipe:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.assignedUsers.map((user, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {user}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500">Nenhum projeto encontrado</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
