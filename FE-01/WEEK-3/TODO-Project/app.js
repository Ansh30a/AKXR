window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form')
    const input = document.querySelector('#new-task-input')
    const listElement = document.querySelector('#tasks')
    const totalTasksSpan = document.querySelector('#total-tasks')
    const completedTasksSpan = document.querySelector('#completed-tasks')
    const clearCompletedBtn = document.querySelector('#clear-completed')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []

    renderTasks()

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const task = input.value.trim()
        
        if (task === '') {
            alert(`Please enter task(s)!!!`)
            return
        }

        const newTask = {
            id: Date.now(),
            text: task,
            completed: false
        }
        tasks.push(newTask)
        saveTasks()
        renderTasks()
        input.value = ''
    })

    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed)
        saveTasks()
        renderTasks()
    })

    function renderTasks() {
        listElement.innerHTML = ''
        
        tasks.forEach(task => {
            const taskElement = document.createElement('div')
            taskElement.classList.add('task')
            if (task.completed) {
                taskElement.classList.add('completed')
            }

            const taskContent = document.createElement('div')
            taskContent.classList.add('content')

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.classList.add('task-checkbox')
            checkbox.checked = task.completed
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked
                taskElement.classList.toggle('completed')
                saveTasks()
                updateCounter()
            })

            const taskInput = document.createElement('input')
            taskInput.classList.add('text')
            taskInput.type = 'text'
            taskInput.value = task.text
            taskInput.setAttribute('readonly', 'readonly')

            taskContent.append(checkbox)
            taskContent.append(taskInput)
            taskElement.append(taskContent)

            const taskEditDelete = document.createElement('div')
            taskEditDelete.classList.add('edit-delete')
            
            const taskEdit = document.createElement('i')
            taskEdit.classList.add('fa-solid', 'fa-pencil')

            const taskDelete = document.createElement('i')
            taskDelete.classList.add('fa-solid', 'fa-trash')

            taskEditDelete.append(taskEdit)
            taskEditDelete.append(taskDelete)
            taskElement.append(taskEditDelete)

            listElement.append(taskElement)

            taskEdit.addEventListener('click', () => {
                if (taskEdit.classList.contains('fa-pencil')) {
                    taskEdit.classList.replace('fa-pencil', 'fa-floppy-disk')
                    taskInput.removeAttribute('readonly')
                    taskInput.focus()
                } else {
                    taskEdit.classList.replace('fa-floppy-disk', 'fa-pencil')
                    taskInput.setAttribute('readonly', 'readonly')
                    task.text = taskInput.value.trim()
                    saveTasks()
                }
            })

            taskDelete.addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id)
                saveTasks()
                renderTasks()
            })
        })

        updateCounter()
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    function updateCounter() {
        const total = tasks.length
        const completed = tasks.filter(task => task.completed).length
        totalTasksSpan.textContent = total
        completedTasksSpan.textContent = completed
    }
})