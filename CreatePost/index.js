const { insertEntity } = require('../services/tableService')



module.exports = async function (context, req) {

  try {

    if (!req.body) {
      context.res = {
        status: 400,
        body: "Please pass a request body"
      };

      return
    }

    const { blog, title, content } = req.body

    if (!blog || !title || !content) {
      context.res = {
        status: 400,
        body: "Please pass blog, title and content"
      };

      return
    }

    const entity = {
      PartitionKey: blog,
      RowKey: new Date().getTime().toString(),
      title: title,
      content: content
    };

    const result = await insertEntity('Posts', entity)

    context.res = {
      body: result
    };

  } catch (error) {

    context.res = {
      status: 500, /* Defaults to 200 */
      body: error.message
    };

  }


}