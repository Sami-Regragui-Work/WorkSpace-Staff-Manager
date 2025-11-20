import { workers, fallBackImg, modalForum } from "./workersCRUD.js";

const rooms = document.getElementById("rooms");
const roomsModal = document.getElementById("worker-assign-modal");
const workersList = document.getElementById("worker-list");
const closeBtn = document.getElementById("close-assign-modal");

const roomsInfos = [
    {
        id: 1,
        title: "Conference Room",
        workersIds: [],
        allowedRoles: ["Manager", "Cleaner", "Other"],
        capacity: 5,
    },
    {
        id: 2,
        title: "Server Room",
        workersIds: [],
        allowedRoles: ["IT Technician", "Manager", "Cleaner"],
        capacity: 5,
    },
    {
        id: 3,
        title: "Security Room",
        workersIds: [],
        allowedRoles: ["Security Agent", "Manager", "Cleaner"],
        capacity: 5,
    },
    {
        id: 4,
        title: "Reception",
        workersIds: [],
        allowedRoles: ["Receptionist", "Manager", "Cleaner"],
        capacity: 5,
    },
    {
        id: 5,
        title: "Staff Room",
        workersIds: [],
        allowedRoles: ["Manager", "Cleaner", "Other"],
        capacity: 5,
    },
    {
        id: 6,
        title: "Archive",
        workersIds: [],
        allowedRoles: ["Manager", "Other"],
        capacity: 5,
    },
];

function fillAssignModal() {
    workersList.innerHTML = "";
    workers.forEach((worker) => {
        const roleText =
            modalForum.querySelector("#role").options[worker.role].text;
        workersList.innerHTML += `
        <div worker-id=${worker.id} class='flex gap-3 items-center bg-[color-mix(in_oklab,var(--accent-clr)_10%,transparent_90%)] p-(--padding-g) rounded-(--b-r) min-w-[20.5rem]'>
            <div class='aside__worker__left flex gap-3 items-center '>
                <img class='img img--sidebar min-h-[6rem] max-h-[6rem]' src=${worker.photoUrl} onerror="this.src='${fallBackImg}';">
                <div class='flex flex-col'>
                    <h3>${worker.name}</h3>
                    <span class='text-(--accent-clr)' style='font-size: var(--fs-text)'>${roleText}</span>
                </div>
            </div>
            <button class='btn text-(--secondary-clr) ml-auto' style='font-size: var(--fs-text)' >Edit</button>
        </div>
        `;
    });
}

function closeRoomsModal() {
    roomsModal.classList.remove("flex");
    roomsModal.classList.add("hidden");
    roomsModal.ariaHidden = true;
    closeBtn.blur();
}

function pickWorkers(e) {
    const target = e.target;
    // console.log(target.getAttribute("data-type"));
    if (target.getAttribute("data-type") == "add") {
        roomsModal.classList.remove("hidden");
        roomsModal.classList.add("flex");
        roomsModal.ariaHidden = false;
    }
}

function startRooms() {
    rooms.addEventListener("click", pickWorkers);
    closeBtn.addEventListener("click", closeRoomsModal);
}

startRooms();

export { startRooms, fillAssignModal };
