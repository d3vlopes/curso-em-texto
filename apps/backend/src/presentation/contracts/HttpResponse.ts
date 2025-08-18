export interface HttpResponse {
  statusCode: number;
  body: Record<string, unknown> | Error | null | any;
}
