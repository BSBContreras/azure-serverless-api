const { updateEntity } = require('../services/tableService')

module.exports = async function (context, req) {
  try {

    if (!req.body) {
      context.res = {
        status: 400,
        body: "Please pass a request body"
      };

      return
    }

    const { title, content } = req.body
    const { blog, id } = context.bindingData

    if (!title && !content) {
      context.res = {
        status: 400,
        body: "Please pass title or content"
      };

      return
    }

    const entity = {
      PartitionKey: blog,
      RowKey: id.toString(),
    };

    if (title) entity.title = title

    if (content) entity.content = content

    const result = await updateEntity('Posts', entity)

    context.res = {
      body: result
    };

  } catch (error) {
    context.res = {
      status: 400,
      body: error.message
    };
  }

}