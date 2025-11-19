const sidebarBtn = document.getElementById("sidebar__btn");
const sidebarArrow = document.getElementById("aside__arrow");
const sideBar = document.getElementById("sidebar");

// console.log(sidebarArrow.getBoundingClientRect());
function sideBarAction() {
    sidebarBtn.addEventListener("click", () => {
        sidebarArrow.firstElementChild.classList.toggle("rotate-180");
        Array.from(sideBar.children).forEach((node, ind) => {
            if (ind == 0) {
                node.children[0].classList.toggle("hidden");
            } else if (node.id !== "sidebar__btn")
                node.classList.toggle("hidden");
        });
        sideBar.classList.toggle("flex-1");
    });
}

export { sideBarAction };
