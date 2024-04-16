import { CrudRouter } from '@src/helpers/database/crud.router';
import { IPhone } from '@src/models';
import { apiTokenValidation } from '@src/middleware';
import { phoneController } from '@src/controllers/phone.controller';
import Context from '@src/middleware/context';

class PhoneRouter extends CrudRouter<IPhone> {
  constructor() {
    super('/phone', phoneController);
    this.router.use(Context.create);
    this.prepareRouters();
    this.initRoutes([apiTokenValidation]);
  }
   private prepareRouters = () => {
    this.router.get('/congregation/:congregationId', phoneController.getPhoneCall);
    this.router.put('/congregation/:congregationId/:id', phoneController.updatePhoneId );
   };
}
 
export const phoneRouter = new PhoneRouter();
