import Axios from 'axios';
import config from 'config';

import { addErrorCatching } from './interceptors';

const speedrunsClient = Axios.create({
  baseURL: `${config.speedrunsApi}/api/v1`,
});

export default addErrorCatching(speedrunsClient);
