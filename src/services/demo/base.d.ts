declare namespace API {
  type ResStatusEnum = 200 | 400 | 401 | 403 | 404 | 500;

  interface AppRes<T = any> {
    code: ResStatusEnum;
    message: string;
    data: T;
  }
}
