import queryString from 'query-string';

export const sendRequest = async ({
  url,
  method,
  body,
  headers = {},
  queryParams 
}) => {
  const options = {
    method: method,
    headers: new Headers({ 'content-type': 'application/json', ...headers }),
    body: body ? JSON.stringify(body) : null
  };
  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }
  return await fetch(url, options).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.json().then(function(json) {
        return Promise.reject({
          status: res.status,
          message: json.message,
        });
      });
    }
  });
};