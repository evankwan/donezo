import './App.css'

function App() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }
  return (
    <>
      <div className="top-bar">
        <h1>donezo</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            id="todo-input"
          />
        </form>
      </div>
    </>
  )
}

export default App
