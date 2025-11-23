import {
    workers,
    fallBackImg,
    modalForum,
    workersDiv,
    showAddedWorker,
    updateWorkersArr,
    updateSidebarWorkers,
} from "./workersCRUD.js";
import { addWorkersLS, getWorkersLS /*, updateWorkerLS*/ } from "./store.js";

const rooms = document.getElementById("rooms");
const roomsModal = document.getElementById("worker-assign-modal");
const workersList = document.getElementById("worker-list");
const closeBtn = document.getElementById("close-assign-modal");
const assignBtn = document.getElementById("assign-worker-btn");

const roomsInfos = [
    // 1: recep, 2: it tech, 3: security, 4: manager, 5: cleaner, 6: other
    {
        id: 1,
        title: "Conference Room",
        workersIds: [],
        allowedRoles: ["1", "2", "3", "4", "5", "6"],
        capacity: 5,
    },
    {
        id: 2,
        title: "Server Room",
        workersIds: [],
        allowedRoles: ["2", "4", "5"],
        capacity: 5,
    },
    {
        id: 3,
        title: "Security Room",
        workersIds: [],
        allowedRoles: ["3", "4", "5"],
        capacity: 5,
    },
    {
        id: 4,
        title: "Reception",
        workersIds: [],
        allowedRoles: ["1", "4", "5"],
        capacity: 5,
    },
    {
        id: 5,
        title: "Staff Room",
        workersIds: [],
        allowedRoles: ["1", "2", "3", "4", "5", "6"],
        capacity: 5,
    },
    {
        id: 6,
        title: "Archive",
        workersIds: [],
        allowedRoles: ["4", "6"],
        capacity: 5,
    },
];

let roomTarget;
let targetId;
let selectedWorkerIds = [];

// let unassignAll = true;
// unassignAll = false; // added these 2, just for debugging prior to implement the individuel unassign logic

function toggleRoomBg(roomDiv) {
    if (["1", "5"].includes(roomDiv.id.slice(-1))) return;
    const roomObj = getListElementById(roomsInfos, roomDiv.id.slice(-1));
    if (!roomObj.workersIds.length) roomDiv.classList.add("room--danger");
    else roomDiv.classList.remove("room--danger");
}

function getListElementById(list, targetId) {
    return list.find((element) => element.id == targetId);
}

function getUnassignedWorkers() {
    const allWorkers = getWorkersLS();
    // console/.log(getWorkersLS());
    // const assignedIds = roomsInfos.flatMap((room) => room.workersIds);
    // // console/.log(assignedIds);
    // return allWorkers.filter((worker) => !assignedIds.includes(worker.id));
    return allWorkers.filter((worker) => !worker.where);
}

function showWorkerInRoom(roomObj = null) {
    // console/.trace("roomObj.id:", roomObj.id);
    const roomDiv = roomTarget || rooms.querySelector(`#room-${roomObj.id}`);
    // console/.log(roomDiv);
    const assignedDiv = roomDiv.querySelector(".assigned-workers");

    // roomDiv.classList.remove("room--danger");
    toggleRoomBg(roomDiv);

    selectedWorkerIds.forEach((workerId) => {
        const worker = getListElementById(workers, workerId);
        if (!worker) return;
        assignedDiv.innerHTML += `
            <article worker-id="${worker.id}" class="assigned-worker">
                <h3>${worker.name}</h3>
                <button data-type="unassign" class="btn btn--small btn--xroom" title="Remove">
                    &times;
                </button>
            </article>
        `;
    });
    selectedWorkerIds = [];
}

function assignWorker(e) {
    if (!selectedWorkerIds || selectedWorkerIds.length === 0) {
        alert("Please select at least one worker.");
        return;
    }
    const roomId = targetId;
    const room = getListElementById(roomsInfos, roomId);

    let availableSlots = room.capacity - room.workersIds.length;
    let addedCount = 0;

    selectedWorkerIds.forEach((workerId) => {
        if (availableSlots > 0) {
            room.workersIds.push(workerId);
            availableSlots--;
            addedCount++;
            const workersLS = getWorkersLS();
            // console./log(workersLS);
            const worker = getListElementById(workersLS, workerId);
            worker.where = room.id;
            updateWorkersArr(worker);

            addWorkersLS(workers);
        }
    });

    if (addedCount < selectedWorkerIds.length) {
        alert("Some workers couldn't be added: room is full");
    }
    e.target.blur();
    roomsModal.classList.remove("flex");
    roomsModal.classList.add("hidden");
    roomsModal.ariaHidden = true;

    // assign here
    showWorkerInRoom(room);
    updateSidebarWorkers();

    // console/.log(roomsInfos);
}

