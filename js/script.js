// Trong file js/script.js
const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 0;
const size = images[0].clientWidth; // Lấy chiều rộng của 1 tấm ảnh

// Hàm chuyển ảnh
function moveSlide() {
    slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

// Xử lý nút Next
nextBtn.addEventListener('click', () => {
    if (counter >= images.length - 1) counter = -1; // Quay lại ảnh đầu
    counter++;
    moveSlide();
});

// Xử lý nút Prev
prevBtn.addEventListener('click', () => {
    if (counter <= 0) counter = images.length;
    counter--;
    moveSlide();
});

// Tự động chạy sau 3 giây
setInterval(() => {
    nextBtn.click();
}, 3000);
// Quản lý To-Do List
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// 1. Tải dữ liệu từ LocalStorage khi trang web mở lên
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
renderTasks();

// 2. Hàm thêm công việc
function addTask() {
    const text = todoInput.value.trim();
    if (text === "") return;

    tasks.push(text);
    todoInput.value = "";
    saveAndRender();
}

// 3. Hàm xóa công việc
function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// 4. Hàm sửa công việc
function editTask(index) {
    const newText = prompt("Chỉnh sửa công việc:", tasks[index]);
    if (newText !== null && newText.trim() !== "") {
        tasks[index] = newText.trim();
        saveAndRender();
    }
}

// 5. Lưu vào LocalStorage và cập nhật giao diện
function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

// 6. Hiển thị danh sách ra màn hình
function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((task, index) => {
        todoList.innerHTML += `
            <div class="todo-item">
                <span class="todo-text">${task}</span>
                <button onclick="editTask(${index})" style="background-color: #ffc107;">Sửa</button>
                <button onclick="deleteTask(${index})" style="background-color: #dc3545; color: white;">Xóa</button>
            </div>
        `;
    });
}