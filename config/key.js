if (process.env.NODE_ENV === "productioin") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
