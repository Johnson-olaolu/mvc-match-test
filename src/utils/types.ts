export interface IDelete {
  url: string;
}

export interface IPost extends IDelete {
  body?: any;
}

export type IPatch = IPost;

export type IPut = IPost;

export interface IGet extends IDelete {
  query?: Record<string, any>;
}

export interface IResponse<D> {
  data?: D;
  code?: number;
  error?: string;
}
