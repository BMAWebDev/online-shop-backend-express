"use strict";
exports.__esModule = true;
var express_1 = require("express");
var helmet_1 = require("helmet");
var router_1 = require("#src/router");
var cors_1 = require("cors");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, helmet_1["default"])());
var corsConfig = {
    origin: "*"
};
app.use((0, cors_1["default"])(corsConfig));
// route everything
app.use("/", router_1["default"]);
exports["default"] = app;
