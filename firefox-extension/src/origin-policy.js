const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

export function classifyPageUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return Object.freeze({ supported: false, safeForProtectedFill: false, reason: 'invalid-url' });
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return Object.freeze({
      supported: false,
      safeForProtectedFill: false,
      reason: 'unsupported-scheme',
      scheme: url.protocol,
    });
  }

  const loopback = LOOPBACK_HOSTS.has(url.hostname);
  const safeForProtectedFill = url.protocol === 'https:' || (url.protocol === 'http:' && loopback);

  return Object.freeze({
    supported: true,
    safeForProtectedFill,
    reason: safeForProtectedFill ? 'allowed' : 'insecure-origin',
    origin: url.origin,
    hostname: url.hostname,
    loopback,
  });
}

export function assertProtectedFillOrigin(value) {
  const classification = classifyPageUrl(value);
  if (!classification.supported || !classification.safeForProtectedFill) {
    const error = new Error('GoreeCloud Vault will not fill protected material into this origin.');
    error.code = classification.reason;
    throw error;
  }
  return classification;
}
