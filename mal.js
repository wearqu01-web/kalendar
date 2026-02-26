const monthYear = document.getElementById("monthYear");
const datesContainer = document.getElementById("dates");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const selectedList = document.getElementById("selectedList");

let currentDate = new Date();
let selectedDates = [];

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    monthYear.textContent = `${monthNames[month]} ${year}`;
    datesContainer.innerHTML = "";

    let startDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startDay; i++) {
        datesContainer.innerHTML += "<div></div>";
    }

    for (let i = 1; i <= lastDate; i++) {
        const dateDiv = document.createElement("div");
        dateDiv.textContent = i;

        const fullDate = `${i}.${month + 1}.${year}`;

        const today = new Date();
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dateDiv.classList.add("today");
        }

        if (selectedDates.includes(fullDate)) {
            dateDiv.classList.add("selected");
        }

        dateDiv.addEventListener("click", () => {
            if (!selectedDates.includes(fullDate)) {
                selectedDates.push(fullDate);
            }
            renderSelectedDates();
            renderCalendar();
        });

        datesContainer.appendChild(dateDiv);
    }
}

function renderSelectedDates() {
    selectedList.innerHTML = "";

    selectedDates.forEach((date, index) => {
        const li = document.createElement("li");
        li.textContent = date + " - Удалить";

        li.addEventListener("click", () => {
            selectedDates.splice(index, 1);
            renderSelectedDates();
            renderCalendar();
        });

        selectedList.appendChild(li);
    });
}

prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();