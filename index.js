const core = require('@actions/core');
const github = require('@actions/github');

try {
    let version = core.getInput('input-version');
    console.log('${version}');
    version = '1.0.1';
    core.setOutput('output-version', version);
} catch (error) {
    core.setFailed(error.message);
}