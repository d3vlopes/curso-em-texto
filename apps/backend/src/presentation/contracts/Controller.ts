import { HttpResponse } from './HttpResponse';

export interface Controller<T = unknown> {
  handle(input: T): Promise<HttpResponse>;
}

export interface ControllerRequest {
  body: Record<string, unknown>;
  params: Record<string, unknown>;
}
