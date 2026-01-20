#!/usr/bin/env tsx

/**
 * Interactive CLI for creating new problems
 *
 * Usage:
 *   pnpm create-problem
 *
 * Generates:
 * - problem.json with metadata
 * - src/ folder with buggy template code
 * - solution/ folder with correct template code
 * - test.ts with test template
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as readline from 'readline';

interface ProblemConfig {
  id: string;
  category: 'css' | 'javascript' | 'react';
  title: string;
  situation: string;
  goals: string[];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function promptConfig(): Promise<ProblemConfig> {
  console.log('\n📝 Create New Problem\n');

  // Problem ID
  const id = await question('Problem ID (kebab-case): ');
  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    throw new Error('Invalid problem ID. Use kebab-case (e.g., counter-bug)');
  }

  // Category
  const category = await question('Category (css/javascript/react): ');
  if (!['css', 'javascript', 'react'].includes(category)) {
    throw new Error('Invalid category. Must be css, javascript, or react');
  }

  // Title
  const title = await question('Title (Korean): ');
  if (!title) {
    throw new Error('Title is required');
  }

  // Situation
  console.log('\nSituation (Korean, press Enter twice when done):');
  const situationLines: string[] = [];
  while (true) {
    const line = await question('');
    if (line === '' && situationLines.length > 0) break;
    if (line !== '') situationLines.push(line);
  }
  const situation = situationLines.join(' ');

  // Goals
  console.log('\nGoals (Korean, comma-separated):');
  const goalsInput = await question('');
  const goals = goalsInput.split(',').map((g) => g.trim()).filter(Boolean);
  if (goals.length === 0) {
    throw new Error('At least one goal is required');
  }

  return {
    id,
    category: category as 'css' | 'javascript' | 'react',
    title,
    situation,
    goals,
  };
}

function generateProblemJson(config: ProblemConfig): string {
  return JSON.stringify(
    {
      id: config.id,
      title: config.title,
      situation: config.situation,
      goals: config.goals,
      environment: {
        type: 'react',
        dependencies: {
          react: '^18.0.0',
          'react-dom': '^18.0.0',
        },
      },
      author: {
        github: 'fix-my-homepage',
      },
    },
    null,
    2
  );
}

function generateReactTemplate(isSolution: boolean): {
  'App.jsx': string;
  'styles.css': string;
} {
  const appJsx = `import { useState } from "react";
import "./styles.css";

const App = ({ onSolve }) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    ${isSolution ? '// TODO: Add your solution logic here' : '// BUG: Add a bug here'}

    // Call onSolve when goal is reached
    if (count >= 4) {
      onSolve();
    }
  };

  return (
    <div className="container">
      <h1>Problem Template</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default App;
`;

  const stylesCss = `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: sans-serif;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid #333;
  background: white;
  border-radius: 4px;
}

button:hover {
  background: #f0f0f0;
}
`;

  return {
    'App.jsx': appJsx,
    'styles.css': stylesCss,
  };
}

function generateTestTemplate(): string {
  return `import { describe, it, expect, act, waitFor } from "@fixmyhome/test-runner";

describe("Problem Tests", () => {
  it("should solve the problem", async () => {
    // Wait for component to mount
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    // TODO: Write your test logic here
    const button = document.querySelector("button");
    expect(button).toBeTruthy();

    // Example: Click button and check result
    await act(async () => {
      button.click();
    });

    await waitFor(() => {
      const count = document.querySelector("p").textContent;
      expect(count).toContain("1");
    });
  });
});
`;
}

function createProblemFiles(config: ProblemConfig, basePath: string): void {
  const problemPath = join(basePath, config.category, config.id);

  // Check if problem already exists
  if (existsSync(problemPath)) {
    throw new Error(`Problem already exists: ${problemPath}`);
  }

  console.log(`\n📁 Creating problem at: ${problemPath}\n`);

  // Create directories
  mkdirSync(problemPath, { recursive: true });
  mkdirSync(join(problemPath, 'src'), { recursive: true });
  mkdirSync(join(problemPath, 'solution'), { recursive: true });

  // Generate problem.json
  const problemJson = generateProblemJson(config);
  writeFileSync(join(problemPath, 'problem.json'), problemJson);
  console.log('✅ Created problem.json');

  // Generate src/ files (with bugs)
  const srcFiles = generateReactTemplate(false);
  for (const [filename, content] of Object.entries(srcFiles)) {
    writeFileSync(join(problemPath, 'src', filename), content);
  }
  console.log('✅ Created src/ folder with template files');

  // Generate solution/ files (without bugs)
  const solutionFiles = generateReactTemplate(true);
  for (const [filename, content] of Object.entries(solutionFiles)) {
    writeFileSync(join(problemPath, 'solution', filename), content);
  }
  console.log('✅ Created solution/ folder with template files');

  // Generate test.ts
  const testContent = generateTestTemplate();
  writeFileSync(join(problemPath, 'test.ts'), testContent);
  console.log('✅ Created test.ts');

  console.log(`\n✨ Problem created successfully!\n`);
  console.log(`Next steps:`);
  console.log(`1. Edit src/ files to add bugs`);
  console.log(`2. Edit solution/ files with correct implementation`);
  console.log(`3. Write tests in test.ts`);
  console.log(`4. Run: pnpm validate-problem\n`);
}

async function main() {
  try {
    const config = await promptConfig();

    const problemsDir = join(process.cwd(), 'problems');
    if (!existsSync(problemsDir)) {
      throw new Error('problems/ directory not found. Run this script from project root.');
    }

    createProblemFiles(config, problemsDir);
  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
