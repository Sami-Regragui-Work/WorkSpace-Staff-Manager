import { roomsBodyRatio } from "./responsive.js";

const sidebarBtn = document.getElementById("sidebar__btn");
const sidebarArrow = document.getElementById("aside__arrow");
const sideBar = document.getElementById("sidebar");
let collapsedGlobalVar = false;

// console/.log(sidebarArrow.getBoundingClientRect());
function sideBarAction() {
    sidebarBtn.addEventListener("click", () => {
        sidebarArrow.firstElementChild.classList.toggle("rotate-180");
        sidebarBtn.setAttribute(
            "aria-expanded",
            String(!JSON.parse(sidebarBtn.getAttribute("aria-expanded")))
        );

        // if (window.innerHeight <= 780) {
        //     sidebarArrow.firstElementChild.classList.toggle("rotate-90");
        //     console.log("smallwindow");
        //     // sidebarArrow.firstElementChild.classList.toggle("-rotate-90");
        // }
        sideBar.classList.toggle("min-w-[270px]");
        Array.from(sideBar.children).forEach((node, ind) => {
            if (ind == 0) {
                node.children[0].classList.toggle("hidden");
            } else if (node.id !== "sidebar__btn")
                node.classList.toggle("hidden");
        });
        sideBar.classList.toggle("flex-1");
        collapsedGlobalVar = !sideBar.classList.contains("flex-1");
        roomsBodyRatio();
    });
}

export { sideBarAction, collapsedGlobalVar };
