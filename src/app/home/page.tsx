import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorageState } from '@/hooks/use-local-storage'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const DiaryEntry = ({ date, note, onDelete }: { date: string; note?: string; onDelete: () => void }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300 border border-gray-100 break-words relative group">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full text-red-500"
      aria-label="Deletar nota"
    >
      ✕
    </button>
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-xl font-semibold text-indigo-700">
        {format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </h3>
      <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
    </div>
    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed overflow-auto max-h-[300px]">{note || 'Nenhuma nota para este dia'}</p>
  </div>
)

export default function HomePage() {
  const navigate = useNavigate()
  const [currentUser] = useLocalStorageState<{ email: string } | null>('currentUser', null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [allNotes, setAllNotes] = useLocalStorageState<Record<string, Record<string, string>>>('userNotes', {})
  const [newNote, setNewNote] = useState('')
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  // Get notes for current user
  const userNotes = currentUser ? (allNotes[currentUser.email] || {}) : {}

  const handleLogout = () => {
    navigate('/login')
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1))
  }

  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    return eachDayOfInterval({ start, end })
  }

  const currentMonthDays = getDaysInMonth(currentMonth)

  const handleDateClick = (date: string) => {
    setSelectedDate(date)
    setNewNote(userNotes[date] || '')
    setShowAddNoteModal(true)
  }

  const saveNote = () => {
    setShowConfirmationModal(true)
  }

  const confirmSaveNote = () => {
    if (!newNote.trim() || !currentUser) return

    const updatedUserNotes = {
      ...userNotes,
      [selectedDate]: newNote.trim()
    }

    setAllNotes(prev => {
      const newNotes = {
        ...prev,
        [currentUser.email]: updatedUserNotes
      }
      // Force localStorage update
      window.localStorage.setItem('userNotes', JSON.stringify(newNotes))
      return newNotes
    })

    setNewNote('')
    setShowAddNoteModal(false)
    setShowConfirmationModal(false)
  }

  const deleteNote = (date: string) => {
    if (!currentUser) return;

    const updatedUserNotes = { ...userNotes };
    delete updatedUserNotes[date];

    setAllNotes(prev => {
      const newNotes = {
        ...prev,
        [currentUser.email]: updatedUserNotes
      };
      window.localStorage.setItem('userNotes', JSON.stringify(newNotes));
      return newNotes;
    });
  };

  if (!currentUser) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-indigo-900">✨ Meu Diário</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {currentUser?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-8">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-900">
            {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePreviousMonth}
              className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="px-3 py-1 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors text-sm"
            >
              Hoje
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
            >
              →
            </button>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="text-center font-medium py-2 text-indigo-600">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {currentMonthDays.map((date, index) => {
              const dateStr = date.toISOString().split('T')[0]
              const hasNote = userNotes[dateStr]
              const isCurrentMonth = isSameMonth(date, currentMonth)
              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(dateStr)}
                  className={`
                    p-3 text-center rounded-lg cursor-pointer transition-all duration-200
                    ${hasNote ? 'bg-indigo-100 hover:bg-indigo-200' : 'hover:bg-gray-100'}
                    ${date.getDay() === 0 ? 'text-red-500' : 'text-gray-700'}
                    ${dateStr === selectedDate ? 'ring-2 ring-indigo-500' : ''}
                    ${!isCurrentMonth ? 'opacity-40' : ''}
                  `}
                >
                  {format(date, 'd')}
                  {hasNote && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mx-auto mt-1"></div>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Add Note Modal */}
        {showAddNoteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-[32rem] shadow-2xl transform transition-all max-h-[90vh] flex flex-col">
              <h2 className="text-2xl font-bold mb-6 text-indigo-900">
                ✍️ Nota para {format(new Date(selectedDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </h2>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl mb-6 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none flex-grow"
                placeholder="Escreva seus pensamentos aqui..."
                style={{ minHeight: '150px', maxHeight: '50vh' }}
              />
              <div className="flex justify-end gap-3 mt-auto">
                <button
                  onClick={() => setShowAddNoteModal(false)}
                  className="px-4 md:px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveNote}
                  className="px-4 md:px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-lg shadow-indigo-200"
                >
                  Salvar Nota
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-[32rem] shadow-2xl transform transition-all">
              <h2 className="text-2xl font-bold mb-6 text-indigo-900">
                Confirmar Salvar Nota
              </h2>
              <p className="text-gray-600 mb-6">
                Você tem certeza que deseja salvar essa nota?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="px-4 md:px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmSaveNote}
                  className="px-4 md:px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-lg shadow-indigo-200"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Notes */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-900 mb-6">📝 Minhas Notas</h2>
          {Object.entries(userNotes).length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Nenhuma nota ainda. Clique em um dia do calendário para começar! ✨
            </div>
          ) : (
            Object.entries(userNotes)
              .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
              .map(([date, note]) => (
                <DiaryEntry 
                  key={date} 
                  date={date} 
                  note={note} 
                  onDelete={() => deleteNote(date)}
                />
              ))
          )}
        </div>
      </div>
    </div>
  )
}
