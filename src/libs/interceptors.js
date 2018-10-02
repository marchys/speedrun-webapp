import identity from 'lodash/fp/identity';

// eslint-disable-next-line import/prefer-default-export
export function addErrorCatching(client) {
  client.interceptors.response.use(identity, error => ({
    error,
  }));
  return client;
}
