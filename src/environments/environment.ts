/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CHAT_SOCKET_ENPOINT:
    'wss://7o5p7mfv40.execute-api.ap-southeast-1.amazonaws.com/production',
  reconnectInterval: 5000,
  API_URL_EVALUETE:
    'https://li1jm77bc8.execute-api.ap-southeast-1.amazonaws.com/prod/leave',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
