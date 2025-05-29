"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, FolderOpen, Upload, BarChart3, Clock, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"

// Mock data - em produção viria de uma API
const mockUser = {
  id: 1,
  name: "João Silva",
  email: "joao.silva@empresa.com",
  role: "Administrador",
}

const mockStats = {
  totalProjects: 12,
  activeProjects: 8,
  completedProjects: 4,
  totalUsers: 25,
  filesUploaded: 156,
  pendingApprovals: 7,
}

const mockRecentProjects = [
  { id: 1, name: "Projeto Alpha", status: "Em Andamento", progress: 75, priority: "Alta" },
  { id: 2, name: "Projeto Beta", status: "Revisão", progress: 90, priority: "Média" },
  { id: 3, name: "Projeto Gamma", status: "Iniciado", progress: 25, priority: "Baixa" },
  { id: 4, name: "Projeto Delta", status: "Concluído", progress: 100, priority: "Alta" },
]

const mockRecentActivity = [
  { id: 1, user: "Maria Santos", action: "enviou arquivo", project: "Projeto Alpha", time: "2 horas atrás" },
  { id: 2, user: "Pedro Costa", action: "aprovou revisão", project: "Projeto Beta", time: "4 horas atrás" },
  { id: 3, user: "Ana Lima", action: "criou projeto", project: "Projeto Epsilon", time: "1 dia atrás" },
  { id: 4, user: "Carlos Oliveira", action: "solicitou ajustes", project: "Projeto Gamma", time: "2 dias atrás" },
]

export default function Dashboard() {
  const [user, setUser] = useState(mockUser)
  const router = useRouter()

  useEffect(() => {
    // Verificar autenticação
    const isAuthenticated = localStorage.getItem("axionpro_auth")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

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
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Bem-vindo ao AxionPro, {user.name}</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
              <FolderOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeProjects}</div>
              <p className="text-xs text-gray-600">+2 desde o mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
              <p className="text-xs text-gray-600">+3 novos usuários</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Arquivos Enviados</CardTitle>
              <Upload className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.filesUploaded}</div>
              <p className="text-xs text-gray-600">+12 esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aprovações Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingApprovals}</div>
              <p className="text-xs text-gray-600">Requer atenção</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projetos Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Projetos Recentes
              </CardTitle>
              <CardDescription>Acompanhe o progresso dos seus projetos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{project.name}</h4>
                        <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Atividade Recente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Atividade Recente
              </CardTitle>
              <CardDescription>Últimas ações realizadas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action} em{" "}
                        <span className="font-medium">{activity.project}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2" variant="outline" onClick={() => router.push("/projects")}>
                <FolderOpen className="h-6 w-6" />
                Criar Projeto
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline" onClick={() => router.push("/upload")}>
                <Upload className="h-6 w-6" />
                Upload de Arquivos
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline" onClick={() => router.push("/reports")}>
                <BarChart3 className="h-6 w-6" />
                Relatórios
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline" onClick={() => router.push("/users")}>
                <Users className="h-6 w-6" />
                Gerenciar Usuários
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
