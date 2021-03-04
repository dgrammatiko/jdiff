const { stat, ensureDir, ensureDirSync, removeSync } = require('fs-extra');
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
  // 'build',
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
  // 'composer.json',
  // 'composer.lock',
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
  // 'package-lock.json',
  // 'package.json',
  'phpunit-pgsql.xml.dist',

];

NonDeliverables.map(file => removeSync(`${process.cwd()}/joomla_310/${file}`));

// Clone J4
ensureDirSync('joomla_400');
execSync(`git clone --depth 1 --branch 4.0-dev https://github.com/joomla/joomla-cms.git joomla_400`);

NonDeliverables.map(file => removeSync(`${process.cwd()}/joomla_400/${file}`));

execSync(`cd joomla_400 && composer install --ignore-platform-reqs`);
execSync(`cd joomla_400 && npm ci`);

