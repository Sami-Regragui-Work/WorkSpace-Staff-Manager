// import { validateForm } from "./validation";
import { initialize } from "./workersCRUD.js";
import { sideBarAction } from "./sideBarCollapse.js";
import { startRooms } from "./rooms.js";

initialize();
sideBarAction();
startRooms();
