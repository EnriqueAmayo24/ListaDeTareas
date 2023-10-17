//Nombre: Enrique Vincent Amayo Belén Id: 10151974
document.addEventListener("DOMContentLoaded", function () {
    // Cuando el documento HTML ha sido completamente cargado y analizado, se ejecutará la función anónima.


    //Para guardar los elementos en constantes
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const taskPriority = document.getElementById("taskPriority");

    // Cargar tareas almacenadas en localStorage al cargar la página
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Iteramos sobre las tareas recuperadas y las mostramos en la lista.
    for (const savedTask of savedTasks) {
        createTaskElement(savedTask.taskText, savedTask.priority);
    }

    // Cargar tareas almacenadas en localStorage al cargar la página
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        //Condicion que verifica el valor de la constante taskText y en caso de ser un string vacio no retorna nada
        if (taskText === "") {
            return;
        }

        //Para guardar el valor una vez seleccionada la prioridad
        const priority = taskPriority.value.trim();
        createTaskElement(taskText, priority);

        // Guardar la tarea en localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ taskText, priority });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = "";
    });

    function createTaskElement(taskText, priority) {
        
        //Creando el elemento li y guardandolo en una constante
        const li = document.createElement("li");

        //Para mostrar el nombre de la tarea, la prioridad y los botones en el li
        li.innerHTML = `
            <span>${taskText}</span>
            <span id="priority">${priority}</span>
            <button id="completeTask">Completar</button>
            <button id="editTask">Editar</button>
            <button id="deleteTask">Eliminar</button>
        `;

        //Agregar el elemento li a la lista de tareas
        taskList.appendChild(li);

        //Botón paraeliminar la tarea.
        const deleteButton = li.querySelector("#deleteTask");
        deleteButton.addEventListener("click", function () {
            li.remove();
            // Eliminar la tarea del almacenamiento local
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const taskIndex = tasks.findIndex((task) => task.taskText === taskText && task.priority === priority);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        });

        //Botón para completar la tarea.
        const completeButton = li.querySelector("#completeTask");
        completeButton.addEventListener("click", function () {
            //Para cambiar el color al completarse y en caso de volver a presionar el boton, cambiar el color de la tarea
            if (li.style.backgroundColor != "green") {
                li.style.backgroundColor = "green";
            } else {
                li.style.backgroundColor = "#33288342";
            }
        });
        
        //Botón para editar la tarea.
        const editButton = li.querySelector("#editTask");
        editButton.addEventListener("click", function () {
            const span = li.querySelector("span");
            const newText = prompt("Editar la tarea:", span.textContent);

            //para que en caso de que el valor sea null no cambiar el nombre de la tarea
            if (newText !== null) {
                span.textContent = newText;

                // Actualizar la tarea en el almacenamiento local

                // Obtenemos las tareas almacenadas.
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                const taskIndex = tasks.findIndex((task) => task.taskText === taskText && task.priority === priority);
                if (taskIndex !== -1) {
                    tasks[taskIndex].taskText = newText;
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                }
            }
        });
    }
});


