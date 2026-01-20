import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface Problem {
  id: string;
  title: string;
  situation: string;
  goals: string[];
  environment: {
    type: string;
    dependencies: Record<string, string>;
  };
  author: {
    github: string;
  };
}

interface Index {
  problems: Problem[];
  lastUpdated: string;
}

async function generateIndex() {
  const problemsDir = join(process.cwd(), 'problems');
  const entries = await readdir(problemsDir, { withFileTypes: true });

  const problems: Problem[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) {
      continue;
    }

    const problemJsonPath = join(problemsDir, entry.name, 'problem.json');

    try {
      const content = await readFile(problemJsonPath, 'utf-8');
      const problem: Problem = JSON.parse(content);
      problems.push(problem);
    } catch (error) {
      console.warn(`Warning: Could not read ${entry.name}/problem.json`);
    }
  }

  const index: Index = {
    problems,
    lastUpdated: new Date().toISOString(),
  };

  const indexPath = join(problemsDir, 'index.json');
  await writeFile(indexPath, JSON.stringify(index, null, 2));

  console.log(`✅ Generated index.json with ${problems.length} problems`);
}

generateIndex().catch(console.error);
