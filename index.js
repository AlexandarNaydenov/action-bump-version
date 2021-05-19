const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');


try {
    let version = core.getInput('input-version');
    console.log(version);
    version = semver.inc(version, major);
    core.setOutput('output-version', version);

} catch (error) {
    core.setFailed(error.message);
}