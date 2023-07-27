// This function creates a button on the top of the actor tab
function createButton() {
  const button = document.createElement("button");
  button.textContent = "Create NPC";
  button.addEventListener("click", () => {
    const textBox = document.createElement("textarea"); // Use textarea instead of input for multiline text
    textBox.placeholder = "Paste text here";
    const createButton = document.createElement("button"); // Add a separate button for creating NPC
    createButton.textContent = "Create NPC";
    document.body.appendChild(textBox);
    document.body.appendChild(createButton);
    textBox.focus();
    createButton.addEventListener("click", () => {
      const npcData = parseText(textBox.value); // Use a different variable name to store the parsed data
      createNPC(npcData);
      textBox.remove(); // Remove the textbox after NPC creation
      createButton.remove(); // Remove the "Create NPC" button after NPC creation
    });
  });
  document.querySelector(".actor-directory .directory-footer").prepend(button); // Add button to the top of the actor tab
}

// This function parses the text and extracts the important information using JavaScript regex
function parseText(text) {
  const classLevels = text.match(/(?<=class )\d+/g);
  const hp = text.match(/(?<=hp )\d+/g);
  const feats = text.match(/(?<=feats )\w+/g);
  const skills = text.match(/(?<=skills )\w+/g);
  const weapons = text.match(/(?<=weapons )\w+/g);
  const armor = text.match(/(?<=armor )\w+/g);
  const spells = text.match(/(?<=spells )\w+/g);
  const name = text.match(/(?<=name )\w+/g);
  const hitDie = text.match(/(?<=hit die )\w+/g);

  const data = {
    "class_levels": classLevels,
    "hp": hp,
    "feats": feats,
    "skills": skills,
    "weapons": weapons,
    "armor": armor,
    "spells": spells,
    "name": name,
    "hit_die": hitDie,
  };

  return data;
}

// This function creates a new NPC based on the extracted information
function createNPC(data) {
  const npc = {
    "class_levels": data["class_levels"],
    "hp": data["hp"],
    "feats": data["feats"],
    "skills": data["skills"],
    "weapons": data["weapons"],
    "armor": data["armor"],
    "spells": data["spells"],
    "name": data["name"],
    "hit_die": data["hit_die"],
  };

  FoundryVTT.campaign.activeScene.createEmbeddedEntity("Actor", npc); // Use createEmbeddedEntity to create the NPC
}

// This function is called when the module is loaded
function onLoad() {
  createButton();
}

Hooks.on("ready", onLoad); // Use the Hooks.on function to run the code when Foundry VTT is ready
