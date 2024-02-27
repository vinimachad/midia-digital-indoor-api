import { Request, Response } from 'express'
import StripeEventsNotifierManager, {
  IStripeEventsNotifierManager
} from '@usecases/user/subscriptions/stripe-events-notifier-manager'

export interface IStripeController {
  stripeEventsNotifies(req: Request, res: Response): Promise<void>
}

export default function StripeController(
  stripeEventsNotifierManager: IStripeEventsNotifierManager = new StripeEventsNotifierManager()
): IStripeController {
  async function stripeEventsNotifies(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'] as string
    const body = req.body

    await stripeEventsNotifierManager.execute({ body, sig })
    res.send()
  }
  return { stripeEventsNotifies }
}
