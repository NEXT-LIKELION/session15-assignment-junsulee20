import { useState, useEffect } from 'react'
import { db } from './lib/firebase'
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore'
import './App.css'

function App() {
  // 할 일 목록 상태
  const [todos, setTodos] = useState([])
  // 모달 오픈 상태
  const [showModal, setShowModal] = useState(false)
  // 입력 상태
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [dueDate, setDueDate] = useState('')

  // Firestore에서 할 일 목록 불러오기
  useEffect(() => {
    const fetchTodos = async () => {
      const q = query(collection(db, 'todos'), orderBy('dueDate'))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setTodos(data)
    }
    fetchTodos()
  }, [showModal]) // 모달 닫힐 때마다 새로고침

  // 할 일 추가 함수
  const handleAddTodo = async () => {
    if (!title || !dueDate) return
    await addDoc(collection(db, 'todos'), {
      title,
      content,
      dueDate: new Date(dueDate),
      createdAt: Timestamp.now(),
    })
    setShowModal(false)
    setTitle('')
    setContent('')
    setDueDate('')
  }

  // 남은 일수 계산
  const getDDay = (dueDate) => {
    let due;
    if (!dueDate) return '';
    // Firestore Timestamp 객체일 경우
    if (typeof dueDate === 'object' && dueDate.seconds) {
      due = new Date(dueDate.seconds * 1000);
    } else {
      due = new Date(dueDate);
    }
    const now = new Date();
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'D-Day';
    if (diff > 0) return `D-${diff}`;
    return `D+${Math.abs(diff)}`;
  }

  return (
    <div className="app-bg">
      <div className="todo-list">
        <h2 className="todo-title">To-Do List</h2>
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <div className="todo-content">
              <div className="todo-main">
                <div className="todo-item-title">{todo.title}</div>
                <div className="todo-item-content">{todo.content}</div>
              </div>
              <div className="d-day">{getDDay(todo.dueDate)}</div>
            </div>
          </div>
        ))}
        <button onClick={() => setShowModal(true)} className="add-todo-btn">
          + 할일 New
        </button>
      </div>
      {showModal && (
        <div className="modal-bg">
          <div className="modal">
            <div className="modal-label">할일 제목</div>
            <input value={title} onChange={e => setTitle(e.target.value)} className="modal-input" />
            <div className="modal-label">할일 내용</div>
            <textarea value={content} onChange={e => setContent(e.target.value)} className="modal-textarea" />
            <div className="modal-label">기한</div>
            <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} className="modal-input" />
            <div className="modal-btns">
              <button onClick={handleAddTodo} className="modal-add-btn">+ 추가</button>
              <button onClick={() => setShowModal(false)} className="modal-close-btn">닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
