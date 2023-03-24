export default interface IService<T, U> {
  create(newObj: T): Promise<U | null>;
  find(): Promise<(U | null)[]>;
  findById(id: string): Promise<U | null>;
  findByIdAndUpdate(newObj: T, id: string): Promise<U | null>;
  findByIdAndDelete(id:string): Promise<boolean>;
}