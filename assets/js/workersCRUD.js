import { validateForm, toggleError } from "./validation.js";

const addWorkerBtn = document.getElementById("add-worker");
const addExperienceBtn = document.getElementById("add-experience");
const saveWorkerBtn = document.getElementById("save-worker");
const workersDiv = document.getElementById("aside-workers");
const modal = document.getElementById("crud-modal");
const modalForum = document.getElementById("add-worker-modal");
const experiences = document.getElementById("experiences");
const picUrl = document.getElementById("pic");
const closeModalBtns = document.querySelectorAll(".close__modal");

const fallBackImg = "assets/images/imgPlaceHolder.svg";
// to reset experiences to initial state (one experiences)
const experiencesInitialState = experiences.innerHTML;

const workers = [];

let expCounter;
let GlobalId = 0;

const fieldsLabs = [
    "name",
    "role",
    "email",
    "phone",
    "photoUrl",
    "experiences",
];

const expLabs = ["company", "role", "from", "to"];

// async function fetchJSON(callback, ...args) {
//     try {
//         const res = (await fetch("assets/workers.json")) || [];
//         if (!res.ok) throw new Error("Failed to fetch JSON");
//         const resBody = await res.json();
//         callback(...args, resBody);
//     } catch (err) {
//         console.error("Error:", err);
//     }
// }

function getWorkersIndex(id) {
    return workers.findIndex((worker) => worker.id == id);
}

function addWorker(e, edit = false) {
    expCounter = 1;
    if (!edit) {
        experiences.innerHTML = experiencesInitialState;
        modalForum.reset();
        modalForum.querySelector("input[type='hidden']").value = "";
        const inputs = Array.from(
            modalForum.querySelectorAll("input, #role")
        ).slice(1);
        inputs.forEach((input) => toggleError(input, false));

        setPreview();
        modal.classList.toggle("hidden");
        modal.classList.toggle("flex");
        modal.ariaHidden = false;
    } else {
        const clickTarget = e.target;
        if (clickTarget.tagName == "BUTTON") {
            const id = clickTarget.parentElement.getAttribute("worker-id");
            const infos = workers.filter((infos) => infos.id == id)[0];
            // expCounter = infos.experiences.length;
            setWorkerInfos(infos);
            const inputs = Array.from(
                modalForum.querySelectorAll("input, #role")
            ).slice(1);
            inputs.forEach((input) => toggleError(input, false));
            modal.classList.toggle("hidden");
            modal.classList.toggle("flex");
            modal.ariaHidden = false;
        }
    }
}

function closeModal(e = null, btn = null) {
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
    modal.ariaHidden = true;
    if (e) e.target.blur();
    if (btn) btn.blur();
}

function showAddedWorker(workerInfos, edit = false) {
    if (!edit) {
        const roleText =
            modalForum.querySelector("#role").options[workerInfos.role].text;
        const divTemplate = `
        <div worker-id=${workerInfos.id} class='flex gap-3 items-center bg-[color-mix(in_oklab,var(--accent-clr)_10%,transparent_90%)] p-(--padding-g) rounded-(--b-r) '>
            <div class='aside__worker__left flex gap-3 items-center '>
                <img class='img img--sidebar min-h-[6rem] max-h-[6rem]' src=${workerInfos.photoUrl}>
                <div class='flex flex-col'>
                    <h3>${workerInfos.name}</h3>
                    <span class='text-(--accent-clr)' style='font-size: var(--fs-text)'>${roleText}</span>
                </div>
            </div>
            <button class='btn text-(--secondary-clr) ml-auto' style='font-size: var(--fs-text)' >Edit</button>
        </div>
    `;
        workersDiv.innerHTML += divTemplate;
    } else {
        const div = document.querySelector(`[worker-id='${workerInfos.id}']`);
        const roleText =
            modalForum.querySelector("#role").options[workerInfos.role].text;
        div.innerHTML = `
        <div class='aside__worker__left flex gap-3 items-center '>
                <img class='img img--sidebar min-h-[6rem] max-h-[6rem]' src=${workerInfos.photoUrl}>
                <div class='flex flex-col'>
                    <h3>${workerInfos.name}</h3>
                    <span class='text-(--accent-clr)' style='font-size: var(--fs-text)'>${roleText}</span>
                </div>
            </div>
            <button class='btn text-(--secondary-clr) ml-auto' style='font-size: var(--fs-text)' >Edit</button>
    `;
    }
}

