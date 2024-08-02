
import { AdminSignupController } from '../src/interfaceAdapters/controllers/Admin/SignUpController';
import { IAdminSignUp } from '../src/entities/useCasesInterfaces/admin/IAdminSignupUseCase';


const mockAdminSignupUseCase = {
  AdminSignupExecut: jest.fn()
};


const adminSignupController = new AdminSignupController(mockAdminSignupUseCase as unknown as IAdminSignUp);

describe('AdminSignupController', () => {
  it('should handle signup', async () => {
    const request = {
      body: {
        username: "Arjun Kumar vs",
        email: "arjunsmokz177@gmail.com",
        phone: 87142518778,
        password: "12345678",
        verified: false,
        blocked: false,
        fcmToken: "eWQo3wG-tq9RbPLLELvtvI:APA91bG7abhp7XDBiLutl5i0OxCbXTGsrB_qPwCgvif0sbyTYycMA9WURizLRWnk5iaBY6ktqc6ORd1VJekw68RG98S1zQQN8I6Uao9umhBMagQ3Fq1ebhMSeubyOC5mV9sQTnq08grS"
      }
    };
    
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    (mockAdminSignupUseCase.AdminSignupExecut as jest.Mock).mockResolvedValue({
      _id: "123467",
      username: "Arjun Kumar vs",
      email: "arjunsmokz177@gmail.com",
      phone: 87142518778,
      password: "12345678",
      verified: false,
      blocked: false,
      fcmToken: "eWQo3wG-tq9RbPLLELvtvI:APA91bG7abhp7XDBiLutl5i0OxCbXTGsrB_qPwCgvif0sbyTYycMA9WURizLRWnk5iaBY6ktqc6ORd1VJekw68RG98S1zQQN8I6Uao9umhBMagQ3Fq1ebhMSeubyOC5mV9sQTnq08grS"
    });

    await adminSignupController.signUpAdmin(request as any, response as any);

  
    expect(mockAdminSignupUseCase.AdminSignupExecut).toHaveBeenCalledWith(request.body);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      _id: "123467",
      username: "Arjun Kumar vs",
      email: "arjunsmokz177@gmail.com",
      phone: 87142518778,
      password: "12345678",
      verified: false,
      blocked: false,
      fcmToken: "eWQo3wG-tq9RbPLLELvtvI:APA91bG7abhp7XDBiLutl5i0OxCbXTGsrB_qPwCgvif0sbyTYycMA9WURizLRWnk5iaBY6ktqc6ORd1VJekw68RG98S1zQQN8I6Uao9umhBMagQ3Fq1ebhMSeubyOC5mV9sQTnq08grS"
    });
  });
});
