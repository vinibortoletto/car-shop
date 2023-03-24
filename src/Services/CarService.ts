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

  public async create(newCar: ICar): Promise<Car | null> {
    const car: ICar = await this._model.create(newCar);
    return this.createCarDomain(car);
  }

  public async find(): Promise<(Car | null)[]> {
    const carList: ICar[] = await this._model.find();
    const carDomainList: (Car | null)[] = carList.map((car) => this.createCarDomain(car));
    return carDomainList;
  }

  public async findById(id: string): Promise<Car | null> {
    const car: ICar | null = await this._model.findById(id);
    const carDomain: Car | null = this.createCarDomain(car);
    if (!carDomain) throw new NotFound(carNotFound);
    return carDomain;
  }
  
  public async findByIdAndUpdate(newCar:ICar, id: string): Promise<Car | null> {
    const car: ICar | null = await this._model.findByIdAndUpdate(newCar, id);
    const carDomain: Car | null = this.createCarDomain(car);
    if (!carDomain) throw new NotFound(carNotFound);
    return carDomain;
  }
}
