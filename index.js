const { stat, ensureDir, ensureDirSync, removeSync, writeFileSync } = require('fs-extra');
const {execSync} = require('child_process')
const { sep } = require('path');
const recursive = require('recursive-readdir');
const degit = require('tiged');

// Clone 3.10
ensureDirSync('joomla_310');
execSync(`git clone --depth 1 --branch 3.10-dev https://github.com/joomla/joomla-cms.git joomla_310`);

const NonDeliverables = [
  '.git',
  '.github',
  'tests',
  '.appveyor.yml',
  '.drone.jsonnet',
  '.drone.yml',
  '.editorconfig',
  '.gitignore',
  '.php_cs',
  'appveyor-phpunit.xml',
  'CODE_OF_CONDUCT.md',
  'codeception.yml',

  'crowdin.yml',
  'jenkins-phpunit.xml',
  'Jenkinsfile',
  'karma.conf.js',
  'phpunit.xml.dist',
  'README.md',
  'RoboFile.dist.ini',
  'RoboFile.php',
  '.php_cs.dist',
  'build.xml',

  'phpunit-pgsql.xml.dist',
];
const NonDeliverables2 = [
  'build',
  'composer.json',
  'composer.lock',
  'package-lock.json',
  'package.json',
];


NonDeliverables.map(file => removeSync(`${process.cwd()}/joomla_310/${file}`));

// Clone J4
ensureDirSync('joomla_400');
execSync(`git clone --depth 1 --branch 4.0-dev https://github.com/joomla/joomla-cms.git joomla_400`);

NonDeliverables.map(file => removeSync(`${process.cwd()}/joomla_400/${file}`));

execSync(`cd joomla_400 && composer install --ignore-platform-reqs`);
execSync(`cd joomla_400 && npm ci`);

// Remove more files
// NonDeliverables2.map(file => removeSync(`${process.cwd()}/joomla_310/${file}`));
// NonDeliverables2.map(file => removeSync(`${process.cwd()}/joomla_400/${file}`));

J3Files = [];
J4Files = [];

recursive(`${process.cwd()}/joomla_310`).then(files => J3Files.push(files));
recursive(`${process.cwd()}/joomla_400`).then(files => J4Files.push(files));

writeFileSync('allFiles.json', JSON.stringify({ '310': J3Files, '40': J4Files}), ()=> {});
