import ICar from '../Interfaces/ICar';

export default class Car {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getModel(): string {
    return this.model;
  }

  public getYear(): number {
    return this.year;
  }

  public getColor(): string {
    return this.color;
  }

  public getBuyValue(): number {
    return this.buyValue;
  }

  public format(): ICar {
    return {
      id: this.id,
      model: this.model,
      year: this.year,
      color: this.color,
      status: this.status,
      buyValue: this.buyValue,
      doorsQty: this.doorsQty,
      seatsQty: this.seatsQty,
    };
  }
}
