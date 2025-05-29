"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Building2 } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validação básica
    if (!email.includes("@") || !email.includes(".")) {
      setError("Por favor, insira um e-mail corporativo válido")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setLoading(false)
      return
    }

    // Simulação de autenticação - em produção seria uma chamada para API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock de usuários válidos
      const validUsers = [
        { email: "admin@empresa.com", password: "admin123", role: "Administrador" },
        { email: "gestor@empresa.com", password: "gestor123", role: "Gestor" },
        { email: "projetista@empresa.com", password: "proj123", role: "Projetista" },
      ]

      const user = validUsers.find((u) => u.email === email && u.password === password)

      if (user) {
        localStorage.setItem("axionpro_auth", "true")
        localStorage.setItem("axionpro_user", JSON.stringify(user))
        router.push("/")
      } else {
        setError("E-mail ou senha incorretos")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">AxionPro</CardTitle>
          <CardDescription>Sistema de Gestão de Projetos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail Corporativo</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-2">Usuários de teste:</p>
            <div className="text-xs space-y-1">
              <p>
                <strong>Admin:</strong> admin@empresa.com / admin123
              </p>
              <p>
                <strong>Gestor:</strong> gestor@empresa.com / gestor123
              </p>
              <p>
                <strong>Projetista:</strong> projetista@empresa.com / proj123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
