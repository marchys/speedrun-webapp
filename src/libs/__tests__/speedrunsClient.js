import identity from 'lodash/fp/identity';

describe('speedruns client', () => {
  const mockedClient = { put: jest.fn(), post: jest.fn() };

  const mockedAxios = {
    create: jest.fn(() => mockedClient),
  };

  const mockedAddErrorCatching = jest.fn(identity);

  const mockedApi = 'https://www.google.com';

  jest.mock('axios', () => mockedAxios);
  jest.mock('config', () => ({ speedrunsApi: mockedApi }));
  jest.mock('../interceptors', () => ({
    addErrorCatching: mockedAddErrorCatching,
  }));

  let speedrunsClient;
  beforeEach(async () => {
    jest.resetModules();
    mockedAxios.create.mockClear();
    mockedAddErrorCatching.mockClear();
    speedrunsClient = await import('../speedrunsClient');
  });

  test('should call axios create with api url', () => {
    expect(mockedAxios.create).toBeCalledWith({ baseURL: `${mockedApi}/api/v1` });
  });

  test('should call addErrorCatching interceptor', () => {
    expect(mockedAddErrorCatching).toBeCalled();
  });

  test('should be the mockedClient', () => {
    expect(speedrunsClient.default).toEqual(mockedClient);
  });
});
