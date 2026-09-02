import './style.css';
import './counter';


console.log("MAIN TS BERHASIL JALAN");
interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const clearAllBtn = document.getElementById("clearAllBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

let todos: Todo[] = [];

const STORAGE_KEY = "todo_list_data";


// Ambil data dari localStorage
function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    todos = JSON.parse(saved);
  }
}

// Simpan data ke localStorage
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Render tugas
function render() {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";

    const wrapper = document.createElement("div");
    wrapper.className = "task-row"
    wrapper.style.width = "29rem"
    wrapper.style.display = "flex" 

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.display = "inline-block"
    textSpan.style.marginRight = "auto"

    if (todo.done) {
      textSpan.style.textDecoration = "line-through";
      textSpan.style.opacity = "0.6";
      li.style.backgroundColor = "lime"
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-group"
    buttonContainer.style.display = "inline-flex";
    buttonContainer.style.gap = "6px";   


    // Tombol selesai
    const toggleBtn = document.createElement("input");
    toggleBtn.type = "checkbox";
    toggleBtn.checked = todo.done;

    toggleBtn.onchange = () => {
      todo.done = toggleBtn.checked;
      saveTodos();            
      render();
};

    // Tombol hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.classList.add("btn-delete");
    deleteBtn.onclick = () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      render();
    };

    // ➡️ Tombol edit (tambahkan bagian ini)
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn-edit");
    editBtn.onclick = () => {
      const newText = prompt("Ubah task:", todo.text);

      if (!newText || newText.trim() === "") {
        alert("isi dulu ya bestiee!");
        return;
      }

      todo.text = newText.trim();
      saveTodos();
      render();
    };

    buttonContainer.appendChild(toggleBtn);
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(editBtn);
    wrapper.appendChild(textSpan);
    wrapper.appendChild(buttonContainer);
    li.appendChild(wrapper)
    taskList.appendChild(li);
  });
}


// Tambah data
function addTodo() {

  console.log("TOMBOL TAMBAH DIKLIK");
  const text = taskInput.value.trim();

  if (text === "") {
    alert("isi dulu bestiee!");
    return;
  }

  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    done: false
  };

  todos.push(newTodo);
  taskInput.value = "";
  saveTodos();
  render();
}


addBtn.addEventListener("click", addTodo);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

clearAllBtn.addEventListener("click", () => {
  if (todos.length === 0) return;
  if (confirm("Yakin ingin menghapus semua?")) {
    todos = [];
    saveTodos();
    render();
  }
});

loadTodos();
render();