export default class AppError {
  constructor(
    public configs: {
      status_code: number
      message?: string
      title?: string
    }
  ) {}
}
