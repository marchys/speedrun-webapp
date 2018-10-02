import identity from 'lodash/fp/identity';

import { addErrorCatching } from '../interceptors';

describe('addErrorCatching', () => {
  test('should add error response interceptor', () => {
    const use = jest.fn();
    const client = {
      interceptors: { response: { use } },
    };

    addErrorCatching(client);

    expect(use).toBeCalledWith(identity, expect.any(Function));
    expect(use.mock.calls[0][1]('myError')).toEqual({ error: 'myError' });
  });
});
