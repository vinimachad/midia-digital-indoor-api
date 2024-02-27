import StripeController, { IStripeController } from '@controllers/payment/stripe-controller'
import express, { Router } from 'express'

const stripeRouter = Router()
const controller: IStripeController = StripeController()
stripeRouter.post('/payment-webhook', express.raw({ type: '*/*' }), controller.stripeEventsNotifies)
export default stripeRouter
