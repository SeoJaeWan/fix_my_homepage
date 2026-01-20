#!/usr/bin/env tsx

/**
 * 문제 폴더 유효성 검증 스크립트
 *
 * 검증 항목:
 * 1. problem.json 스키마 유효성
 * 2. 필수 파일 존재 확인 (src/index.html, test.ts)
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface ProblemMetadata {
  id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  description: string;
  tags: string[];
}

function validateProblemJson(problemPath: string): ProblemMetadata | null {
  const jsonPath = join(problemPath, 'problem.json');

  if (!existsSync(jsonPath)) {
    console.error(`❌ Missing problem.json in ${problemPath}`);
    return null;
  }

  try {
    const content = readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(content) as ProblemMetadata;

    // 필수 필드 검증
    const requiredFields: (keyof ProblemMetadata)[] = [
      'id',
      'category',
      'difficulty',
      'title',
      'description',
      'tags',
    ];

    for (const field of requiredFields) {
      if (!(field in data)) {
        console.error(`❌ Missing field '${field}' in ${jsonPath}`);
        return null;
      }
    }

    // difficulty 값 검증
    if (!['easy', 'medium', 'hard'].includes(data.difficulty)) {
      console.error(`❌ Invalid difficulty '${data.difficulty}' in ${jsonPath}`);
      return null;
    }

    // tags 배열 검증
    if (!Array.isArray(data.tags)) {
      console.error(`❌ Field 'tags' must be an array in ${jsonPath}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`❌ Invalid JSON in ${jsonPath}:`, err);
    return null;
  }
}

function validateRequiredFiles(problemPath: string): boolean {
  const requiredFiles = ['src/index.html', 'test.ts'];
  let isValid = true;

  for (const file of requiredFiles) {
    const filePath = join(problemPath, file);
    if (!existsSync(filePath)) {
      console.error(`❌ Missing required file: ${filePath}`);
      isValid = false;
    }
  }

  return isValid;
}

function validateProblem(problemPath: string): boolean {
  console.log(`\n🔍 Validating: ${problemPath}`);

  const metadata = validateProblemJson(problemPath);
  if (!metadata) return false;

  const filesValid = validateRequiredFiles(problemPath);
  if (!filesValid) return false;

  console.log(`✅ Valid: ${metadata.title} (${metadata.id})`);
  return true;
}

function findProblemDirs(baseDir: string): string[] {
  const problemDirs: string[] = [];
  const categories = readdirSync(baseDir).filter((name) => {
    const path = join(baseDir, name);
    return statSync(path).isDirectory() && !name.startsWith('_');
  });

  for (const category of categories) {
    const categoryPath = join(baseDir, category);
    const problems = readdirSync(categoryPath).filter((name) => {
      const path = join(categoryPath, name);
      return statSync(path).isDirectory();
    });

    for (const problem of problems) {
      problemDirs.push(join(categoryPath, problem));
    }
  }

  return problemDirs;
}

// 메인 실행
function main() {
  const problemsDir = join(process.cwd(), 'problems');

  if (!existsSync(problemsDir)) {
    console.error('❌ problems/ directory not found');
    process.exit(1);
  }

  const problemDirs = findProblemDirs(problemsDir);

  if (problemDirs.length === 0) {
    console.log('⚠️  No problem directories found');
    process.exit(0);
  }

  console.log(`Found ${problemDirs.length} problem(s) to validate\n`);

  let validCount = 0;
  let invalidCount = 0;

  for (const dir of problemDirs) {
    if (validateProblem(dir)) {
      validCount++;
    } else {
      invalidCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Valid: ${validCount}`);
  console.log(`   ❌ Invalid: ${invalidCount}`);

  if (invalidCount > 0) {
    process.exit(1);
  }

  console.log('\n✨ All problems are valid!');
}

main();
