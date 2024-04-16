import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@src/configurations';
import { ICongregation } from './congregation';
import { IApartment } from './apartment';

export interface IPhone extends Model {
  id: number;
  congregationId: number; 
  apartmentId: number;
  phones: string;
  canPhone: boolean;
  congregation?: ICongregation;
  apartment?: IApartment;
  assigned?: boolean;
  lastVisitStatus?: string;
  lastVisitDate?: Date;
  createdAt: Date; 
  updatedAt: Date;
}

const model = {
  congregationId: {
    type: DataTypes.NUMBER,
  },
  apartmentId: {
    type: DataTypes.NUMBER,
  },
  phones: {
    type: DataTypes.STRING,
  },
  canPhone: {
    type: DataTypes.BOOLEAN,
    default: true,
  },
  assigned: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  lastVisitStatus: {
    type: DataTypes.STRING,
    defaultValue: 'NO_ATENDIO',
  },
  lastVisitDate: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false, 
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false, 
  },
};


const Phone = sequelize.define<IPhone>('Phone', model);

export { Phone };
