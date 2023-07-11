export const createBodyForMultipartFormData = (body) => {
    const data = new FormData();

    for (let field in body) {
      if (Array.isArray(body[field])) {
        body[field].forEach((file) => {
          data.append(field, file);
        });
      } else {
        data.append(field, body[field]);
      }
    }
    console.log(data);
    return data;
}