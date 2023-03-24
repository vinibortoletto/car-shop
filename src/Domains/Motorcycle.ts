import { IMotorcycle } from '../Interfaces';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  public getCategory(): string {
    return this.category;
  }

  public getEngineCapacity(): number {
    return this.engineCapacity;
  }
}
