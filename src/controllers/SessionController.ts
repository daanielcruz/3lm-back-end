import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import AdminModel from '../models/Admin';

import { logger } from '../config/logger';

class SessionController {
  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'You need to send email and password to start a new session!',
        });
      }

      const User = await AdminModel.findOne({ email });

      if (User) {
        const { password: userPass, _id: id } = User;
        const isCorrect = bcrypt.compareSync(password, userPass);

        if (process.env.SECRET) {
          if (isCorrect) {
            const token = jwt.sign({ email }, process.env.SECRET);
            logger.info(
              `POST /login - ${JSON.stringify({ email, id, token })}`,
            );
            return res.json({ email, id, token });
          }
        } else {
          return;
        }

        const message = { error: 'Incorrect password!' };
        logger.error(`POST /login - ${JSON.stringify(message)}`);
        return res.status(401).json(message);
      } else {
        const message = { error: "User doesn't exists!" };

        logger.error(`POST /login - ${JSON.stringify(message)}`);
        return res.status(401).json(message);
      }
    } catch (e) {
      logger.error(`POST /login - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }
}

export default new SessionController();
