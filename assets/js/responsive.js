import { collapsedGlobalVar } from "./sideBarCollapse.js";

const relativeRatio = (638 - 569.875) / 638;
const body = document.body;
const roomsDiv = document.getElementById("rooms");
const wrapperDiv = document.querySelector(".center > .wrapper");

function roomsBodyRatio() {
    const bodyH = body.offsetHeight;
    const roomsH = roomsDiv.offsetHeight;
    const bodyW = body.offsetWidth;

    const thisRatio = (bodyH - roomsH) / bodyH;

    // console/.log(bodyW);

    if (thisRatio <= relativeRatio || (bodyW > 1133 && collapsedGlobalVar)) {
        // console/.log("modified");
        roomsDiv.classList.add("rooms--modified");
        wrapperDiv.classList.add("wrapper--modified");
        roomsDiv.classList.remove("rooms--original");
        wrapperDiv.classList.remove("wrapper--original");
    } else {
        // console/.log("original");
        roomsDiv.classList.remove("rooms--modified");
        wrapperDiv.classList.remove("wrapper--modified");
        roomsDiv.classList.add("rooms--original");
        wrapperDiv.classList.add("wrapper--original");
    }
}

function responsive() {
    window.addEventListener("resize", roomsBodyRatio);
}

export { responsive, roomsBodyRatio };
