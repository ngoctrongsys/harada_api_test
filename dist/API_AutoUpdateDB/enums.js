"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUpdate = exports.TypeData = void 0;
/**
 * Enum type data
 */
var TypeData;
(function (TypeData) {
    TypeData["customer"] = "customer";
    TypeData["product"] = "product";
    TypeData["order"] = "order";
    // 2023.04.10
    TypeData["temp_design"] = "temp_design";
})(TypeData = exports.TypeData || (exports.TypeData = {}));
/**
 * Enum type update
 */
var TypeUpdate;
(function (TypeUpdate) {
    TypeUpdate["create"] = "create";
    TypeUpdate["update"] = "update";
    TypeUpdate["delete"] = "delete";
    TypeUpdate["cancelled"] = "cancelled";
    TypeUpdate["fulfilled"] = "fulfilled";
    TypeUpdate["paid"] = "paid";
    TypeUpdate["partially_fulfilled"] = "partially_fulfilled";
})(TypeUpdate = exports.TypeUpdate || (exports.TypeUpdate = {}));
//# sourceMappingURL=enums.js.map