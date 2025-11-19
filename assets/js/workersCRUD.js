const addWorkerBtn = document.getElementById("add-worker");
const addExperienceBtn = document.getElementById("add-experience");
const saveWorkerBtn = document.getElementById("save-worker");
const workersDiv = document.getElementById("aside-workers");
const modal = document.getElementById("crud-modal");
const modalForum = document.getElementById("add-worker-modal");
const experiences = document.getElementById("experiences");
const picUrl = document.getElementById("pic");
const closeModal = document.querySelectorAll(".close__modal");

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
        // console/.log("reseted");
        modalForum.reset();
        modalForum.querySelector("input[type='hidden']").value = "";
        setPreview();
        modal.classList.toggle("hidden");
        modal.classList.toggle("flex");
        modal.ariaHidden = false;
    } else {
        const clickTarget = e.target;
        if (clickTarget.tagName == "BUTTON") {
            id = clickTarget.parentElement.getAttribute("worker-id");
            const infos = workers.filter((infos) => infos.id == id)[0];
            // expCounter = infos.experiences.length;
            setWorkerInfos(infos);
            modal.classList.toggle("hidden");
            modal.classList.toggle("flex");
            modal.ariaHidden = false;
            // console/.log("edit mode");
        }
    }
}

function showAddedWorker(workerInfos, edit = false) {
    if (!edit) {
        console.log("add mode");
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
        console.log("edit mode");
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
    console.log("id input:", values[0]);
    edit = Boolean(values[0]);
    const infos = { id: edit ? values[0] : ++GlobalId };

    values.slice(1).forEach((value, ind) => {
        if (ind < 5) {
            infos[fieldsLabs[ind]] = value;

            // console/.log(infos);
        } else {
            const expInd = Math.floor((ind - 5) / 4);
            const expFieldInd = (ind - 5) % 4;
            // console/.log(expFieldInd);
            if (!expFieldInd) {
                // console/.log("expInd " + expInd);
                // console/.log("expFieldInd " + expFieldInd);
                // console/.log(infos);
                if (!expInd) {
                    // console/.log(infos);
                    // console/.log(infos.experiences);
                    infos.experiences = [{}];
                } else infos.experiences.push({});
            }
            infos.experiences[expInd][expLabs[expFieldInd]] = value;
        }
    });

    // fetch("assets/workers.json").then((res) => )
    // console/.log(infos);

    if (edit) {
        workers.splice(getWorkersIndex(infos.id), 1, infos);
    } else workers.push(infos);
    // console/.log(infos);
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
        // console/.log(value);
        if (ind < 6) {
            inputs[ind].value = value;

            // console/.log(infos);
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
                    // console/.log(
                    //     experiences.querySelectorAll(
                    //         `#experience_${expInd + 1} input`
                    //     )
                    // );
                }
                Object.values(row).forEach((expValue, expFieldInd) => {
                    // console/.log(expInputs);
                    expInputs[expInd * 4 + expFieldInd].value = expValue;
                    // console/.log(expInputs[expInd * 4 + expFieldInd].value);
                });
            });
        }
    });
}

function getWorkerInfos(e) {
    e.preventDefault();
    // console/.log(modalForum);
    const inputs = modalForum.querySelectorAll("input");
    const dropDown = modalForum.querySelector("#role");

    let values = Array.from(inputs).map((input) => input.value);
    const roleVal = dropDown.value;
    values.splice(2, 0, roleVal);
    // console/.log(values);
    storeWorkerInfos(values);
}

function setPreview() {
    picUrl.parentElement.nextElementSibling.firstElementChild.src =
        picUrl.value;
}

function addExperience() {
    // console/.log("cc");
    // e.preventDefault();
    const newExp = experiences.firstElementChild.cloneNode(true);
    newExp.querySelectorAll("input").forEach((input) => (input.value = ""));
    newExp.setAttribute("id", `experience_${++expCounter}`);
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
    closeModal.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            modal.classList.toggle("hidden");
            modal.classList.toggle("flex");
            modal.ariaHidden = true;
            e.target.blur();
        });
    });
}

initialize();
