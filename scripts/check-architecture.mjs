import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const appRoot = path.resolve('src/app');
const importPattern = /(?:from\s+|import\s*\()\s*['"]([^'"]+)['"]/g;

function collectTypeScriptFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return entry.name === 'testing' ? [] : collectTypeScriptFiles(absolutePath);
    }

    return entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts') ? [absolutePath] : [];
  });
}

function describeLayer(filePath) {
  const [firstSegment, featureName] = path.relative(appRoot, filePath).split(path.sep);

  if (firstSegment === 'features') {
    return { kind: 'feature', name: featureName };
  }

  if (firstSegment === 'core' || firstSegment === 'shared') {
    return { kind: firstSegment };
  }

  return { kind: 'app' };
}

function resolveImport(sourceFile, specifier) {
  let candidate;

  if (specifier.startsWith('@app/')) {
    candidate = path.join(appRoot, specifier.slice('@app/'.length));
  } else if (specifier.startsWith('@core/')) {
    candidate = path.join(appRoot, 'core', specifier.slice('@core/'.length));
  } else if (specifier.startsWith('@features/')) {
    candidate = path.join(appRoot, 'features', specifier.slice('@features/'.length));
  } else if (specifier.startsWith('@shared/')) {
    candidate = path.join(appRoot, 'shared', specifier.slice('@shared/'.length));
  } else if (specifier.startsWith('.')) {
    candidate = path.resolve(path.dirname(sourceFile), specifier);
  } else {
    return null;
  }

  const candidates = [candidate, `${candidate}.ts`, path.join(candidate, 'index.ts')];
  return candidates.find((filePath) => existsSync(filePath)) ?? null;
}

function validateDependency(sourceFile, targetFile, specifier) {
  const source = describeLayer(sourceFile);
  const target = describeLayer(targetFile);

  if (source.kind === 'shared' && (target.kind === 'core' || target.kind === 'feature')) {
    return 'shared must remain independent from core and feature code';
  }

  if (source.kind === 'core' && target.kind === 'feature') {
    return 'core must not depend on a feature';
  }

  if (
    source.kind === 'feature' &&
    target.kind === 'feature' &&
    source.name !== target.name &&
    specifier !== `@features/${target.name}`
  ) {
    return `feature "${source.name}" must consume feature "${target.name}" through its public barrel`;
  }

  return null;
}

const files = collectTypeScriptFiles(appRoot);
const graph = new Map(files.map((file) => [file, []]));
const violations = [];

for (const sourceFile of files) {
  const source = readFileSync(sourceFile, 'utf8');

  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];
    const targetFile = resolveImport(sourceFile, specifier);

    if (!targetFile) {
      continue;
    }

    graph.get(sourceFile)?.push(targetFile);
    const violation = validateDependency(sourceFile, targetFile, specifier);

    if (violation) {
      const line = source.slice(0, match.index).split(/\r?\n/).length;
      violations.push(
        `${path.relative(process.cwd(), sourceFile)}:${line} imports "${specifier}": ${violation}`,
      );
    }
  }
}

const visited = new Set();
const active = new Set();
const stack = [];
const cycles = [];

function findCycles(file) {
  visited.add(file);
  active.add(file);
  stack.push(file);

  for (const dependency of graph.get(file) ?? []) {
    if (!graph.has(dependency)) {
      continue;
    }

    if (!visited.has(dependency)) {
      findCycles(dependency);
      continue;
    }

    if (active.has(dependency)) {
      const cycleStart = stack.indexOf(dependency);
      const cycle = [...stack.slice(cycleStart), dependency]
        .map((item) => path.relative(appRoot, item))
        .join(' -> ');

      if (!cycles.includes(cycle)) {
        cycles.push(cycle);
      }
    }
  }

  stack.pop();
  active.delete(file);
}

for (const file of files) {
  if (!visited.has(file)) {
    findCycles(file);
  }
}

if (violations.length || cycles.length) {
  for (const violation of violations) {
    console.error(`Architecture violation: ${violation}`);
  }

  for (const cycle of cycles) {
    console.error(`Dependency cycle: ${cycle}`);
  }

  process.exitCode = 1;
} else {
  console.log(`Architecture check passed for ${files.length} source files.`);
}
