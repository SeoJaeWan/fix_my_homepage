#!/usr/bin/env tsx

/**
 * problems/index.json 자동 생성 스크립트
 *
 * 모든 문제 폴더를 스캔하여 메타데이터를 수집하고
 * problems/index.json 파일을 생성합니다.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

interface ProblemMetadata {
  id: string;
  title: string;
  situation: string;
  goals: string[];
  environment: {
    type: string;
    dependencies?: Record<string, string>;
  };
  author: {
    github: string;
  };
  category?: string; // 자동으로 추출됨
}

interface ProblemIndex {
  version: string;
  lastUpdated: string;
  problems: ProblemMetadata[];
}

function loadProblemMetadata(problemPath: string, category: string): ProblemMetadata | null {
  const jsonPath = join(problemPath, 'problem.json');

  if (!existsSync(jsonPath)) {
    console.warn(`⚠️  Skipping ${problemPath}: no problem.json`);
    return null;
  }

  try {
    const content = readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(content) as ProblemMetadata;
    // 카테고리를 자동으로 추가
    data.category = category;
    return data;
  } catch (err) {
    console.error(`❌ Failed to parse ${jsonPath}:`, err);
    return null;
  }
}

function findAllProblems(baseDir: string): ProblemMetadata[] {
  const problems: ProblemMetadata[] = [];

  const categories = readdirSync(baseDir).filter((name) => {
    const path = join(baseDir, name);
    return statSync(path).isDirectory() && !name.startsWith('_');
  });

  for (const category of categories) {
    const categoryPath = join(baseDir, category);
    const problemDirs = readdirSync(categoryPath).filter((name) => {
      const path = join(categoryPath, name);
      return statSync(path).isDirectory();
    });

    for (const problemDir of problemDirs) {
      const problemPath = join(categoryPath, problemDir);
      const metadata = loadProblemMetadata(problemPath, category);

      if (metadata) {
        problems.push(metadata);
      }
    }
  }

  return problems;
}

function generateIndex(problems: ProblemMetadata[]): ProblemIndex {
  return {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    problems: problems.sort((a, b) => a.id.localeCompare(b.id)),
  };
}

// 메인 실행
function main() {
  const problemsDir = join(process.cwd(), 'problems');

  if (!existsSync(problemsDir)) {
    console.error('❌ problems/ directory not found');
    process.exit(1);
  }

  console.log('🔍 Scanning problem directories...\n');

  const problems = findAllProblems(problemsDir);

  console.log(`\n✅ Found ${problems.length} valid problem(s)`);

  if (problems.length === 0) {
    console.log('⚠️  No problems found, skipping index generation');
    process.exit(0);
  }

  const index = generateIndex(problems);
  const outputPath = join(problemsDir, 'index.json');

  writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf-8');

  console.log(`\n✨ Generated: ${outputPath}`);

  // 요약 출력
  console.log('\n📊 Summary by category:');
  const categoryCounts = problems.reduce((acc, p) => {
    const category = p.category || 'unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`   ${category}: ${count}`);
  });
}

main();
