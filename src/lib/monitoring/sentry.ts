// Import necessary modules

import { captureException } from '@sentry/node';

const Monitoring = {
  // other functions...

  logError: (error: Error) => {
    captureException(error);
  }
};

// Development-only console info updated
console.info('Development-only log: ', 'Your log message here'); // at line 35

// Other code...
console.info('Another development-only log: ', 'Your log message here'); // at line 98

export default Monitoring;