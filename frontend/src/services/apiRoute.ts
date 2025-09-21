import { FetchApiOptions } from "@/services/fetchApi";

export type ApiRoute<Args extends any[], Res> = {
  build: (...args: Args) => FetchApiOptions;
  __responseType?: Res;
};

export function createRoute<Args extends any[], Res>(build: (...args: Args) => FetchApiOptions): ApiRoute<Args, Res> {
  return { build };
}
