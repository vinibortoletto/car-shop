import Car from '../Domains/Car';
import NotFound from '../Errors/NotFound';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import { carNotFound } from '../Utils/errorMessages';

export default class CarService {
  private _model = new CarODM();
  
  public async create(newCar: ICar): Promise<ICar> {
    const unformattedCar: ICar = await this._model.create(newCar);
    const formattedCar: ICar = new Car(unformattedCar).format();
    return formattedCar;
  }

  public async find(): Promise<ICar[]> {
    const carList: ICar[] = await this._model.find();
    return carList;
  }

  public async findById(id: string): Promise<ICar | null> {
    const car: ICar | null = await this._model.findById(id);
    if (!car) throw new NotFound(carNotFound);
    return car;
  }
}
