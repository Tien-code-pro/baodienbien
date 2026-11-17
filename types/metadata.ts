export interface MetaData<T> {
  message: string;
  data: DataT<T>;
  status: number;
}

export interface DataT<T> {
  total: number;
  list: T[];
}

export interface Data<T> {
  message: string;
  data: T;
  status: number;
}
