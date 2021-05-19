const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fetch = require("node-fetch");

try {
    let version = core.getInput('input-version');
    console.log(version);
    fetch('./VERSION')
        .then(response => response.text())
        .then(text => {
            version = text;
        })
    core.setOutput('output-version', version);

} catch (error) {
    core.setFailed(error.message);
}
