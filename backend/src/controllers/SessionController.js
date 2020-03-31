const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();
    
      if (!ong) {
        return response.status(400).json({ error: 'No ONG found with this ID'}); 
      }

    const { name } = ong;

    return response.json({
      ong: {
        id,
        name
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};