import axios from 'axios'

export type ProblemDetail = {
  status: number
  title: string
  detail?: string
}

// Converts an unknown error to a ProblemDetail object
export const toProblem = (error: unknown): ProblemDetail => {
  if (axios.isAxiosError<ProblemDetail>(error) && error.response) {
    const { status, data } = error.response

    return {
      status,
      title: data?.title ?? 'Something went wrong',
      detail: data?.detail,
    }
  }

  return {
    status: 0,
    title: 'Cannot reach the server',
    detail: 'Check your connection and try again.',
  }
}
