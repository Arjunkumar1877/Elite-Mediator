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
const express_1 = require("express");
const SuperAdminInjects_1 = require("../../injection/SuperAdminInjects");
const Posters_1 = require("../../../entities/models/superAdmin/Posters");
const AdminModel_1 = require("../../database/models/admin/AdminModel");
const SuperAdminModel_1 = require("../../database/models/superAdmin/SuperAdminModel");
const router = (0, express_1.Router)();
router.post('/super_admin_login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    const logged = yield SuperAdminModel_1.SuperAdminModel.findOne({ email, password });
    if (logged) {
        res.json({ success: true, superAdmin: logged });
    }
    else {
        res.json({ success: false, superAdmin: "" });
    }
}));
// -------------------------------------| FETCHING ALL THE ADMIN DATA COLLECTION ---------------------------------------------------------------------------------|
router.get('/get_all_admins_data', SuperAdminInjects_1.InjectedGetAllAdminsDataForSuperAdminController.GetAllAdminForSuperAdminContol.bind(SuperAdminInjects_1.InjectedGetAllAdminsDataForSuperAdminController));
// -------------------------------------| FETCHING A SINGLE ADMIN DATA -------------------------------------------------------------------------|
router.get('/get_admin_profile/:adminId', SuperAdminInjects_1.InjectedGetAnAdminForSuperAdminController.GetAnAdminForSuperAdminControl.bind(SuperAdminInjects_1.InjectedGetAnAdminForSuperAdminController));
// -------------------------------------| GET THE VISITORS OF AN ADMIN -------------------------------------------------------------------------|
router.post('/get_admin_visitors', SuperAdminInjects_1.InjectedGetAnAdminsVisitorDataForSuperAdminController.GetAnAdminsVisitorsConrol.bind(SuperAdminInjects_1.InjectedGetAnAdminsVisitorDataForSuperAdminController));
router.post('/add_new_poster', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saved = yield Posters_1.PosterModel.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            imageUrl: req.body.imageUrl
        }
    }, { new: true });
    res.json(saved);
}));
router.get('/get_posters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = yield Posters_1.PosterModel.find();
    res.json(newData);
}));
router.get("/block_an_admin/:adminId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blocked = yield AdminModel_1.AdminModel.findOneAndUpdate({ _id: req.params.adminId }, {
        $set: {
            blocked: true
        }
    });
    if (blocked) {
        res.json({ blocked: true });
    }
    else {
        res.json({ blocked: false });
    }
}));
router.get("/unblock_an_admin/:adminId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blocked = yield AdminModel_1.AdminModel.findOneAndUpdate({ _id: req.params.adminId }, {
        $set: {
            blocked: false
        }
    });
    if (blocked) {
        res.json({ unblocked: true });
    }
    else {
        res.json({ unblocked: false });
    }
}));
exports.default = router;
