document.addEventListener('DOMContentLoaded', () => {


    
    // BÀI 1:
    const slide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    if (slide && images.length > 0) {
        let counter = 0;
        const size = images[0].clientWidth;

        const moveSlide = () => {
            slide.style.transform = `translateX(${-size * counter}px)`;
        };

        if (nextBtn) {
            nextBtn.onclick = () => {
                counter = (counter >= images.length - 1) ? 0 : counter + 1;
                moveSlide();
            };
        }

        if (prevBtn) {
            prevBtn.onclick = () => {
                counter = (counter <= 0) ? images.length - 1 : counter - 1;
                moveSlide();
            };
        }
        setInterval(() => {
            if (nextBtn) nextBtn.click();
        }, 3000);
    }


    // BÀI 2
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');

    if (todoInput && addBtn && todoList) {
        let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

        const renderTasks = () => {
            todoList.innerHTML = "";
            tasks.forEach((task, index) => {
                todoList.innerHTML += `
                    <div class="todo-text">${task}</div>
                    <button class="btn-edit" onclick="editTask(${index})">Sửa</button>
                    <button class="btn-delete" onclick="deleteTask(${index})">Xóa</button>
                `;
            });
        };

        const saveAndRender = () => {
            localStorage.setItem('myTasks', JSON.stringify(tasks));
            renderTasks();
        };

        addBtn.onclick = () => {
            const val = todoInput.value.trim();
            if (val !== "") {
                tasks.push(val);
                todoInput.value = "";
                saveAndRender();
            }
        };

        window.deleteTask = (index) => {
            tasks.splice(index, 1);
            saveAndRender();
        };

        window.editTask = (index) => {
            const newVal = prompt("Sửa công việc:", tasks[index]);
            if (newVal !== null && newVal.trim() !== "") {
                tasks[index] = newVal.trim();
                saveAndRender();
            }
        };

        renderTasks();
    }



    //BÀI 3
const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const resetBtn = document.getElementById('resetBtn');
const fireworksContainer = document.getElementById('fireworks-container');

if (guessInput && checkBtn) {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    const createFirework = () => {
        for (let i = 0; i < 5; i++) {
            const fw = document.createElement('div');
            fw.className = 'firework';
            fw.style.left = Math.random() * 100 + "%";
            fw.style.top = Math.random() * 100 + "%";
            fireworksContainer.appendChild(fw);
            setTimeout(() => fw.remove(), 1000);
        }
    };

    checkBtn.onclick = () => {
        const userGuess = parseInt(guessInput.value);
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.innerText = "Hãy nhập số từ 1 đến 100!";
            return;
        }

        attempts++;
        attemptsDisplay.innerText = attempts;

        if (userGuess === randomNumber) {
            message.innerHTML = "🎉 CHÚC MỪNG! Bạn đã đoán đúng!";
            message.style.color = "green";
            checkBtn.disabled = true;
            resetBtn.style.display = "inline-block";
            let interval = setInterval(createFirework, 300);
            setTimeout(() => clearInterval(interval), 3000);
        } else if (userGuess < randomNumber) {
            message.innerText = "Quá thấp! Thử lại xem.";
            message.style.color = "orange";
        } else {
            message.innerText = "Quá cao! Hạ nhiệt chút nào.";
            message.style.color = "red";
        }
    };

    resetBtn.onclick = () => {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        attemptsDisplay.innerText = "0";
        message.innerText = "";
        guessInput.value = "";
        checkBtn.disabled = false;
        resetBtn.style.display = "none";
    };
}
});