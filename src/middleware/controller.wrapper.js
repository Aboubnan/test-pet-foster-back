export const controllerWrapper = (controller) => async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch(err){
      console.error(err);
      next(err);
    }
  };