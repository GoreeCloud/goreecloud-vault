export const CONTRACT_VERSION = '0.1.0';

export const extensionCapabilities = Object.freeze({
  contractVersion: CONTRACT_VERSION,
  lifecycle: 'pre-alpha',
  credentialAuthority: 'goreecloud-vault',
  credentialSource: 'blocked-pending-reviewed-client-connection',
  permissions: Object.freeze({
    installTimeHostAccess: false,
    activeTabOnlyByDefault: true,
    optionalHostAccessDeclared: true,
  }),
  capabilities: Object.freeze({
    pageFieldDetection: true,
    generatedPasswordFill: true,
    passwordGenerator: true,
    passphraseGenerator: false,
    credentialQuery: false,
    credentialFill: false,
    credentialSaveOrUpdate: false,
    totp: false,
    passkeys: false,
  }),
});
