export interface UseCaseResponse<T> {
  data?: T | null;
  error?: string | null;
}

export interface UseCase<TInputData, TResponseData> {
  execute(input?: TInputData): Promise<UseCaseResponse<TResponseData | null>>;
}
