import { useState } from 'react'

    export default function AboutPage() {
      return (
        <div className="min-h-screen p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-4">Sobre o Diário Pessoal</h1>
            <p className="text-gray-600 text-center leading-relaxed">
              Bem-vindo ao Diário Pessoal, sua aplicação de registro diário com autenticação segura e interface moderna.
              Crie entradas diárias, visualize o calendário e organize suas notas de forma eficiente.
            </p>
          </div>
        </div>
      )
    }
