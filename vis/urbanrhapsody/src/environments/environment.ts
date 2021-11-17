// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dataserver: 'http://216.165.113.162:5000',
  // aiserver: 'http://216.165.113.162:5001',
  aiserver: 'http://172.24.113.129:5001',
  // aiserver: 'http://172.24.113.150:5001',
  userserver: 'http://216.165.113.162:5002'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
