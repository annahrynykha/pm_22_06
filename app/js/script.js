//import data from "bootstrap/js/src/dom/data";

document.querySelectorAll(".skill").forEach((skill) => {
    const progress = skill.querySelector(".progress");

    const width = progress.style.width;

    progress.style.setProperty("--progress-width", width);
    //progress.style.width = "0";

    setTimeout(() => {
        progress.style.width = width; // Відновлюємо ширину
    }, 100);
});

document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".skill");

    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.classList.add("visible");
        }, index * 300);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress");
    progressBars.forEach((progressBar) => {
        const width = progressBar.style.width;
        progressBar.style.width = "0";
        setTimeout(() => {
            progressBar.style.width = width;
        }, 100);
    });
});

const btnRoll = document.getElementsByClassName("roll");
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
}

//server part

function fetchData(url, options = {}) {
    return fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error("Помилка");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
        .catch(error => {
            console.error("Помилка:", error);
            throw error;
        })
}

async function getData(){
    try{
        const data = await fetchData("http://localhost:8080/data.json", {cache: "no-store"});
        console.log("Отримані дані:", data);
        renderData(data);
    } catch (error) {
        console.error("Помилка при отриманні даних:", error);
    }
}

function renderData(data) {
    if (data.education && Array.isArray(data.education)) {
        renderEducation(data.education);
    } else {
        console.error("Дані education відсутні або некоректні:", data.education);
    }
}

function renderEducation(education) {
    const container = document.getElementById('educations-container');
    container.innerHTML = '';

    const educationHTML = education.map(educate => {
        return `
            <div class="educate">
                <h3><strong>${educate.institution}</strong></h3>
                <p>${educate.degree}</p>
                <p>${educate.years}</p>
            </div>`;
    }).join('');

    container.innerHTML = educationHTML;
}

getData().then(res => console.log(res));