function selectWorker(e) {
    const workerArticle = e.target.closest("article[worker-id]");
    if (!workerArticle) return;

    const workerId = Number(workerArticle.getAttribute("worker-id"));

    if (selectedWorkerIds.includes(workerId)) {
        workerArticle.classList.remove(
            "border-4",
            "border-(--primary-clr)",
            "selected-worker"
        );
        selectedWorkerIds = selectedWorkerIds.filter((id) => id != workerId);
    } else {
        workerArticle.classList.add(
            "border-4",
            "border-(--primary-clr)",
            "selected-worker"
        );
        selectedWorkerIds.push(workerId);
    }
}

function fillAssignModal() {
    if (roomTarget) {
        workersList.innerHTML = "";
        getUnassignedWorkers().forEach((worker) => {
            targetId = roomTarget.id.slice(-1);
            const canAccess = getListElementById(
                roomsInfos,
                targetId
            ).allowedRoles;

            if (canAccess.includes(worker.role)) {
                const roleText =
                    modalForum.querySelector("#role").options[worker.role].text;
                workersList.innerHTML += `
        <article worker-id=${worker.id} class='flex gap-3 items-center bg-[color-mix(in_oklab,var(--accent-clr)_10%,transparent_90%)] p-(--padding-g) rounded-(--b-r) min-w-[20.5rem]'>
            <div class='aside__worker__left flex gap-3 items-center '>
                <img class='img img--sidebar min-h-[6rem] max-h-[6rem]' src=${worker.photoUrl} onerror="this.src='${fallBackImg}';">
                <div class='flex flex-col'>
                    <h3>${worker.name}</h3>
                    <span class='text-(--accent-clr)' style='font-size: var(--fs-text)'>${roleText}</span>
                </div>
            </div>
        </article>
        `;
            }
        });
    }
}

function closeRoomsModal() {
    roomsModal.classList.remove("flex");
    roomsModal.classList.add("hidden");
    roomsModal.ariaHidden = true;
    closeBtn.blur();
}

function pickWorkers(target) {
    // console/.log(target.getAttribute("data-type"));
    roomTarget = target.parentElement;
    roomsModal.classList.remove("hidden");
    roomsModal.classList.add("flex");
    roomsModal.ariaHidden = false;
    fillAssignModal();
}

function assignWorkerFromLs() {
    const workersLS = getWorkersLS();
    workersLS.forEach((worker) => {
        if (worker.where) {
            const room = getListElementById(roomsInfos, worker.where);
            if (room) room.workersIds.push(worker.id);
            // console/.log(room);
        }
    });
    roomsInfos.forEach((room) => {
        if (room.workersIds.length) {
            selectedWorkerIds = room.workersIds;
            showWorkerInRoom(room);
        }
    });
    // updateSidebarWorkers();
}

function unassignWorker(target) {
    const workerArticle = target.closest("article[worker-id]");
    const workerId = workerArticle.getAttribute("worker-id");
    const roomDiv = target.closest(".room");
    const room = getListElementById(roomsInfos, roomDiv.id.slice(-1));
    const ind = room.workersIds.findIndex((id) => id == workerId);
    room.workersIds.splice(ind, 1);
    toggleRoomBg(target.closest(".room"));
    workerArticle.remove();
    const worker = getListElementById(workers, workerId);
    delete worker.where;
    updateWorkersArr(worker);
    addWorkersLS(workers);
    updateSidebarWorkers();
}

function roomActions(e) {
    const target = e.target;
    if (target.getAttribute("data-type") == "add") pickWorkers(target);
    else if (target.getAttribute("data-type") == "unassign")
        unassignWorker(target);
}

function startRooms() {
    rooms.addEventListener("click", roomActions);
    closeBtn.addEventListener("click", closeRoomsModal);
    workersList.addEventListener("click", selectWorker);
    assignBtn.addEventListener("click", assignWorker);

    // if (unassignAll) {
    //     workers.forEach((worker) => {
    //         if (worker.where) delete worker.where;
    //     });
    //     updateWorkersArr(workers);
    //     addWorkersLS(workers);
    // }
    assignWorkerFromLs();
}

export { startRooms, fillAssignModal };
