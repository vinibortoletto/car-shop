import { model, Model, models, Schema, UpdateQuery } from 'mongoose';

export default class AbstractODM<T> {
  protected _model: Model<T>;

  constructor(
    protected _schema: Schema,
    protected _modelName: string,
  ) {
    this._model = models[this._modelName] || model(this._modelName, this._schema);
  }

  public async create(obj: T): Promise<T> {
    return this._model.create(obj);
  }

  public async find(): Promise<T[]> {
    return this._model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this._model.findById(id);
  }

  public async findByIdAndUpdate(
    obj: UpdateQuery<T>, 
    id: string,
  ): Promise<T | null> {
    return this._model.findByIdAndUpdate(id, obj, { new: true });
  }
}
