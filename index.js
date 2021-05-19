const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fs = require('fs');

try {
    //reading version from VERSION file
    const data = fs.readFileSync('./VERSION', 'utf8');
    let version = data;
    //Incremention version
    version = semver.inc(version, 'major');
    core.setOutput('output-version', version);

} catch (error) {
    core.setFailed(error.message);
}
