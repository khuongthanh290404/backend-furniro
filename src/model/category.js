const monggose = require("mongoose");

const schema = monggose.Schema;

const categorySchema = new schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = monggose.model("Category", categorySchema);
