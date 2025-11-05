'use client'

import { Template } from '../data/templates'
import { useRef } from 'react'

interface CVData {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  experience: Array<{
    title: string
    company: string
    period: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  skills: string[]
}

interface CVPreviewProps {
  template: Template
  cvData: CVData
}

export default function CVPreview({ template, cvData }: CVPreviewProps) {
  const cvRef = useRef<HTMLDivElement>(null)

  const downloadPDF = async () => {
    if (!cvRef.current) return

    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`CV-${cvData.fullName.replace(/\s+/g, '-')}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error al generar el PDF. Por favor, intenta de nuevo.')
    }
  }

  const renderTemplate = () => {
    const templateId = template.id % 10

    switch (templateId) {
      case 1:
        return <Template1 cvData={cvData} color={template.color} />
      case 2:
        return <Template2 cvData={cvData} color={template.color} />
      case 3:
        return <Template3 cvData={cvData} color={template.color} />
      case 4:
        return <Template4 cvData={cvData} color={template.color} />
      case 5:
        return <Template5 cvData={cvData} color={template.color} />
      case 6:
        return <Template6 cvData={cvData} color={template.color} />
      case 7:
        return <Template7 cvData={cvData} color={template.color} />
      case 8:
        return <Template8 cvData={cvData} color={template.color} />
      case 9:
        return <Template9 cvData={cvData} color={template.color} />
      case 0:
        return <Template10 cvData={cvData} color={template.color} />
      default:
        return <Template1 cvData={cvData} color={template.color} />
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={downloadPDF}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold shadow-lg"
      >
        📄 Descargar PDF
      </button>
      <div
        ref={cvRef}
        className="bg-white shadow-xl"
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        {renderTemplate()}
      </div>
    </div>
  )
}

// Template 1: Minimalista
function Template1({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div className="p-12">
      <div className="border-b-4 pb-6 mb-6" style={{ borderColor: color }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color }}>{cvData.fullName}</h1>
        <p className="text-xl text-gray-600 mb-4">{cvData.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>📧 {cvData.email}</span>
          <span>📱 {cvData.phone}</span>
          <span>📍 {cvData.location}</span>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3" style={{ color }}>Resumen Profesional</h2>
        <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3" style={{ color }}>Experiencia Laboral</h2>
        {cvData.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <h3 className="font-bold text-lg">{exp.title}</h3>
            <p className="text-gray-600">{exp.company} | {exp.period}</p>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3" style={{ color }}>Educación</h2>
        {cvData.education.map((edu, i) => (
          <div key={i} className="mb-3">
            <h3 className="font-bold">{edu.degree}</h3>
            <p className="text-gray-600">{edu.institution} | {edu.year}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3" style={{ color }}>Habilidades</h2>
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  )
}

// Template 2: Two Column
function Template2({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div className="flex">
      <div className="w-1/3 p-8 text-white" style={{ backgroundColor: color }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{cvData.fullName}</h1>
          <p className="text-lg opacity-90">{cvData.title}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b border-white/30 pb-2">Contacto</h2>
          <div className="space-y-2 text-sm">
            <p>{cvData.email}</p>
            <p>{cvData.phone}</p>
            <p>{cvData.location}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b border-white/30 pb-2">Habilidades</h2>
          <div className="space-y-2">
            {cvData.skills.map((skill, i) => (
              <div key={i} className="text-sm">{skill}</div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 border-b border-white/30 pb-2">Educación</h2>
          {cvData.education.map((edu, i) => (
            <div key={i} className="mb-3 text-sm">
              <p className="font-semibold">{edu.degree}</p>
              <p className="opacity-90">{edu.institution}</p>
              <p className="opacity-75">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-2/3 p-8">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3" style={{ color }}>Resumen</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3" style={{ color }}>Experiencia</h2>
          {cvData.experience.map((exp, i) => (
            <div key={i} className="mb-5">
              <h3 className="font-bold text-lg">{exp.title}</h3>
              <p className="text-gray-600 mb-2">{exp.company} | {exp.period}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

// Template 3: Modern Header
function Template3({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div>
      <div className="text-white p-12" style={{ backgroundColor: color }}>
        <h1 className="text-5xl font-bold mb-2">{cvData.fullName}</h1>
        <p className="text-2xl mb-4 opacity-90">{cvData.title}</p>
        <div className="flex gap-6 text-sm">
          <span>{cvData.email}</span>
          <span>{cvData.phone}</span>
          <span>{cvData.location}</span>
        </div>
      </div>

      <div className="p-12">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color }}>SOBRE MÍ</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color }}>EXPERIENCIA PROFESIONAL</h2>
          {cvData.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-lg">{exp.title}</h3>
                <span className="text-gray-500 text-sm">{exp.period}</span>
              </div>
              <p className="text-gray-600 mb-2">{exp.company}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color }}>EDUCACIÓN</h2>
            {cvData.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500 text-sm">{edu.year}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color }}>HABILIDADES</h2>
            <div className="space-y-2">
              {cvData.skills.map((skill, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Template 4: Clean Professional
function Template4({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div className="p-12">
      <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: color }}>
        <h1 className="text-5xl font-bold mb-3" style={{ color }}>{cvData.fullName}</h1>
        <p className="text-xl text-gray-600 mb-4">{cvData.title}</p>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <span>{cvData.email}</span>
          <span>•</span>
          <span>{cvData.phone}</span>
          <span>•</span>
          <span>{cvData.location}</span>
        </div>
      </div>

      <section className="mb-8">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-gray-700 leading-relaxed text-center italic">{cvData.summary}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color }}>Experiencia Profesional</h2>
        <div className="space-y-6">
          {cvData.experience.map((exp, i) => (
            <div key={i} className="border-l-4 pl-4" style={{ borderColor: color }}>
              <h3 className="font-bold text-lg">{exp.title}</h3>
              <p className="text-gray-600 mb-2">{exp.company} • {exp.period}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color }}>Formación Académica</h2>
        <div className="space-y-4">
          {cvData.education.map((edu, i) => (
            <div key={i}>
              <h3 className="font-bold text-lg">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution} • {edu.year}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color }}>Competencias</h2>
        <div className="grid grid-cols-2 gap-3">
          {cvData.skills.map((skill, i) => (
            <div key={i} className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: color }}></div>
              <span className="text-gray-700">{skill}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Template 5: Modern Grid
function Template5({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="col-span-2 p-12">
          <h1 className="text-5xl font-bold mb-2" style={{ color }}>{cvData.fullName}</h1>
          <p className="text-2xl text-gray-600 mb-6">{cvData.title}</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase" style={{ color }}>Perfil</h2>
            <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase" style={{ color }}>Experiencia</h2>
            {cvData.experience.map((exp, i) => (
              <div key={i} className="mb-5">
                <h3 className="font-bold text-lg">{exp.title}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                <p className="text-gray-700 text-sm">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="p-8 text-white" style={{ backgroundColor: color }}>
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 uppercase">Contacto</h2>
            <div className="space-y-3 text-sm">
              <p className="break-all">{cvData.email}</p>
              <p>{cvData.phone}</p>
              <p>{cvData.location}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 uppercase">Educación</h2>
            {cvData.education.map((edu, i) => (
              <div key={i} className="mb-4 text-sm">
                <p className="font-semibold">{edu.degree}</p>
                <p className="opacity-90">{edu.institution}</p>
                <p className="opacity-75">{edu.year}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 uppercase">Habilidades</h2>
            <div className="space-y-2 text-sm">
              {cvData.skills.map((skill, i) => (
                <p key={i}>{skill}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Template 6: Executive
function Template6({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div className="p-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-6xl font-bold mb-2" style={{ color }}>{cvData.fullName}</h1>
          <p className="text-2xl text-gray-600">{cvData.title}</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>{cvData.email}</p>
          <p>{cvData.phone}</p>
          <p>{cvData.location}</p>
        </div>
      </div>

      <div className="h-1 mb-8" style={{ backgroundColor: color }}></div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color }}>EXECUTIVE SUMMARY</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{cvData.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color }}>PROFESSIONAL EXPERIENCE</h2>
        {cvData.experience.map((exp, i) => (
          <div key={i} className="mb-6">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-xl">{exp.title}</h3>
              <span className="text-gray-500">{exp.period}</span>
            </div>
            <p className="font-semibold text-gray-600 mb-2">{exp.company}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color }}>EDUCATION</h2>
          {cvData.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-bold text-lg">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500">{edu.year}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color }}>CORE COMPETENCIES</h2>
          <ul className="space-y-2">
            {cvData.skills.map((skill, i) => (
              <li key={i} className="text-gray-700">• {skill}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

// Template 7: Creative
function Template7({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div>
      <div className="relative h-64 flex items-center justify-center text-white" style={{ backgroundColor: color }}>
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-3">{cvData.fullName}</h1>
          <p className="text-3xl font-light">{cvData.title}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 50%, 0 0)' }}></div>
      </div>

      <div className="p-12">
        <div className="flex justify-center gap-8 mb-8 text-sm text-gray-600">
          <span>{cvData.email}</span>
          <span>{cvData.phone}</span>
          <span>{cvData.location}</span>
        </div>

        <section className="mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 inline-block px-6 py-2 text-white" style={{ backgroundColor: color }}>SOBRE MÍ</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-center mt-4">{cvData.summary}</p>
        </section>

        <section className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold inline-block px-6 py-2 text-white" style={{ backgroundColor: color }}>EXPERIENCIA</h2>
          </div>
          {cvData.experience.map((exp, i) => (
            <div key={i} className="mb-6 p-4 border-l-4" style={{ borderColor: color }}>
              <h3 className="font-bold text-lg">{exp.title}</h3>
              <p className="text-gray-600">{exp.company} | {exp.period}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold inline-block px-4 py-1 text-white" style={{ backgroundColor: color }}>EDUCACIÓN</h2>
            </div>
            {cvData.education.map((edu, i) => (
              <div key={i} className="mb-3 text-center">
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500">{edu.year}</p>
              </div>
            ))}
          </section>

          <section>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold inline-block px-4 py-1 text-white" style={{ backgroundColor: color }}>HABILIDADES</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {cvData.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 text-white text-sm rounded" style={{ backgroundColor: color }}>{skill}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Template 8: Timeline
function Template8({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div className="p-12">
      <div className="mb-10">
        <h1 className="text-5xl font-bold mb-2" style={{ color }}>{cvData.fullName}</h1>
        <p className="text-2xl text-gray-600 mb-4">{cvData.title}</p>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>{cvData.email}</span>
          <span>|</span>
          <span>{cvData.phone}</span>
          <span>|</span>
          <span>{cvData.location}</span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4" style={{ color }}>Perfil Profesional</h2>
        <div className="p-4 border-l-4" style={{ borderColor: color, backgroundColor: '#f9fafb' }}>
          <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6" style={{ color }}>Trayectoria Profesional</h2>
        <div className="relative border-l-2" style={{ borderColor: color }}>
          {cvData.experience.map((exp, i) => (
            <div key={i} className="mb-8 ml-6">
              <div className="absolute w-4 h-4 rounded-full -left-2 mt-1.5" style={{ backgroundColor: color }}></div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold text-lg" style={{ color }}>{exp.title}</h3>
                <p className="text-gray-600 font-semibold">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color }}>Formación</h2>
          {cvData.education.map((edu, i) => (
            <div key={i} className="mb-4 p-3 bg-gray-50 rounded">
              <h3 className="font-bold">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500 text-sm">{edu.year}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color }}>Competencias Clave</h2>
          <div className="grid grid-cols-1 gap-2">
            {cvData.skills.map((skill, i) => (
              <div key={i} className="p-2 bg-gray-50 rounded border-l-4" style={{ borderColor: color }}>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// Template 9: Elegant
function Template9({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div className="p-12">
      <div className="text-center mb-10">
        <div className="inline-block">
          <h1 className="text-6xl font-serif font-bold mb-3" style={{ color }}>{cvData.fullName}</h1>
          <div className="h-1 mb-3" style={{ backgroundColor: color }}></div>
          <p className="text-xl text-gray-600 font-serif italic">{cvData.title}</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 mb-10 text-sm text-gray-600">
        <span>{cvData.email}</span>
        <span>•</span>
        <span>{cvData.phone}</span>
        <span>•</span>
        <span>{cvData.location}</span>
      </div>

      <section className="mb-10">
        <h2 className="text-center text-2xl font-serif font-bold mb-4" style={{ color }}>Perfil</h2>
        <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto italic">{cvData.summary}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-center text-2xl font-serif font-bold mb-6" style={{ color }}>Experiencia Profesional</h2>
        {cvData.experience.map((exp, i) => (
          <div key={i} className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="font-serif font-bold text-xl mb-1">{exp.title}</h3>
            <p className="text-gray-600 italic mb-2">{exp.company} • {exp.period}</p>
            <p className="text-gray-700 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-10">
        <section>
          <h2 className="text-center text-xl font-serif font-bold mb-4" style={{ color }}>Formación Académica</h2>
          {cvData.education.map((edu, i) => (
            <div key={i} className="mb-4 text-center">
              <h3 className="font-serif font-bold">{edu.degree}</h3>
              <p className="text-gray-600 italic">{edu.institution}</p>
              <p className="text-gray-500 text-sm">{edu.year}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-center text-xl font-serif font-bold mb-4" style={{ color }}>Habilidades</h2>
          <div className="space-y-2">
            {cvData.skills.map((skill, i) => (
              <div key={i} className="text-center">
                <span className="inline-block px-4 py-1 border-2 rounded-full text-sm" style={{ borderColor: color, color }}>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// Template 10: Bold Modern
function Template10({ cvData, color }: { cvData: CVData; color: string }) {
  return (
    <div>
      <div className="p-12 text-white" style={{ backgroundColor: color }}>
        <h1 className="text-6xl font-black mb-4 uppercase">{cvData.fullName}</h1>
        <p className="text-3xl font-light mb-6">{cvData.title}</p>
        <div className="flex gap-6 text-sm">
          <span>{cvData.email}</span>
          <span>{cvData.phone}</span>
          <span>{cvData.location}</span>
        </div>
      </div>

      <div className="p-12">
        <section className="mb-10">
          <h2 className="text-3xl font-black uppercase mb-4" style={{ color }}>About</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{cvData.summary}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-black uppercase mb-6" style={{ color }}>Experience</h2>
          {cvData.experience.map((exp, i) => (
            <div key={i} className="mb-8">
              <div className="p-6 rounded-lg" style={{ backgroundColor: `${color}10` }}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-2xl" style={{ color }}>{exp.title}</h3>
                  <span className="text-gray-500 font-semibold">{exp.period}</span>
                </div>
                <p className="font-semibold text-gray-700 mb-3 text-lg">{exp.company}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-10">
          <section>
            <h2 className="text-2xl font-black uppercase mb-4" style={{ color }}>Education</h2>
            {cvData.education.map((edu, i) => (
              <div key={i} className="mb-4 p-4 border-l-4" style={{ borderColor: color }}>
                <h3 className="font-bold text-lg">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500">{edu.year}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-4" style={{ color }}>Skills</h2>
            <div className="flex flex-wrap gap-3">
              {cvData.skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 font-bold text-white rounded-lg" style={{ backgroundColor: color }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
