const { deleteEntity } = require('../services/tableService')

module.exports = async function (context, req) {
  try {

    const { blog, id } = context.bindingData

    const entity = {
      PartitionKey: blog,
      RowKey: id.toString(),
    };

    const result = await deleteEntity('Posts', entity)

  } catch (error) {
    context.res = {
      status: 400,
      body: error.message
    };
  }

}