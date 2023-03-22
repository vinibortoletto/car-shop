import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private _model = new CarODM();
  
  public async create(newCar: ICar): Promise<ICar> {
    const car = await this._model.create(newCar);
    return car;
  }
}
