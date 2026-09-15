const AMBIGUOUS = new Set(['0', 'O', '1', 'I', 'l', '|']);

const CHARACTER_CLASSES = Object.freeze({
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}:,.?',
});

function requireCrypto(cryptoImpl) {
  if (!cryptoImpl || typeof cryptoImpl.getRandomValues !== 'function') {
    throw new TypeError('A cryptographically secure random source is required.');
  }
  return cryptoImpl;
}

function randomIndex(maxExclusive, cryptoImpl) {
  if (!Number.isInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > 256) {
    throw new RangeError('Random selection range must be between 1 and 256.');
  }

  const random = requireCrypto(cryptoImpl);
  const ceiling = Math.floor(256 / maxExclusive) * maxExclusive;
  const byte = new Uint8Array(1);

  do {
    random.getRandomValues(byte);
  } while (byte[0] >= ceiling);

  return byte[0] % maxExclusive;
}

function filterAmbiguous(characters, excludeAmbiguous) {
  if (!excludeAmbiguous) return characters;
  return [...characters].filter((character) => !AMBIGUOUS.has(character)).join('');
}

function selectedClasses(options) {
  return Object.entries(CHARACTER_CLASSES)
    .filter(([name]) => options[name] !== false)
    .map(([name, characters]) => ({
      name,
      characters: filterAmbiguous(characters, options.excludeAmbiguous !== false),
    }))
    .filter(({ characters }) => characters.length > 0);
}

function choose(characters, cryptoImpl) {
  return characters[randomIndex(characters.length, cryptoImpl)];
}

function shuffle(characters, cryptoImpl) {
  const output = [...characters];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1, cryptoImpl);
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output.join('');
}

export function generatePassword(options = {}, cryptoImpl = globalThis.crypto) {
  const length = options.length ?? 24;
  if (!Number.isInteger(length) || length < 12 || length > 128) {
    throw new RangeError('Password length must be an integer between 12 and 128.');
  }

  const classes = selectedClasses(options);
  if (classes.length === 0) {
    throw new RangeError('At least one character class must be enabled.');
  }
  if (length < classes.length) {
    throw new RangeError('Password length is too short for the enabled character classes.');
  }

  const allCharacters = classes.map(({ characters }) => characters).join('');
  const password = classes.map(({ characters }) => choose(characters, cryptoImpl));

  while (password.length < length) {
    password.push(choose(allCharacters, cryptoImpl));
  }

  return shuffle(password, cryptoImpl);
}

export const passwordGeneratorDefaults = Object.freeze({
  length: 24,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: true,
});
