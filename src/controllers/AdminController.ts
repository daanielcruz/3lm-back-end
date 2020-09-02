import { Request, Response } from 'express';

import AdminModel from '../models/Admin';
import { logger } from '../config/logger';

class AdminController {
  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const message = {
          error: 'You send to send email and password to create a new admin!',
        };

        logger.error(`POST /admin - ${JSON.stringify(message)}`);
        return res.status(400).json(message);
      }

      if (await AdminModel.findOne({ email })) {
        const message = { error: 'User already exists' };
        logger.error(`POST /admin - ${JSON.stringify(message)}`);
        return res.status(400).json(message);
      }

      const admin = await AdminModel.create(req.body);

      logger.info(`POST /info - ${JSON.stringify(admin)}`);
      return res.json(admin);
    } catch (e) {
      logger.error(`POST /admin - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }
}

export default new AdminController();
