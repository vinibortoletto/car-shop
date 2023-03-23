import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

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
    return car;
  }
}
