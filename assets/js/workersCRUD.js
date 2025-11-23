import { validateForm, toggleError } from "./validation.js";
import {
    getWorkersLS,
    addWorkersLS /*, updateWorkerLS*/,
    deleteWorkerLS,
} from "./store.js";
import { roomsInfos, getListElementById } from "./rooms.js";

const addWorkerBtn = document.getElementById("add-worker");
const addExperienceBtn = document.getElementById("add-experience");
const saveWorkerBtn = document.getElementById("save-worker");
const workersDiv = document.getElementById("aside-workers");
const modal = document.getElementById("crud-modal");
const modalForum = document.getElementById("add-worker-modal");
const experiences = document.getElementById("experiences");
const picUrl = document.getElementById("pic");
const closeModalBtns = document.querySelectorAll(".close__modal");
const detailsModal = document.getElementById("worker-details-modal");
const detailsBody = document.getElementById("worker-details-content");
const closeDetailsBtn = document.getElementById("close-details-modal");

const fallBackImg = "assets/images/imgPlaceHolder.svg";
// to reset experiences to initial state (one experiences)
const experiencesInitialState = experiences.innerHTML;

const workers = getWorkersLS();
// console./log(getWorkersLS());

let expCounter;
let GlobalId = workers.length
    ? Math.max(...workers.map((worker) => worker.id))
    : 0;

const fieldsLabs = [
    "name",
    "role",
    "email",
    "phone",
    "photoUrl",
    "experiences",
];

const expLabs = ["company", "role", "from", "to"];

function getExpInputs() {
    const expInputs = Array.from(experiences.querySelectorAll("input"));
    return expInputs;
}

function getModalInputs() {
    const inputs = Array.from(modalForum.querySelectorAll("input, select"));
    return inputs;
}

// function getWorkersIndex(id) {
//     return workers.findIndex((worker) => worker.id == id);
// }

function updateWorkersArr(updatedWorker) {
    workers.forEach((worker, ind) => {
        if (worker.id == updatedWorker.id) workers[ind] = updatedWorker;
    });
    // console/.log(workers);
}

function updateSidebarWorkers() {
    workersDiv.innerHTML = "";
    workers.forEach((worker) => {
        if (!worker.where) showAddedWorker(worker);
    });
}

function workerActions(e) {
    const target = e.target;
    if (target.tagName == "BUTTON") {
        const type = target.getAttribute("data-type");
        if (type == "edit") addWorker(e, true);
        else {
            //delete
            const workerArticle = target.closest("article");
            const workerId = Number(workerArticle.getAttribute("worker-id"));
            workers.length = 0;
            workers.push(...deleteWorkerLS(workerId));
            updateSidebarWorkers();
        }
    } else showDetailsModal(target);
}

function addWorker(e, edit = false) {
    expCounter = 1;
    if (!edit) {
        experiences.innerHTML = experiencesInitialState;
        modalForum.reset();
        modalForum.querySelector("input[type='hidden']").value = "";
        const inputs = getModalInputs().slice(1);
        inputs.forEach((input) => toggleError(input, false));

        setPreview();
        modal.classList.toggle("hidden");
        modal.classList.toggle("flex");
        modal.ariaHidden = false;
    } else {
        const clickTarget = e.target;
        if (clickTarget.tagName == "BUTTON") {
            const id = Number(
                clickTarget.closest("article").getAttribute("worker-id")
            );
            const infos = workers.find((infos) => infos.id == id);
            // expCounter = infos.experiences.length;
            setWorkerInfos(infos);
            const inputs = getModalInputs().slice(1);
            inputs.forEach((input) => toggleError(input, false));
            modal.classList.toggle("hidden");
            modal.classList.toggle("flex");
            modal.ariaHidden = false;
        }
    }
}

function closeModal() {
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
    modal.ariaHidden = true;
    getModalInputs().forEach((input) => input.blur());
    modal.querySelectorAll("button").forEach((btn) => btn.blur());
}

