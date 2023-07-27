// This function creates a button on the top of the actor tab
function createButton() {
  const button = document.createElement("button");
  button.textContent = "Create NPC";
  button.addEventListener("click", () => {
    const textBox = document.createElement("input");
    textBox.type = "text";
    textBox.placeholder = "Paste text here";
    document.body.appendChild(textBox);
    textBox.focus();
    textBox.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        createNPC(textBox.value);
      }
    });
  });
  document.querySelector(".actor-tab-header").appendChild(button);
}

// This function creates a new NPC from the text that is pasted into the text box
function createNPC(text) {
  const data = parseText(text);
  const npc = createNPC(data);
  FoundryVTT.campaign.activeScene.addActor(npc);
}

// This function parses the text and extracts the important information
function parseText(text) {
  const config = configparser.ConfigParser();
  config.read("npc.cfg");

  class_levels = re.findall(r"(?<=class )\d+", text)
  hp = re.findall(r"(?<=hp )\d+", text)
  feats = re.findall(r"(?<=feats )\w+", text)
  skills = re.findall(r"(?<=skills )\w+", text)
  weapons = re.findall(r"(?<=weapons )\w+", text)
  armor = re.findall(r"(?<=armor )\w+", text)
  spells = re.findall(r"(?<=spells )\w+", text)
  name = re.findall(r"(?<=name )\w+", text)
  hit_die = re.findall(r"(?<=hit die )\w+", text)

  data = {
      "class_levels": class_levels,
      "hp": hp,
      "feats": feats,
      "skills": skills,
      "weapons": weapons,
      "armor": armor,
      "spells": spells,
      "name": name,
      "hit_die": hit_die,
  }

  for key, value in config["npc"].items():
    data[key] = value

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
  }

  return npc;
}

// This function is called when the module is loaded
function onLoad() {
  createButton();
}

if (window.module) {
  window.module.onLoad = onLoad;
}