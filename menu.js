
// Add functions for starting the game, showing menus, hiding menus, selecting characters
selectedHazards = [];
function startGame() {

    globalThis.selectedHazards
  // Replace with your logic to start the game, considering selected hazards
  if (document.getElementById("wall-spikes").checked) {
    selectedHazards.push("Spikes Wall");
  }
  if (document.getElementById("hazard-dagger").checked) {
    selectedHazards.push("Daggers");
  }
  if (document.getElementById("hazard-spear").checked) {
    selectedHazards.push("Falling Spears");
  }
  localStorage.setItem("hazards",selectedHazards)
}




function showOptions() {
  document.getElementById("options-menu").classList.remove("hidden");
}

function hideOptions() {
  document.getElementById("options-menu").classList.add("hidden");
}



