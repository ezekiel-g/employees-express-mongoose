import express from 'express';
import handleDbError from '../util/handleDbError.js';

const crudEndpoints = (model) => {
  const router = express.Router();

  router.get('/', async (request, response) => {
    try {
      const documents = await model.find();

      return response.status(200).json(documents);
    } catch (error) {
      return handleDbError(response, error);
    }
  });

  router.get('/:id', async (request, response) => {
    try {
      const document = await model.findById(request.params.id);

      if (!document) return response.status(404).json([]);

      return response.status(200).json([document]);
    } catch (error) {
      return handleDbError(response, error);
    }
  });

  router.post('/', async (request, response) => {
    try {
      let document = new model(request.body);
      document = await document.save();

      return response.status(201).json([document]);
    } catch (error) {
      return handleDbError(response, error);
    }
  });

  router.patch('/:id', async (request, response) => {
    try {
      const document = await model.findByIdAndUpdate(
        request.params.id,
        { $set: request.body },
        { new: true, runValidators: true },
      );

      if (!document) return response.status(404).json([]);

      return response.status(200).json([document]);
    } catch (error) {
      return handleDbError(response, error);
    }
  });

  router.delete('/:id', async (request, response) => {
    try {
      const document = await model.findByIdAndDelete(request.params.id);

      if (!document) return response.status(404).json([]);

      return response.status(200).json([]);
    } catch (error) {
      return handleDbError(response, error);
    }
  });

  return router;
};

export default crudEndpoints;
