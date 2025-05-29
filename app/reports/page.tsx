"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Navbar } from "@/components/navbar"
import { Download, TrendingUp, Users, FileText, Clock, Calendar } from "lucide-react"

// Mock data
const mockUser = {
  id: 1,
  name: "João Silva",
  email: "joao.silva@empresa.com",
  role: "Administrador",
}

const monthlyData = [
  { month: "Jan", uploads: 12, approvals: 8, rejections: 2 },
  { month: "Fev", uploads: 18, approvals: 15, rejections: 1 },
  { month: "Mar", uploads: 25, approvals: 20, rejections: 3 },
  { month: "Abr", uploads: 22, approvals: 18, rejections: 2 },
  { month: "Mai", uploads: 30, approvals: 25, rejections: 4 },
]

const userPerformanceData = [
  { name: "Maria Santos", uploads: 45, approvals: 38, efficiency: 84 },
  { name: "Pedro Costa", uploads: 32, approvals: 28, efficiency: 88 },
  { name: "Ana Lima", uploads: 28, approvals: 25, efficiency: 89 },
  { name: "Carlos Oliveira", uploads: 22, approvals: 18, efficiency: 82 },
]

const projectStatusData = [
  { name: "Concluído", value: 4, color: "#10b981" },
  { name: "Em Andamento", value: 8, color: "#3b82f6" },
  { name: "Revisão", value: 3, color: "#f59e0b" },
  { name: "Iniciado", value: 2, color: "#6b7280" },
]

const fileTypeData = [
  { type: "DWG", count: 89, percentage: 65 },
  { type: "PDF", count: 48, percentage: 35 },
]

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-month")
  const [selectedUser, setSelectedUser] = useState("all")

  const exportReport = () => {
    alert("Relatório exportado com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={mockUser} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600 mt-2">Acompanhe métricas e evolução dos projetos</p>
          </div>

          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-week">Última semana</SelectItem>
                <SelectItem value="last-month">Último mês</SelectItem>
                <SelectItem value="last-quarter">Último trimestre</SelectItem>
                <SelectItem value="last-year">Último ano</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={exportReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Uploads</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">137</div>
              <p className="text-xs text-green-600">+12% desde o mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86%</div>
              <p className="text-xs text-green-600">+3% desde o mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-gray-600">Sem alteração</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio de Aprovação</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3d</div>
              <p className="text-xs text-green-600">-0.5d desde o mês passado</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Uploads Mensais */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal</CardTitle>
              <CardDescription>Uploads, aprovações e rejeições por mês</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  uploads: { label: "Uploads", color: "#3b82f6" },
                  approvals: { label: "Aprovações", color: "#10b981" },
                  rejections: { label: "Rejeições", color: "#ef4444" },
                }}
                className="h-80"
              >
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="uploads" fill="var(--color-uploads)" />
                  <Bar dataKey="approvals" fill="var(--color-approvals)" />
                  <Bar dataKey="rejections" fill="var(--color-rejections)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Status dos Projetos */}
          <Card>
            <CardHeader>
              <CardTitle>Status dos Projetos</CardTitle>
              <CardDescription>Distribuição atual dos projetos por status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance por Usuário */}
          <Card>
            <CardHeader>
              <CardTitle>Performance por Usuário</CardTitle>
              <CardDescription>Uploads e taxa de aprovação por usuário</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userPerformanceData.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-600">
                        {user.uploads} uploads • {user.approvals} aprovações
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          user.efficiency >= 85
                            ? "bg-green-100 text-green-800"
                            : user.efficiency >= 80
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {user.efficiency}% eficiência
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tipos de Arquivo */}
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Arquivo</CardTitle>
              <CardDescription>Distribuição dos arquivos por tipo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {fileTypeData.map((type, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{type.type}</span>
                      <span className="text-sm text-gray-600">
                        {type.count} arquivos ({type.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${type.percentage}%` }}></div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">89</div>
                      <div className="text-sm text-gray-600">Arquivos DWG</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">48</div>
                      <div className="text-sm text-gray-600">Arquivos PDF</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
