import { Router } from "express";
import { SuperAdminLoginController } from "../../../interfaceAdapters/controllers/superAdmin/SuperAdminLoginController";
import { InjectedGetAllAdminsDataForSuperAdminController, InjectedGetAnAdminForSuperAdminController, InjectedGetAnAdminsVisitorDataForSuperAdminController } from "../../injection/SuperAdminInjects";
import { Req, Res } from "../../types/ServerTypes";
import { PosterModel } from "../../../entities/models/superAdmin/Posters";


const router = Router();


router.post('/superadmin_login', SuperAdminLoginController.SuperAdminLoginControl);



// -------------------------------------| FETCHING ALL THE ADMIN DATA COLLECTION ---------------------------------------------------------------------------------|
router.get('/get_all_admins_data', InjectedGetAllAdminsDataForSuperAdminController.GetAllAdminForSuperAdminContol.bind(InjectedGetAllAdminsDataForSuperAdminController))


// -------------------------------------| FETCHING A SINGLE ADMIN DATA -------------------------------------------------------------------------|
router.get('/get_admin_profile/:adminId', InjectedGetAnAdminForSuperAdminController.GetAnAdminForSuperAdminControl.bind(InjectedGetAnAdminForSuperAdminController))


// -------------------------------------| GET THE VISITORS OF AN ADMIN -------------------------------------------------------------------------|
router.post('/get_admin_visitors', InjectedGetAnAdminsVisitorDataForSuperAdminController.GetAnAdminsVisitorsConrol.bind(InjectedGetAnAdminsVisitorDataForSuperAdminController))


router.post('/add_new_poster', async(req: Req, res: Res)=>{
    const saved = await PosterModel.findOneAndUpdate({_id: req.body.id}, {
        $set: {
            imageUrl: req.body.imageUrl
        }
    }, { new: true})

   res.json(saved)
})


router.get('/get_posters', async(req: Req, res: Res)=> {
    const newData = await PosterModel.find();

    res.json(newData)
})


export default router;