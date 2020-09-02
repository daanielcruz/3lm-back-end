import { Request, Response } from 'express';

import EmployeeModel from '../models/Employee';
import { logger } from '../config/logger';

class EmployeeController {
  async store(req: Request, res: Response) {
    try {
      const { imageUrl, name, last_name, job_role, salary, age } = req.body;

      if (!imageUrl || !name || !last_name || !job_role || !salary || !age) {
        const message = {
          error: 'You need to fill all fields to create a new employee!',
        };
        logger.error(`POST /employee - ${JSON.stringify(message)}`);
        return res.status(400).json(message);
      }

      const employee = await EmployeeModel.create({
        imageUrl,
        name,
        last_name,
        job_role,
        salary,
        age,
      });
      logger.info(`POST /employee - ${JSON.stringify(employee)}`);
      return res.json(employee);
    } catch (e) {
      logger.error(`POST /employee - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { imageUrl, name, last_name, job_role, salary, age } = req.body;

      if (
        !id ||
        !imageUrl ||
        !name ||
        !last_name ||
        !job_role ||
        !salary ||
        !age
      ) {
        const message = {
          error: 'You need to fill all fields to create a new employee!',
        };
        logger.error(`PUT /employee - ${JSON.stringify(message)}`);
        return res.status(400).json(message);
      }

      const employee = await EmployeeModel.findByIdAndUpdate(
        { _id: id },
        { imageUrl, name, last_name, job_role, salary, age },
        { new: true },
      );
      logger.info(`PUT /employee - ${JSON.stringify(employee)}`);
      res.json(employee);
    } catch (e) {
      logger.error(`PUT /employee - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const list = await EmployeeModel.find(req.query);

      logger.info(
        `GET /employee - ${JSON.stringify({ action: 'List of employees' })}`,
      );
      res.json(list);
    } catch (e) {
      logger.error(`GET /employee - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const employee = await EmployeeModel.findById({ _id: id });

      if (!employee) {
        const message = { error: 'Employee not found!' };
        logger.error(`GET /employee - ${JSON.stringify(message)}`);
        return res.status(404).json(message);
      }
      logger.info(`GET /employee - ${JSON.stringify(employee)}`);
      return res.json(employee);
    } catch (e) {
      logger.error(`GET /employee - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const employee = await EmployeeModel.findByIdAndDelete({ _id: id });

      if (!employee) {
        const message = { error: 'Employee not found!' };
        logger.error(`DELETE /employee - ${JSON.stringify(message)}`);
        return res.status(404).json(message);
      }

      const message = {
        employee: `${employee.name} ${employee.last_name}`,
        message: 'Successfully deleted!',
      };
      logger.info(`DELETE /employee - ${JSON.stringify(message)}`);
      return res.json(message);
    } catch (e) {
      logger.error(`DELETE /employee - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }
}

export default new EmployeeController();
