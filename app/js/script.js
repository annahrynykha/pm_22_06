document.querySelectorAll(".skill").forEach((skill) => {
    const progress = skill.querySelector(".progress");

    const width = progress.style.width;

    progress.style.setProperty("--progress-width", width);
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