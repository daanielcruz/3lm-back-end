import { Request, Response } from 'express';

import CategoryModel from '../models/Category';
import { logger } from '../config/logger';
import EmployeeModel from '../models/Employee';

class CategoryController {
  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const alreadyExists = await CategoryModel.findOne({ name });

      if (!name) {
        const message = { error: 'Invalid category name!' };
        logger.error(`POST /employee - ${JSON.stringify(message)}`);
        return res.status(400).json(message);
      }

      if (alreadyExists) {
        const message = { error: 'Category already exists!' };
        logger.error(`POST /employee - ${JSON.stringify(message)}`);
        return res.status(400).json(message);
      }

      const category = await CategoryModel.create({ name: name });

      logger.info(`POST /employee - ${JSON.stringify(category)}`);
      return res.json(category);
    } catch (e) {
      logger.error(`POST /employee - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      if (!id || !name) {
        const message = { error: 'Incorrect params!' };
        logger.error(`PUT /category - ${JSON.stringify(message)}`);
        return res.status(400).json(message);
      }

      const oldCategory = await CategoryModel.findByIdAndUpdate(
        { _id: id },
        { name },
      );

      await EmployeeModel.updateMany(
        { job_role: oldCategory?.name },
        { job_role: name },
      );

      const NewCategory = await CategoryModel.findById({ _id: id });

      logger.info(`PUT /category - ${JSON.stringify(NewCategory)}`);
      res.json(NewCategory);
    } catch (e) {
      logger.error(`PUT /category - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const list = await CategoryModel.find(req.query);

      logger.info(
        `GET /category - ${JSON.stringify({ action: 'List of categories' })}`,
      );
      res.json(list);
    } catch (e) {
      logger.error(`GET /category - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findById({ _id: id });

      if (!category) {
        const message = { error: 'Category not found!' };
        logger.error(`GET /category - ${JSON.stringify(message)}`);
        return res.status(404).json(message);
      }
      logger.info(`GET /category - ${JSON.stringify(category)}`);
      return res.json(category);
    } catch (e) {
      logger.error(`GET /category - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findByIdAndDelete({ _id: id });

      if (!category) {
        const message = { error: 'Category not found!' };
        logger.error(`DELETE /category - ${JSON.stringify(message)}`);
        return res.status(404).json(message);
      }

      await EmployeeModel.deleteMany({ job_role: category.name });

      const message = {
        employee: `${category.name}`,
        category: 'Successfully deleted!',
      };
      logger.info(`DELETE /category - ${JSON.stringify(message)}`);
      return res.json(message);
    } catch (e) {
      logger.error(`DELETE /category - ${JSON.stringify(e.message)}`);
      return res.status(400).json({ error: "Something's wrong!" });
    }
  }
}

export default new CategoryController();
