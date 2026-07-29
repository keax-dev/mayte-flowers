import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const outputDirectory = path.resolve('dist/mayte-flowres');
const requiredFiles = [
  'index.html',
  'home/index.html',
  'gallery/index.html',
  'prerendered-routes.json',
];
const requiredRoutes = ['/', '/home', '/gallery'];
const errors = [];

for (const relativePath of requiredFiles) {
  if (!existsSync(path.join(outputDirectory, relativePath))) {
    errors.push(`Missing prerender output: ${relativePath}`);
  }
}

const manifestPath = path.join(outputDirectory, 'prerendered-routes.json');

if (existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    const routes = manifest.routes ?? {};

    for (const route of requiredRoutes) {
      if (!(route in routes)) {
        errors.push(`Missing route in prerender manifest: ${route}`);
      }
    }
  } catch (error) {
    errors.push(
      `Invalid prerender manifest: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

if (errors.length) {
  for (const error of errors) {
    console.error(error);
  }

  process.exitCode = 1;
} else {
  console.log('Prerender output check passed.');
}
