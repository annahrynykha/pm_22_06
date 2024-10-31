document.querySelectorAll(".skill").forEach((skill) => {
    const progress = skill.querySelector(".progress");

    const width = progress.style.width; // Наприклад, "80%"

    progress.style.setProperty("--progress-width", width);
});
document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".skill");

    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.classList.add("visible"); // Додаємо клас видимості
        }, index * 300); // Затримка для кожного елемента
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress");
    progressBars.forEach((progressBar) => {
        const width = progressBar.style.width; // Отримуємо задану ширину
        progressBar.style.width = "0"; // Задаємо початкову ширину 0
        setTimeout(() => {
            progressBar.style.width = width; // Відновлюємо ширину для анімації
        }, 100); // Затримка для початку анімації
    });
});

/*const btnRoll = document.getElementsByClassName("roll");
const blockRoll = document.getElementsByClassName("roll-block");
Array.from(btnRoll).forEach((btn, index) => {
    btn.addEventListener("click", () => showOrHide(blockRoll[index]));
});
function showOrHide(block) {
    if (block.style.maxHeight) {
        block.style.maxHeight = null;
    } else {
        block.style.maxHeight = "300vh";
    }
}*/



document.addEventListener("DOMContentLoaded", function () {
    const headers = document.querySelectorAll(".roll"); // Select headers with the class 'roll'

    headers.forEach((header) => {
        const content = header.nextElementSibling; // Get the content block immediately following the header

        // Check if the next sibling element has the class 'roll-block'
        if (content && content.classList.contains("roll-block")) {
            // Initially set max-height to 0 to keep content hidden
            content.style.maxHeight = "0";

            header.addEventListener("click", function () {
                if (content.style.maxHeight && content.style.maxHeight !== "0px") {
                    content.style.maxHeight = "0"; // Collapse
                } else {
                    content.style.maxHeight = content.scrollHeight + "px"; // Expand
                }
            });
        }
    });
});
