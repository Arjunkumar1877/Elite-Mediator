"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminProfileController = void 0;
class UpdateAdminProfileController {
    constructor(updateadminprofileuecase) {
        this.updateadminprofileuecase = updateadminprofileuecase;
    }
    UpdateAdminProfileData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("✌️✌️✌️✌️✌️✌️✌️❤️❤️🤷‍♀️🤷‍♀️");
                const id = req.params.id;
                console.log(id);
                const data = yield this.updateadminprofileuecase.UpdateAdminProfile(req.body, id);
                res.json({ updated: true, data: data });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UpdateAdminProfileController = UpdateAdminProfileController;
