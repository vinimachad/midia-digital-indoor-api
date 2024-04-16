import express, { Router } from 'express'
import SubscriptionFactory from './factory'

const subscriptionRouter = Router()
const controller = SubscriptionFactory.controller()
subscriptionRouter.post('/payment-webhook', express.raw({ type: '*/*' }), controller.stripeEventsNotifies)
export default subscriptionRouter
