'use strict';

var StripeResource = require('../StripeResource');
var stripeMethod = StripeResource.method;

module.exports = StripeResource.extend({
  // Since path can either be `account` or `accounts`, support both through stripeMethod path

  create: stripeMethod({
    method: 'POST',
    path: 'accounts',
  }),

  list: stripeMethod({
    method: 'GET',
    path: 'accounts',
    methodType: 'list',
  }),

  update: stripeMethod({
    method: 'POST',
    path: 'accounts/{id}',
    urlParams: ['id'],
  }),

  // Avoid 'delete' keyword in JS
  del: stripeMethod({
    method: 'DELETE',
    path: 'accounts/{id}',
    urlParams: ['id'],
  }),

  reject: stripeMethod({
    method: 'POST',
    path: 'accounts/{id}/reject',
    urlParams: ['id'],
  }),

  retrieve: function(id) {
    // No longer allow an api key to be passed as the first string to this function due to ambiguity between
    // old account ids and api keys. To request the account for an api key, send null as the id
    if (typeof id === 'string') {
      return stripeMethod({
        method: 'GET',
        path: 'accounts/{id}',
        urlParams: ['id'],
      }).apply(this, arguments);
    } else {
      if (id === null || id === undefined) {
        // Remove id as stripeMethod would complain of unexpected argument
        [].shift.apply(arguments);
      }
      return stripeMethod({
        method: 'GET',
        path: 'account',
      }).apply(this, arguments);
    }
  },

  /**
   * Accounts: Capability methods
   */

  listCapabilities: stripeMethod({
    method: 'GET',
    path: 'accounts/{accountId}/capabilities',
    urlParams: ['accountId'],
    methodType: 'list',
  }),

  retrieveCapability: stripeMethod({
    method: 'GET',
    path: 'accounts/{accountId}/capabilities/{capabilityId}',
    urlParams: ['accountId', 'capabilityId'],
  }),

  updateCapability: stripeMethod({
    method: 'POST',
    path: 'accounts/{accountId}/capabilities/{capabilityId}',
    urlParams: ['accountId', 'capabilityId'],
  }),

  /**
   * Accounts: External account methods
   */

  createExternalAccount: stripeMethod({
    method: 'POST',
    path: 'accounts/{accountId}/external_accounts',
    urlParams: ['accountId'],
  }),

  listExternalAccounts: stripeMethod({
    method: 'GET',
    path: 'accounts/{accountId}/external_accounts',
    urlParams: ['accountId'],
    methodType: 'list',
  }),

  retrieveExternalAccount: stripeMethod({
    method: 'GET',
    path: 'accounts/{accountId}/external_accounts/{externalAccountId}',
    urlParams: ['accountId', 'externalAccountId'],
  }),

  updateExternalAccount: stripeMethod({
    method: 'POST',
    path: 'accounts/{accountId}/external_accounts/{externalAccountId}',
    urlParams: ['accountId', 'externalAccountId'],
  }),

  deleteExternalAccount: stripeMethod({
    method: 'DELETE',
    path: 'accounts/{accountId}/external_accounts/{externalAccountId}',
    urlParams: ['accountId', 'externalAccountId'],
  }),

  /**
  * Accounts: LoginLink methods
  */

  createLoginLink: stripeMethod({
    method: 'POST',
    path: 'accounts/{accountId}/login_links',
    urlParams: ['accountId'],
  }),

  /**
   * Accounts: Person methods
   */

  createPerson: stripeMethod({
    method: 'POST',
    path: 'accounts/{accountId}/persons',
    urlParams: ['accountId'],
  }),

  listPersons: stripeMethod({
    method: 'GET',
    path: 'accounts/{accountId}/persons',
    urlParams: ['accountId'],
    methodType: 'list',
  }),

  retrievePerson: stripeMethod({
    method: 'GET',
    path: 'accounts/{accountId}/persons/{personId}',
    urlParams: ['accountId', 'personId'],
  }),

  updatePerson: stripeMethod({
    method: 'POST',
    path: 'accounts/{accountId}/persons/{personId}',
    urlParams: ['accountId', 'personId'],
  }),

  deletePerson: stripeMethod({
    method: 'DELETE',
    path: 'accounts/{accountId}/persons/{personId}',
    urlParams: ['accountId', 'personId'],
  }),
});
