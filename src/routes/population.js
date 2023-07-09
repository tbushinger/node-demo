
const messageSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' }
  }
};

export default function registerPopulationRoutes(server, populationService, routePrefix = "/api/population") {
  server.route({
    method: 'GET',
    url: `${routePrefix}/state/:state/city/:city`,
    schema: {
      response: {
        200: {
          type: 'number'
        },
        400: messageSchema,
        500: messageSchema
      }
    },
    handler: async (request, reply) => {
      const { state, city } = request.params;

      const { status, data } = await populationService.getPopulation(state, city);

      reply.code(status).send(data);
    }
  });

  server.route({
    method: 'PUT',
    url: `${routePrefix}/state/:state/city/:city`,
    schema: {
      response: {
        200: {
          type: 'boolean'
        },
        201: {
          type: 'boolean'
        },
        500: messageSchema
      },
      body: {
        type: 'number'
      }
    },
    handler: async (request, reply) => {
      const populationText = request.body;
      const population = parseInt(populationText, 36);

      const { status, data } = await populationService.setPopulation(state, city, population);

      reply.code(status).send(data);
    }
  });
}