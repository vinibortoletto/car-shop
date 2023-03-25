import { UpdateQuery } from 'mongoose';
import { NotFound } from '../Errors';
import { AbstractODM } from '../Models';

export default class AbstractService<I, D> {
  constructor(
    protected _model: AbstractODM<I>,
    protected _domain: (obj: I | null) => D | null,
    protected _errorMessage: string,
  ) {}

  public async create(newObj: I): Promise<D | null> {
    const obj: I = await this._model.create(newObj);
    return this._domain(obj);
  }

  public async find(): Promise<(D | null)[]> {
    const objList: I[] = await this._model.find();
    const objDomainList: (D | null)[] = objList.map((obj) => this._domain(obj));
    return objDomainList;
  }

  public async findById(id: string): Promise<D | null> {
    const obj: I | null = await this._model.findById(id);
    const objDomain: D | null = this._domain(obj);
    if (!objDomain) throw new NotFound(this._errorMessage);
    return objDomain;
  }
  
  public async findByIdAndUpdate(newObj: UpdateQuery<I>, id: string): Promise<D | null> {
    const obj: I | null = await this._model.findByIdAndUpdate(newObj, id);
    const objDomain: D | null = this._domain(obj);
    if (!objDomain) throw new NotFound(this._errorMessage);
    return objDomain;
  }

  public async findByIdAndDelete(id: string): Promise<boolean> {
    const obj: I | null = await this._model.findByIdAndDelete(id);
    if (!obj) throw new NotFound(this._errorMessage);
    return true;
  }
}
