import { IAdminSendEmailOtpAndUpdateUseCase } from "../../entities/useCasesInterfaces/admin/IAdminSendEmailOtpAndUpdateUseCase";
import { SendEmailOtp } from "../../frameworks/services/NodeMailerService/nodeMailer";
import { IAdminRepository } from "../../interfaceAdapters/repositories/admin/IAdminRepository";
import otpGenerator from 'otp-generator';

export class AdminSendEmailOtpAndUpdateUseCase implements IAdminSendEmailOtpAndUpdateUseCase{
   constructor(private iadminrepository: IAdminRepository){};

   async SendEmailOtpAndupdateToDb(id: string): Promise<any> {
       const adminData = await this.iadminrepository.FindAdminById(id);
       const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: false,
      });

  
       if(adminData){
      const sendEmailOtp = await SendEmailOtp(adminData?.email, OTP);

      if(sendEmailOtp.success){
         return await this.iadminrepository.UpdateUnverifiedAdmin(OTP, adminData?.phone);
      }else{
        console.log("Error sending email otp in the nodemailer")
      }
       }else{
        console.log("user not found to update the email otp send to the user")
       }
   }
}