function showAddedWorker(workerInfos, edit = false) {
    if (!edit) {
        const roleText =
            modalForum.querySelector("#role").options[workerInfos.role].text;
        const articleTemplate = `
        <article worker-id=${workerInfos.id} class='flex gap-3 items-center bg-[color-mix(in_oklab,var(--accent-clr)_10%,transparent_90%)] p-(--padding-g) rounded-(--b-r) min-w-[20.5rem]'>
            <div class='aside__worker__left flex gap-3 items-center '>
                <img class='img img--sidebar min-h-[6rem] max-h-[6rem]' src=${workerInfos.photoUrl} onerror="this.src='${fallBackImg}';">
                <div class='flex flex-col'>
                    <h3>${workerInfos.name}</h3>
                    <span class='text-(--accent-clr)' style='font-size: var(--fs-text)'>${roleText}</span>
                </div>
            </div>
            <div class='worker__btns'>
            <button data-type='edit' class='btn btn--edit '>Edit</button>
            <button data-type='delete' class='btn btn--delete '>Delete</button>
            </div>
        </article>
    `;
        workersDiv.innerHTML += articleTemplate;
    } else {
        const workerArticle = document.querySelector(
            `[worker-id='${workerInfos.id}']`
        );
        const roleText =
            modalForum.querySelector("#role").options[workerInfos.role].text;
        workerArticle.innerHTML = `
        <div class='aside__worker__left flex gap-3 items-center '>
                <img class='img img--sidebar min-h-[6rem] max-h-[6rem]' src=${workerInfos.photoUrl} onerror="this.src='${fallBackImg}';">
                <div class='flex flex-col'>
                    <h3>${workerInfos.name}</h3>
                    <span class='text-(--accent-clr)' style='font-size: var(--fs-text)'>${roleText}</span>
                </div>
            </div>
            <div class='worker__btns'>
            <button data-type='edit' class='btn btn--edit '>Edit</button>
            <button data-type='delete' class='btn btn--delete '>Delete</button>
            </div>
    `;
    }
}

function showDetailsModal(target) {
    const workerArticle =
        target.tagName == "ARTICLE" ? target : target.closest("article");
    if (workerArticle.tagName != "ARTICLE") return;
    const workerId = workerArticle.getAttribute("worker-id");
    const worker = getListElementById(workers, workerId);
    fillWorkerDetails(worker);
    detailsModal.classList.remove("hidden");
    detailsModal.classList.add("flex");
    detailsModal.ariaHidden = false;
}

function closeDetailsModal() {
    closeDetailsBtn.blur();
    detailsModal.classList.remove("flex");
    detailsModal.classList.add("hidden");
    detailsModal.ariaHidden = true;
}

function addExperiencesToDetail(experiences) {
    if (experiences.length == 0) {
        return `<div class="text-gray-400 italic mb-3">No experience records</div>`;
    }
    return experiences
        .map(
            (exp) =>
                `<div class="mb-4 p-4 rounded-(--b-r) bg-gray-50">
            <div class="text-blue-700 font-bold text-lg">${exp.company}</div>
            <div><b>Role:</b> ${exp.role}</div>
            <div><b>Period:</b> ${exp.from} - ${exp.to}</div>
        </div>`
        )
        .join("");
}

