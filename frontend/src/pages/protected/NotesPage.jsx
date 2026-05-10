import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getNotes, createNote, updateNote, deleteNote } from '../../api/notes'
import { getTrip } from '../../api/trips'
import Button from '../../components/ui/Button'
import Input, { Textarea } from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import { formatDate } from '../../utils/dateUtils'
import { ListSkeleton } from '../../components/ui/LoadingSkeleton'
import { Plus, Pencil, Trash2, ArrowLeft, NotebookPen, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NotesPage() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', content: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([getTrip(id), getNotes(id)])
      .then(([tRes, nRes]) => { setTrip(tRes.data); setNotes(nRes.data) })
      .catch(() => toast.error('Failed to load notes'))
      .finally(() => setLoading(false))
  }, [id])

  const openCreate = () => { setEditing(null); setForm({ title: '', content: '' }); setShowModal(true) }
  const openEdit = (note) => { setEditing(note); setForm({ title: note.title, content: note.content ?? '' }); setShowModal(true) }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setSaving(true)
    try {
      if (editing) {
        const { data } = await updateNote(id, editing.id, form)
        setNotes(notes.map((n) => n.id === editing.id ? data : n))
        toast.success('Note updated')
      } else {
        const { data } = await createNote(id, form)
        setNotes([data, ...notes])
        toast.success('Note added')
      }
      setShowModal(false)
    } catch { toast.error('Failed to save note') }
    finally { setSaving(false) }
  }

  const handleDelete = async (noteId) => {
    if (!confirm('Delete this note?')) return
    try {
      await deleteNote(id, noteId)
      setNotes(notes.filter((n) => n.id !== noteId))
      toast.success('Note deleted')
    } catch { toast.error('Failed to delete note') }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/app/trips/${id}/view`} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{trip?.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Notes & Journal</p>
        </div>
        <Button size="sm" onClick={openCreate}><Plus size={14} /> New Note</Button>
      </div>

      {loading ? <ListSkeleton count={4} /> : notes.length === 0 ? (
        <div className="card p-12 text-center">
          <NotebookPen size={40} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notes yet</h3>
          <p className="text-gray-400 mb-4">Jot down hotel info, local contacts, or day-specific reminders.</p>
          <Button onClick={openCreate}><Plus size={16} /> Add First Note</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="card p-5 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">{note.title}</h3>
                  {note.content && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {note.content}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                    <Clock size={11} />
                    <span>{formatDate(note.createdAt)}</span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(note)}><Pencil size={13} /></Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(note.id)}
                    className="text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 size={13} /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Note' : 'New Note'}>
        <div className="space-y-4">
          <Input label="Title" placeholder="Hotel check-in details..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea label="Content" placeholder="Write your note here..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} loading={saving} className="flex-1">{editing ? 'Update' : 'Save Note'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
