import { userData } from './userModel';

export interface apiRes {
  message: string;
  data: Object | Array<any>;
  status: number;
  authentication: boolean;
}
