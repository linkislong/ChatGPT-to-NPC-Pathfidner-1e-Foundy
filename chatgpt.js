const ChatGPT = require("chatgpt");

module.exports = {
  generateNPC(prompt) {
    return ChatGPT.generateNPC(prompt);
  },
};