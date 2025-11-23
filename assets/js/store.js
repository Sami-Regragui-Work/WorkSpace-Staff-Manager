function getWorkersLS() {
    return JSON.parse(localStorage.getItem("workers")) || [];
}

function addWorkersLS(workers) {
    localStorage.setItem("workers", JSON.stringify(workers));
}

// function updateWorkerLS(updatedWorker) {
//     const workers = getWorkersLS();
//     const updated = workers.map((worker) =>
//         worker.id == updatedWorker.id ? updatedWorker : worker
//     );
//     localStorage.setItem("workers", JSON.stringify(updated));
// }

function deleteWorkerLS(id) {
    const workers = getWorkersLS();
    const updated = workers.filter((worker) => worker.id != id);
    localStorage.setItem("workers", JSON.stringify(updated));
}

// function clearWorkersLS() {
//     localStorage.removeItem("workers");
// }

export { getWorkersLS, addWorkersLS, /*updateWorkerLS,*/ deleteWorkerLS };
