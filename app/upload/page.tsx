"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"
import { Upload, FileText, AlertTriangle, CheckCircle, X, Download } from "lucide-react"

// Mock data
const mockUser = {
  id: 1,
  name: "João Silva",
  email: "joao.silva@empresa.com",
  role: "Administrador",
}

const mockProjects = [
  { id: 1, name: "Projeto Alpha" },
  { id: 2, name: "Projeto Beta" },
  { id: 3, name: "Projeto Gamma" },
]

const mockUploadedFiles = [
  {
    id: 1,
    name: "planta_baixa_v1.dwg",
    project: "Projeto Alpha",
    version: 1,
    uploadedBy: "Maria Santos",
    uploadedAt: "2024-01-15 14:30",
    status: "Aprovado",
    size: "2.5 MB",
  },
  {
    id: 2,
    name: "memorial_descritivo.pdf",
    project: "Projeto Alpha",
    version: 2,
    uploadedBy: "Pedro Costa",
    uploadedAt: "2024-01-14 09:15",
    status: "Pendente",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "planta_baixa_v2.dwg",
    project: "Projeto Beta",
    version: 1,
    uploadedBy: "Ana Lima",
    uploadedAt: "2024-01-13 16:45",
    status: "Rejeitado",
    size: "3.1 MB",
  },
]

interface UploadedFile {
  file: File
  project: string
  isDuplicate: boolean
  version: number
}

export default function UploadPage() {
  const [selectedProject, setSelectedProject] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (!selectedProject) {
      alert("Por favor, selecione um projeto antes de enviar arquivos")
      return
    }

    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProject) {
      alert("Por favor, selecione um projeto antes de enviar arquivos")
      return
    }

    if (e.target.files) {
      const files = Array.from(e.target.files)
      processFiles(files)
    }
  }

  const processFiles = (files: File[]) => {
    const validExtensions = [".dwg", ".pdf"]
    const validFiles = files.filter((file) => {
      const extension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))
      return validExtensions.includes(extension)
    })

    if (validFiles.length !== files.length) {
      alert("Apenas arquivos .dwg e .pdf são permitidos")
    }

    const processedFiles = validFiles.map((file) => {
      // Verificar duplicatas (simulação)
      const isDuplicate = mockUploadedFiles.some((existing) => existing.name.toLowerCase() === file.name.toLowerCase())

      // Calcular versão (simulação)
      const existingVersions = mockUploadedFiles.filter((existing) =>
        existing.name.toLowerCase().includes(file.name.toLowerCase().split(".")[0]),
      )
      const version = existingVersions.length + 1

      return {
        file,
        project: selectedProject,
        isDuplicate,
        version,
      }
    })

    setUploadedFiles([...uploadedFiles, ...processedFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      alert("Nenhum arquivo selecionado")
      return
    }

    setUploading(true)

    // Simulação de upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(`${uploadedFiles.length} arquivo(s) enviado(s) com sucesso!`)
    setUploadedFiles([])
    setUploading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Rejeitado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFileIcon = (filename: string) => {
    const extension = filename.toLowerCase().substring(filename.lastIndexOf("."))
    return <FileText className="h-5 w-5 text-blue-600" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={mockUser} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload de Arquivos</h1>
          <p className="text-gray-600 mt-2">Envie arquivos .dwg e .pdf para seus projetos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Novo Upload</CardTitle>
                <CardDescription>Selecione um projeto e envie seus arquivos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Projeto de Destino *</label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProjects.map((project) => (
                        <SelectItem key={project.id} value={project.name}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Arraste arquivos aqui ou clique para selecionar
                  </p>
                  <p className="text-sm text-gray-600 mb-4">Suporte para arquivos .dwg e .pdf (máx. 10MB cada)</p>
                  <input
                    type="file"
                    multiple
                    accept=".dwg,.pdf"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Selecionar Arquivos
                    </Button>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Arquivos Selecionados:</h4>
                    {uploadedFiles.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(item.file.name)}
                          <div>
                            <p className="font-medium">{item.file.name}</p>
                            <p className="text-sm text-gray-600">
                              {(item.file.size / 1024 / 1024).toFixed(2)} MB
                              {item.isDuplicate && (
                                <span className="ml-2 text-orange-600">• Arquivo duplicado (v{item.version})</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedFiles.some((f) => f.isDuplicate) && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Alguns arquivos são duplicatas. O sistema criará automaticamente uma nova versão.
                    </AlertDescription>
                  </Alert>
                )}

                <Button onClick={handleUpload} disabled={uploadedFiles.length === 0 || uploading} className="w-full">
                  {uploading ? "Enviando..." : `Enviar ${uploadedFiles.length} arquivo(s)`}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Files History */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Arquivos Recentes</CardTitle>
                <CardDescription>Histórico de uploads realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUploadedFiles.map((file) => (
                    <div key={file.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.name)}
                          <div>
                            <h4 className="font-medium">{file.name}</h4>
                            <p className="text-sm text-gray-600">
                              {file.project} • v{file.version} • {file.size}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(file.status)}>{file.status}</Badge>
                          {file.status === "Aprovado" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Por {file.uploadedBy}</p>
                          <p>{file.uploadedAt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