function storeWorkerInfos(values) {
    // infos object visualisation
    // const infos = {
    //     id: ++GlobalId,
    //     name: "",
    //     role: "",
    //     email: "",
    //     phone: "",
    //     photoUrl: "",
    //     experiences: [{
    //         company: "",
    //         role: "",
    //         from: "",
    //         to: ""
    //     }]
    // };
    let edit = Boolean(values[0]);
    const infos = { id: edit ? values[0] : ++GlobalId };

    values.slice(1).forEach((value, ind) => {
        if (ind < 5) {
            infos[fieldsLabs[ind]] = value;
        } else {
            const expInd = Math.floor((ind - 5) / 4);
            const expFieldInd = (ind - 5) % 4;
            if (!expFieldInd) {
                if (!expInd) {
                    infos.experiences = [{}];
                } else infos.experiences.push({});
            }
            infos.experiences[expInd][expLabs[expFieldInd]] = value;
        }
    });

    // fetch("assets/workers.json").then((res) => )

    if (edit) {
        workers.splice(getWorkersIndex(infos.id), 1, infos);
    } else workers.push(infos);
    showAddedWorker(infos, edit);
}

function setWorkerInfos(infos) {
    experiences.innerHTML = experiencesInitialState;
    const inputs = Array.from(modalForum.querySelectorAll("div>div>input"));
    const dropDown = modalForum.querySelector("#role");
    const expInputs = Array.from(experiences.querySelectorAll("input"));
    inputs.splice(2, 0, dropDown);
    let prevExpInd = 0;

    Object.values(infos).forEach((value, ind) => {
        if (ind < 6) {
            inputs[ind].value = value;
        } else {
            const exps = value; // array
            exps.forEach((row, expInd) => {
                if (expInd > prevExpInd) {
                    prevExpInd = expInd;
                    addExperience();
                    expInputs.push(
                        ...Array.from(
                            experiences.querySelectorAll(
                                `#experience_${expInd + 1} input`
                            )
                        )
                    );
                    //     experiences.querySelectorAll(
                    //         `#experience_${expInd + 1} input`
                    //     )
                    // );
                }
                Object.values(row).forEach((expValue, expFieldInd) => {
                    expInputs[expInd * 4 + expFieldInd].value = expValue;
                });
            });
        }
    });
}

function getWorkerInfos(e) {
    e.preventDefault();
    const inputs = Array.from(modalForum.querySelectorAll("input"));
    const dropDown = modalForum.querySelector("#role");
    inputs.splice(2, 0, dropDown);

    let values = inputs.map((input) => input.value);

    if (validateForm(inputs.slice(1))) {
        storeWorkerInfos(values);
        closeModal(null, saveWorkerBtn);
    }
}

function setPreview() {
    const img = picUrl.parentElement.nextElementSibling.firstElementChild;
    const url = picUrl.value || fallBackImg;

    img.onerror = null;

    img.onerror = () => {
        img.src = fallBackImg;
    };

    img.src = url;
}

function addExperience() {
    // e.preventDefault();
    const newExp = experiences.firstElementChild.cloneNode(true);
    newExp.querySelectorAll("input").forEach((input) => (input.value = ""));
    newExp.setAttribute("id", `experience_${++expCounter}`);
    const labs = newExp.querySelectorAll("label");
    const ins = newExp.querySelectorAll("input");
    for (let ind in Array.from(labs)) {
        const nInd = Number(ind);
        labs[ind].htmlFor = `${labs[ind].htmlFor.slice(0, -2)}_${nInd + 2}`;
        ins[ind].id = `${ins[ind].id.slice(0, -2)}_${nInd + 2}`;
        ins[ind].name = `${ins[ind].name.slice(0, -2)}_${nInd + 2}`;
        toggleError(ins[ind], false);
    }
    // const addBeforeThis = addExperienceBtn.parentNode;

    experiences.appendChild(newExp);
}

function initialize() {
    addWorkerBtn.addEventListener("click", addWorker);
    saveWorkerBtn.addEventListener("click", getWorkerInfos);
    addExperienceBtn.addEventListener("click", addExperience);
    picUrl.addEventListener("input", setPreview);
    workersDiv.addEventListener("click", (e) => {
        addWorker(e, true);
    });
    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", closeModal);
    });
}

// initialize();

export { initialize, fallBackImg };
