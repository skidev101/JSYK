import { validationResult } from 'express-validator';

module.exports = (req, res, next) => {
   console.log('now in request validator')
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({
         success: false,
         errors: errors.array()
      });
   }

   next()
}