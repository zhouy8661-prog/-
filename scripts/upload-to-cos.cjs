/**
 * 腾讯云 COS 视频上传脚本
 *
 * 用法：
 *   node scripts/upload-to-cos.cjs
 *
 * 前置条件（在腾讯云控制台操作）：
 *   1. 创建 COS 存储桶（如 portfolio-videos-1250000000）
 *   2. 获取 SecretId / SecretKey（https://console.cloud.tencent.com/cam/capi）
 *   3. 存储桶设置为"公有读"或开启 CDN 加速
 *
 * 环境变量（三选一配置方式）：
 *   方式 A - 直接设置环境变量：
 *     $env:COS_SECRET_ID="AKIDxxx"
 *     $env:COS_SECRET_KEY="xxx"
 *     $env:COS_BUCKET="portfolio-videos-1250000000"
 *     $env:COS_REGION="ap-guangzhou"
 *
 *   方式 B - 创建 .env.cos 文件（会被 .gitignore 忽略）：
 *     COS_SECRET_ID=AKIDxxx
 *     COS_SECRET_KEY=xxx
 *     COS_BUCKET=portfolio-videos-1250000000
 *     COS_REGION=ap-guangzhou
 */

const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const path = require('path');

// ─── 读取配置 ────────────────────────────────────────────
const envFile = path.join(__dirname, '..', '.env.cos');
if (fs.existsSync(envFile)) {
  const content = fs.readFileSync(envFile, 'utf-8');
  content.split('\n').forEach(line => {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) process.env[m[1]] = m[2].trim();
  });
}

const SECRET_ID = process.env.COS_SECRET_ID;
const SECRET_KEY = process.env.COS_SECRET_KEY;
const BUCKET = process.env.COS_BUCKET;
const REGION = process.env.COS_REGION || 'ap-guangzhou';

if (!SECRET_ID || !SECRET_KEY || !BUCKET) {
  console.error('❌ 缺少配置！请设置 COS_SECRET_ID / COS_SECRET_KEY / COS_BUCKET');
  process.exit(1);
}

const CDN_URL = process.env.COS_CDN_URL || `https://${BUCKET}.cos.${REGION}.myqcloud.com`;

// ─── 初始化 COS ──────────────────────────────────────────
const cos = new COS({ SecretId: SECRET_ID, SecretKey: SECRET_KEY });

// ─── 视频文件来源 ──────────────────────────────────────────
const VIDEO_DIR = path.join(__dirname, '..', 'public', 'projects');
const PROJECTS = ['guiyuan', 'guiyuan-minnan'];

// ─── 收集文件 ────────────────────────────────────────────
const files = [];
for (const project of PROJECTS) {
  const projectDir = path.join(VIDEO_DIR, project);
  if (!fs.existsSync(projectDir)) continue;
  walkDir(projectDir, filePath => {
    files.push(filePath);
  });
}

console.log(`📦 共 ${files.length} 个视频文件待上传\n`);

// ─── 串行上传（避免并发限流） ──────────────────────────────
let uploaded = 0;
let failed = 0;
const startTime = Date.now();

async function uploadAll() {
  for (const localPath of files) {
    const relPath = path.relative(VIDEO_DIR, localPath).replace(/\\/g, '/');
    const key = `projects/${relPath}`;
    const sizeMB = (fs.statSync(localPath).size / 1024 / 1024).toFixed(1);

    try {
      await uploadFile(localPath, key);
      uploaded++;
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      console.log(`  ✅ [${uploaded}/${files.length}] ${key}  (${sizeMB} MB)  ⏱ ${elapsed}s`);
    } catch (err) {
      failed++;
      console.error(`  ❌ ${key}: ${err.message}`);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(0);
  console.log(`\n──────────────────────────────`);
  console.log(`✅ 成功: ${uploaded}   ❌ 失败: ${failed}   总耗时: ${totalTime}s`);
  console.log(`\n📌 CDN URL: ${CDN_URL}`);
  console.log(`📌 请在 GitHub 仓库 Settings > Secrets and variables > Actions > Variables`);
  console.log(`   添加变量 VIDEO_CDN_URL = ${CDN_URL}`);
}

function uploadFile(localPath, key) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: BUCKET,
        Region: REGION,
        Key: key,
        Body: fs.createReadStream(localPath),
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
}

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (entry.isFile() && /\.(mp4|mov|webm|avi)$/i.test(entry.name)) {
      callback(fullPath);
    }
  }
}

uploadAll().catch(err => {
  console.error('上传异常:', err);
  process.exit(1);
});
