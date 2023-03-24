import { Motorcycle } from '../Domains';
import { IMotorcycle } from '../Interfaces';
import { MotorcycleODM } from '../Models';

export default class MotorcycleService {
  private _model = new MotorcycleODM();

  private createMotorcycleDomain(
    motorcycle: IMotorcycle | null,
  ): Motorcycle | null {
    if (!motorcycle) return null;
    return new Motorcycle(motorcycle);
  }

  public async create(newMotorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycle: IMotorcycle = await this._model.create(newMotorcycle);
    return this.createMotorcycleDomain(motorcycle);
  }

  public async find(): Promise<(Motorcycle | null)[]> {
    const motorcycleList: IMotorcycle[] = await this._model.find();
    const motorcycleDomainList: (Motorcycle | null)[] = motorcycleList.map(
      (motorcycle) => this.createMotorcycleDomain(motorcycle),
    );
    return motorcycleDomainList;
  }
}
