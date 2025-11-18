const sidebarBtn = document.getElementById("sidebar__btn");
const sidebarArrow = document.getElementById("aside__arrow");
const sideBar = document.getElementById("sidebar");

console.log(sidebarArrow.getBoundingClientRect());

let collapsed = -1;

sidebarBtn.addEventListener("click", () => {
    // arrowBtn.style.transition = "rotate 500ms ease-in-out";
    sidebarArrow.firstElementChild.classList.toggle("rotate-180");
    Array.from(sideBar.children).forEach((node, ind) => {
        // console/.log(node.id);
        // if (ind == 0) {
        //     // node.children[0].classList.toggle("w-0");
        //     node.children[0].innerHTML = collapsed < 0 ? "" : "Staff Members";
        // } else if (node.id !== "sidebar__btn") node.classList.toggle("w-0");

        // if (ind == 2) {
        //     node.innerHTML = collapsed < 0 ? "" : "Add New Worker";
        //     // console.log
        // }
        // collapsed *= -1;
        if (ind == 0) {
            // node.children[0].classList.toggle("w-0");
            node.children[0].classList.toggle("hidden");
        } else if (node.id !== "sidebar__btn") node.classList.toggle("hidden");
    });
    sideBar.classList.toggle("flex-1");
    // sidebarBtn.classList.toggle("absolute");
    // sideBar.classList.toggle("w-full");
    // sideBar.classList.toggle("w-fit");
    console.log(sidebarArrow.getBoundingClientRect());
});
