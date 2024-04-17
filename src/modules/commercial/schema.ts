import { z } from 'zod'
import { ReviewStatus } from './use-cases/complete-review'

const completeReviewSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    status: z.nativeEnum(ReviewStatus),
    rejected: z.optional(
      z.object({
        message: z.string()
      })
    )
  })
})

export { completeReviewSchema }
