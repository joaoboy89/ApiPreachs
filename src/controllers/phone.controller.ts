import { Response, NextFunction, Request } from 'express';
import { IPhone } from '@src/models';
import { ApiResponse } from '@src/interfaces';
import { CrudController } from '@src/helpers';
import { phoneService } from '@src/services/phone.service';

class PhoneController extends CrudController<IPhone> {
  constructor() {
    super(phoneService, 'phone-controller');
  } 

  public getPhoneCall = async (
    req: Request<{congregationId: number}>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {congregationId} = req.params;
      const result = await phoneService.getPhonesCall(congregationId);
      const apiResponse: ApiResponse<any> = {
        statusCode: 200,
        statusMessage: 'Success',
        data: result,
      };
      res.status(200).json(apiResponse);
     
    } catch (error) {
      next(error);
    }
  };
  
  public updatePhoneId = async (
    req: Request<{congregationId: number, id: number, result: any }>,
    res: Response,
    next: NextFunction,)
  :  Promise<void> => {
    try {
      const {congregationId, id} = req.params;
      const {result} = req.body;
      const resultado  = await phoneService.phoneIdUpdate(congregationId, id, result);
      const apiResponse: ApiResponse<any> = {
        statusCode: 200,
        statusMessage: 'Success',
        data: resultado,
      };
      res.status(200).json(apiResponse);
    } catch (error) {
      next(error);
    }
  };
}

export const phoneController = new PhoneController();