function fillWorkerDetails(workerInfos) {
    const roleText =
        modalForum.querySelector("#role").options[workerInfos.role].text;
    detailsBody.innerHTML = `
        <div class="flex gap-6 items-center pb-6">
            <img src="${workerInfos.photoUrl}"
                 alt="Profile Photo"
                 class="w-20 h-20 rounded-full border-4 border-blue-200 object-cover"
                 onerror="this.src='${fallBackImg}';""/>
            <div>
                <h3 class="text-xl font-bold">${workerInfos.name}</h3>
                <div class="text-blue-600 font-semibold mb-1">${roleText}</div>
                <div class="text-gray-600 text-sm"><b>Email:</b> ${
                    workerInfos.email
                }</div>
                <div class="text-gray-600 text-sm"><b>Phone:</b> ${
                    workerInfos.phone
                }</div>
                <div class="text-gray-600 text-sm"><b>Current Location:</b> ${
                    workerInfos.where
                        ? roomsInfos[workerInfos.where].title
                        : "Unassigned"
                }</div>
            </div>
        </div>
        <div>
            <h4 class="font-semibold text-lg mb-2">Work Experience</h4>
            ${addExperiencesToDetail(workerInfos.experiences)}
        </div>
    `;
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
    const infos = { id: edit ? Number(values[0]) : ++GlobalId };

    values.slice(1).forEach((value, ind) => {
        if (ind < 5) {
            infos[fieldsLabs[ind]] = value;
        } else {
            const expInd = Math.floor((ind - 5) / 4);
            const expFieldInd = (ind - 5) % 4;
            if (!expFieldInd) {
                if (!expInd) {
                    infos.experiences = [{ id: expInd + 1 }];
                } else infos.experiences.push({ id: expInd + 1 });
            }
            infos.experiences[expInd][expLabs[expFieldInd]] = value;
        }
    });

    // fetch("assets/workers.json").then((res) => )

    if (edit) {
        // workers.splice(getWorkersIndex(infos.id), 1, infos);
        updateWorkersArr(infos);
        addWorkersLS(workers);
    } else {
        workers.push(infos);
        addWorkersLS(workers);
    }
    showAddedWorker(infos, edit);
}

function setWorkerInfos(infos) {
    experiences.innerHTML = experiencesInitialState;
    const inputs = getModalInputs().slice(0, 6);
    const expInputs = getExpInputs();

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
                Object.values(row)
                    .slice(1)
                    .forEach((expValue, expFieldInd) => {
                        expInputs[expInd * 4 + expFieldInd].value = expValue;
                    });
            });
        }
    });
    setPreview();
}

function getWorkerInfos(e) {
    e.preventDefault();
    const inputs = getModalInputs();

    let values = inputs.map((input) => input.value);

    if (validateForm(inputs.slice(1))) {
        storeWorkerInfos(values);

        closeModal();
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
    const newExp = experiences.lastElementChild.cloneNode(true);
    newExp.querySelectorAll("input").forEach((input) => (input.value = ""));
    newExp.setAttribute("id", `experience_${++expCounter}`);
    const labs = newExp.querySelectorAll("label");
    const ins = newExp.querySelectorAll("input");
    for (let ind in Array.from(labs)) {
        labs[ind].htmlFor = `${labs[ind].htmlFor.slice(0, -2)}_${expCounter}`;
        ins[ind].id = `${ins[ind].id.slice(0, -2)}_${expCounter}`;
        ins[ind].name = `${ins[ind].name.slice(0, -2)}_${expCounter}`;
        toggleError(ins[ind], false);
    }
    // const addBeforeThis = addExperienceBtn.parentNode;
    const removeBtn = newExp.querySelector(".btn--xroom");
    removeBtn.classList.remove("hidden");

    experiences.appendChild(newExp);
}

// function ge

function removeExperience(e) {
    const target = e.target;
    if (target.tagName == "BUTTON") {
        const expSection = target.closest("section");
        const expId = Number(expSection.getAttribute("id").slice(-1));
        const workerId = Number(
            expSection.closest("form").querySelector("#id").value
        );
        const worker = getListElementById(workers, workerId);
        worker.experiences = worker.experiences.filter(
            (exp) => exp.id != expId
        );
        updateWorkersArr(worker);
        addWorkersLS(workers);
        expSection.remove();
        // expCounter--;
    }
}

function initialize() {
    addWorkerBtn.addEventListener("click", addWorker);
    saveWorkerBtn.addEventListener("click", getWorkerInfos);
    addExperienceBtn.addEventListener("click", addExperience);
    picUrl.addEventListener("input", setPreview);
    workersDiv.addEventListener("click", workerActions);
    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", closeModal);
    });
    closeDetailsBtn.addEventListener("click", closeDetailsModal);
    workers.forEach((worker) => {
        if (!worker.where) showAddedWorker(worker);
    });
    experiences.addEventListener("click", removeExperience);
}

// initialize();

export {
    initialize,
    fallBackImg,
    workers,
    modalForum,
    workersDiv,
    showAddedWorker,
    updateWorkersArr,
    updateSidebarWorkers,
    showDetailsModal,
};
