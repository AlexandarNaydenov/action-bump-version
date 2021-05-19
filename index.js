const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fs = require('fs');

try {
    let version = core.getInput('input-version');
    console.log(version);
    const data = fs.readFileSync('./VERSION', 'utf8');
    version = data;
    core.setOutput('output-version', version);

} catch (error) {
    core.setFailed(error.message);
}
