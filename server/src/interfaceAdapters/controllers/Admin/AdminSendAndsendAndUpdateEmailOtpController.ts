import { IAdminSendEmailOtpAndUpdateUseCase } from "../../../entities/useCasesInterfaces/admin/IAdminSendEmailOtpAndUpdateUseCase";
import { Req, Res } from "../../../frameworks/types/ServerTypes";



export class AdminSendAndUpdateEmailOtpController {
    constructor(
      private iadminsendemailotpandupdatetodbusecase: IAdminSendEmailOtpAndUpdateUseCase
    ) {}
  
    async SendEmailOtpAndSaveToDbControl(req: Req, res: Res): Promise<void> {
      try {
        const id = req.query.id as string; 
  
        if (!id) {
          res.status(400).json({ message: 'ID is required' });
          return;
        }
  
        const result = await this.iadminsendemailotpandupdatetodbusecase.SendEmailOtpAndupdateToDb(id);
  
        if (result) {
          res.status(200).json({ success: true, data: result });
        } else {
          res.status(500).json({ success: false, data: result  });
        }
      } catch (error: any) {
        console.error('Error in SendEmailOtpAndSaveToDbControl:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
  