type TokenKind = 'plain' | 'comment' | 'string' | 'keyword' | 'number' | 'operator';

type Token = {
  kind: TokenKind;
  value: string;
};

const languageAliases: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  yml: 'yaml',
};

const keywordMap: Record<string, Set<string>> = {
  python: new Set([
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'False',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'None',
    'nonlocal',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'True',
    'try',
    'while',
    'with',
    'yield',
  ]),
  javascript: new Set([
    'async',
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'from',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'let',
    'new',
    'null',
    'return',
    'switch',
    'this',
    'throw',
    'true',
    'try',
    'typeof',
    'undefined',
    'var',
    'void',
    'while',
  ]),
  typescript: new Set([
    'async',
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'from',
    'function',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'interface',
    'let',
    'new',
    'null',
    'private',
    'protected',
    'public',
    'readonly',
    'return',
    'switch',
    'this',
    'throw',
    'true',
    'try',
    'type',
    'typeof',
    'undefined',
    'var',
    'void',
    'while',
  ]),
  bash: new Set([
    'case',
    'do',
    'done',
    'echo',
    'elif',
    'else',
    'esac',
    'fi',
    'for',
    'function',
    'if',
    'in',
    'local',
    'return',
    'then',
    'while',
  ]),
  json: new Set(['false', 'null', 'true']),
  yaml: new Set(['false', 'null', 'true']),
};

function normalizeLanguage(language: string) {
  const normalized = language.trim().toLowerCase();
  return languageAliases[normalized] ?? normalized;
}

function commentDelimiter(language: string) {
  if (language === 'python' || language === 'bash' || language === 'yaml') {
    return '#';
  }

  if (language === 'javascript' || language === 'typescript' || language === 'json') {
    return '//';
  }

  return null;
}

function readString(source: string, quote: string) {
  let cursor = quote.length;

  while (cursor < source.length) {
    const char = source[cursor];

    if (char === '\\') {
      cursor += 2;
      continue;
    }

    if (source.startsWith(quote, cursor)) {
      cursor += quote.length;
      break;
    }

    cursor += 1;
  }

  return source.slice(0, cursor);
}

function tokenizeLine(line: string, language: string) {
  const tokens: Token[] = [];
  const keywords = keywordMap[language] ?? new Set<string>();
  const commentStart = commentDelimiter(language);
  let rest = line;

  while (rest.length > 0) {
    const whitespace = /^\s+/.exec(rest);

    if (whitespace) {
      tokens.push({ kind: 'plain', value: whitespace[0] });
      rest = rest.slice(whitespace[0].length);
      continue;
    }

    if (commentStart && rest.startsWith(commentStart)) {
      tokens.push({ kind: 'comment', value: rest });
      break;
    }

    const quote = ['"""', "'''", '`', '"', "'"].find((candidate) => rest.startsWith(candidate));

    if (quote) {
      const stringToken = readString(rest, quote);
      tokens.push({ kind: 'string', value: stringToken });
      rest = rest.slice(stringToken.length);
      continue;
    }

    const numberToken = /^\d+(\.\d+)?/.exec(rest);

    if (numberToken) {
      tokens.push({ kind: 'number', value: numberToken[0] });
      rest = rest.slice(numberToken[0].length);
      continue;
    }

    const identifier = /^[A-Za-z_][A-Za-z0-9_-]*/.exec(rest);

    if (identifier) {
      const value = identifier[0];
      tokens.push({
        kind: keywords.has(value) ? 'keyword' : 'plain',
        value,
      });
      rest = rest.slice(value.length);
      continue;
    }

    const operator = /^[{}[\]().,:;=<>+\-*/%!&|^~]+/.exec(rest);

    if (operator) {
      tokens.push({ kind: 'operator', value: operator[0] });
      rest = rest.slice(operator[0].length);
      continue;
    }

    tokens.push({ kind: 'plain', value: rest[0] });
    rest = rest.slice(1);
  }

  return tokens;
}

export function highlightCode(code: string, language: string) {
  const normalizedLanguage = normalizeLanguage(language);

  return code.split('\n').map((line) => tokenizeLine(line, normalizedLanguage));
}

