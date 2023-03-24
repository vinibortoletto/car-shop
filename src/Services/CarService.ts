import Car from '../Domains/Car';
import NotFound from '../Errors/NotFound';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import { carNotFound } from '../Utils/errorMessages';

export default class CarService {
  private _model = new CarODM();

  private createCarDomain(car: ICar | null): Car | null {
    if (!car) return null;
    return new Car(car);
  }
  
  public async create(newCar: ICar): Promise<ICar> {
    const unformattedCar: ICar = await this._model.create(newCar);
    const formattedCar: ICar = new Car(unformattedCar).format();
    return formattedCar;
  }

  public async find(): Promise<ICar[]> {
    const unformattedCarList: ICar[] = await this._model.find();
    const formattedCarList: ICar[] = unformattedCarList.map((car) => new Car(car).format());
    return formattedCarList;
  }

  public async findById(id: string): Promise<ICar | null> {
    const unformattedCar: ICar | null = await this._model.findById(id);
    if (!unformattedCar) throw new NotFound(carNotFound);

    const formattedCar = new Car(unformattedCar).format();
    return formattedCar;
  }
  
  public async findByIdAndUpdate(newCar:ICar, id: string): Promise<ICar | null> {
    const unformattedCar: ICar | null = await this._model.findByIdAndUpdate(newCar, id);
    if (!unformattedCar) throw new NotFound(carNotFound);
    
    const formattedCar = new Car(unformattedCar).format();
    return formattedCar;
  }
}
