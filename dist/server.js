"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _config = _interopRequireDefault(require("./config"));

var _post = _interopRequireDefault(require("./resources/post/post.router"));

var _db = require("./utils/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
app.use('/post', _post.default);

const start = async () => {
  try {
    await (0, _db.connect)();
    app.listen(_config.default.port, () => {
      console.log(`Blogging RESTful API running on http://localhost:${_config.default.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;