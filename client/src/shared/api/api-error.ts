// The backend's RFC 7807 ProblemDetail, as a thrown error. status 0: no answer at all
export class ApiError extends Error {
  status: number
  title: string
  detail?: string

  constructor(status: number, title: string, detail?: string) {
    super(title)
    this.status = status
    this.title = title
    this.detail = detail
  }
}
