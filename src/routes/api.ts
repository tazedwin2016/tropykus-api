import { Router } from 'express';

const baseRouter = Router();

baseRouter.get('/', (req, res) => res.json({ status: 'live' }))

export default baseRouter;
