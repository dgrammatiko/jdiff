const { access, stat, existsSync, removeSync, writeFileSync } = require('fs-extra');
const {execSync} = require('child_process');
const emptyDir = require('empty-dir');
const { sep, dirname } = require('path');
const recursive = require('recursive-readdir');

const Redundant = [];
const RedundantFolders = [];
let J3FilesN = [];
function checkFile(file) {
  if (J4Files.includes(file)) {
    console.log(file, J4Files.includes(file))
    J3FilesN = J3Files.filter(item => item !== file)
  } else {
    Redundant.push(file);

    if (!existsSync(dirname(`${process.cwd()}/joomla_400/${file}`)) && !RedundantFolders.includes(dirname(file))) {
      RedundantFolders.push(dirname(file))
    } else if (emptyDir.sync(dirname(`${process.cwd()}/joomla_400/${file}`)) && !RedundantFolders.includes(dirname(file))) {
      RedundantFolders.push(dirname(file))
    }

  }
};


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

  'build',
  'composer.json',
  'composer.lock',
  'package-lock.json',
  'package.json',
];


// Clone 3.10
// ensureDirSync('joomla_310');
// execSync(`git clone --depth 1 --branch 3.10-dev https://github.com/joomla/joomla-cms.git joomla_310`);

// Clone J4
// ensureDirSync('joomla_400');
// execSync(`git clone --depth 1 --branch 4.0-dev https://github.com/joomla/joomla-cms.git joomla_400`);

// // Build j4
// execSync(`cd joomla_400 && composer install --ignore-platform-reqs`);
// execSync(`cd joomla_400 && npm ci`);

// Remove some non deliverable files
NonDeliverables.map(file => removeSync(`${process.cwd()}/joomla_310/${file}`));
NonDeliverables.map(file => removeSync(`${process.cwd()}/joomla_400/${file}`));


let J3Files;
let J4Files;

recursive(`joomla_310`, function (err, files) {
//   console.log(files);
  J3Files = files.sort().map(file => file.replace(`joomla_310${sep}`, ''))

  recursive(`joomla_400`, function (err, files) {
    // `files` is an array of file paths
//     console.log(files);
    J4Files = files.sort().map(file => file.replace(`joomla_400${sep}`, ''))
    J3Files.forEach(file => checkFile(file))

    writeFileSync('J3Files.json', JSON.stringify(J3Files, '', 2), ()=> {});
    writeFileSync('J4Files.json', JSON.stringify(J4Files, '', 2), ()=> {});
    writeFileSync('Redundant.json', JSON.stringify(Redundant, '', 2), ()=> {});
    writeFileSync('RedundantFolders.json', JSON.stringify(RedundantFolders, '', 2), ()=> {});
    writeFileSync('jjjjjj.json', JSON.stringify(J3FilesN, '', 2), ()=> {});
  });
});
