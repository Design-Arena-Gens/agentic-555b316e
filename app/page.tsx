'use client'

import { useState } from 'react'
import TemplateGallery from './components/TemplateGallery'
import CVEditor from './components/CVEditor'
import { templates } from './data/templates'

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      {selectedTemplate === null ? (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              CV Templates 2025
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Crea tu currículum profesional con nuestras 40 plantillas modernas y elegantes
            </p>
          </div>
          <TemplateGallery
            templates={templates}
            onSelectTemplate={setSelectedTemplate}
          />
        </div>
      ) : (
        <CVEditor
          template={templates[selectedTemplate - 1]}
          onBack={() => setSelectedTemplate(null)}
        />
      )}
    </main>
  )
}
