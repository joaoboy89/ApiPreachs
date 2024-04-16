import moment from 'moment';
import { IPhone, Phone } from '@src/models';
import { DatabaseSqlService } from '@src/helpers';

class PhoneService extends DatabaseSqlService<IPhone> {
  constructor() {
    super(Phone, 'phone-service');
  }

  public getPhonesCall = async (congregationId: number): Promise<IPhone[]> => {
    const dateContest = moment().subtract(3, 'months').format('YYYY-MM-DD');
    const dateNotContest = moment().subtract(3, 'week').format('YYYY-MM-DD');
    const limit = 10;
    const query =
      `SELECT p.* FROM congre_admin.phones p
      JOIN congre_admin.Apartments a ON a.id = p.apartmentId 
      WHERE p.congregationId = ${congregationId} AND p.canPhone = true AND p.assigned = false AND a.assigned = false  
      AND (
      (lastVisitStatus = 'ATENDIO' AND COALESCE(lastVisitDate, '2000-01-01') < '${dateContest}')
      OR
      (lastVisitStatus = 'NO_ATENDIO' AND COALESCE(lastVisitDate, '2000-01-01') < '${dateNotContest}')
      OR
      (lastVisitStatus IS NULL AND COALESCE(lastVisitDate, '2000-01-01') < '${dateNotContest}')
      ) LIMIT ${limit};`;
    const phones = await this.query(query);
    const phoneUpdatePromises = phones.map(({ id }) =>
      phoneService.update(id, { assigned: true }),
    );
    await Promise.all(phoneUpdatePromises);
    return phones;
  };

  public phoneIdUpdate = async (congregationId: number, id: number, result: any): Promise<any> => {
    await Phone.update(
      {
        assigned: false,
        lastVisitStatus: result,
        lastVisitDate: new Date(),
        congregationId: congregationId,
      },
      { where: { id }},
    );
    return {
      success: true,
    };
  };
}

export const phoneService = new PhoneService();
