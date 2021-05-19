const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fs = require('fs');

try {
    //reading version from VERSION file
    const data = fs.readFileSync('./VERSION', 'utf8');
    let version = data;
    //Incremention version
    console.log('Commit message' + core.getInput('commit-message'));
    version = semver.inc(version, 'minor');
    core.setOutput('output-version', version);

    fs.writeFileSync('./VERSION', version);

} catch (error) {
    core.setFailed(error.message);
}
