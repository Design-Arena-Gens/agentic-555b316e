'use client'

import { Template } from '../data/templates'
import { useState } from 'react'

interface TemplateGalleryProps {
  templates: Template[]
  onSelectTemplate: (id: number) => void
}

export default function TemplateGallery({ templates, onSelectTemplate }: TemplateGalleryProps) {
  const [filter, setFilter] = useState<string>('Todos')

  const categories = ['Todos', ...Array.from(new Set(templates.map(t => t.category)))]

  const filteredTemplates = filter === 'Todos'
    ? templates
    : templates.filter(t => t.category === filter)

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === cat
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className="cv-preview bg-white rounded-lg overflow-hidden cursor-pointer"
          >
            <div
              className="h-48 flex items-center justify-center text-white font-bold text-2xl"
              style={{ backgroundColor: template.color }}
            >
              CV #{template.id}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{template.category}</p>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-500">
        Mostrando {filteredTemplates.length} de {templates.length} plantillas
      </div>
    </div>
  )
}
