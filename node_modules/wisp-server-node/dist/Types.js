"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_LEVEL = exports.STREAM_TYPE = exports.CONNECT_TYPE = void 0;
var CONNECT_TYPE;
(function (CONNECT_TYPE) {
    CONNECT_TYPE[CONNECT_TYPE["CONNECT"] = 1] = "CONNECT";
    CONNECT_TYPE[CONNECT_TYPE["DATA"] = 2] = "DATA";
    CONNECT_TYPE[CONNECT_TYPE["CONTINUE"] = 3] = "CONTINUE";
    CONNECT_TYPE[CONNECT_TYPE["CLOSE"] = 4] = "CLOSE";
})(CONNECT_TYPE || (exports.CONNECT_TYPE = CONNECT_TYPE = {}));
var STREAM_TYPE;
(function (STREAM_TYPE) {
    STREAM_TYPE[STREAM_TYPE["TCP"] = 1] = "TCP";
    STREAM_TYPE[STREAM_TYPE["UDP"] = 2] = "UDP";
})(STREAM_TYPE || (exports.STREAM_TYPE = STREAM_TYPE = {}));
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 0] = "DEBUG";
    LOG_LEVEL[LOG_LEVEL["INFO"] = 1] = "INFO";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 2] = "WARN";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["NONE"] = 4] = "NONE";
})(LOG_LEVEL || (exports.LOG_LEVEL = LOG_LEVEL = {}));
//# sourceMappingURL=Types.js.map