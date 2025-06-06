// Функция для переключения между вкладками
function openTab(tabId) {
    // Скрыть все вкладки
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Убрать активный класс у всех кнопок
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Показать выбранную вкладку и сделать кнопку активной
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Данные студентов (можно заменить на загрузку из базы данных)
const fullGroupStudents = [
    "Иванов Иван", "Петров Петр", "Сидорова Анна", "Кузнецов Дмитрий", 
    "Смирнова Елена", "Васильев Алексей", "Николаева Мария", "Федоров Сергей",
    "Морозова Ольга", "Павлов Андрей", "Козлова Наталья", "Лебедев Игорь",
    "Соколова Татьяна", "Новиков Владимир", "Волкова Юлия"
];

// Разделение на подгруппы (примерное)
const subgroup1 = fullGroupStudents.slice(0, Math.ceil(fullGroupStudents.length / 2));
const subgroup2 = fullGroupStudents.slice(Math.ceil(fullGroupStudents.length / 2));

// Функция для генерации графика дежурств
function generateDutySchedule(students, containerId) {
    const container = document.getElementById(containerId);
    let html = '<table class="duty-table"><tr><th>Дата</th><th>Дежурные</th></tr>';
    
    // Генерация на месяц вперед
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(today.getFullYear(), today.getMonth(), day);
        
        // Пропускаем выходные
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        // Определяем дежурных (каждый день новая пара по порядку)
        const dutyIndex1 = (day - 1) % Math.ceil(students.length / 2);
        const dutyIndex2 = (dutyIndex1 + Math.ceil(students.length / 2)) % students.length;
        
        const dutyClass = day === today.getDate() ? 'current-duty' : '';
        
        html += `<tr class="${dutyClass}">
            <td>${day}.${today.getMonth() + 1}.${today.getFullYear()}</td>
            <td>${students[dutyIndex1]} и ${students[dutyIndex2]}</td>
        </tr>`;
    }
    
    html += '</table>';
    container.innerHTML = html;
}

// Инициализация при загрузке страницы
window.onload = function() {
    generateDutySchedule(fullGroupStudents, 'full-group');
    generateDutySchedule(subgroup1, 'subgroup-1');
    generateDutySchedule(subgroup2, 'subgroup-2');
};