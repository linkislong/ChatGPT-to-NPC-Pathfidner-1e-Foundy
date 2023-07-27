const ChatGPT = require("chatgpt");

module.exports = async function (context) {
  const prompt = context.args.prompt;
  const npc = await ChatGPT.generateNPC(prompt);

  // Convert the NPC into a Foundry VTT statblock.
  const statblock = {
    name: npc.name,
    race: npc.race,
    class: npc.class,
    level: npc.level,
    stats: {
      strength: npc.stats.strength,
      dexterity: npc.stats.dexterity,
      constitution: npc.stats.constitution,
      intelligence: npc.stats.intelligence,
      wisdom: npc.stats.wisdom,
      charisma: npc.stats.charisma,
    },
    skills: npc.skills.map((skill) => ({
      name: skill.name,
      ranks: skill.ranks,
    })),
    feats: npc.feats.map((feat) => ({
      name: feat.name,
    })),
    equipment: npc.equipment.map((item) => ({
      name: item.name,
      description: item.description,
    })),
  };

  // Save the statblock to the Foundry VTT library.
  context.call("lib.save", {
    path: "npcs/" + npc.name + ".json",
    data: statblock,
  });
