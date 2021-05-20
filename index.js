const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fs = require('fs');

try {
    //reading version from VERSION file
    const data = fs.readFileSync('./VERSION', 'utf8');
    let version = data;
    //Incremention version
    version = semver.inc(version, 'minor');
    core.setOutput('output-version', version);
    fs.writeFileSync('./VERSION', version);

} catch (error) {
    core.setFailed(error.message);
}

try {
    const event = github.context.payload

    if (!event.commits) {
        console.log('Couldn\'t find any commits in this event, incrementing patch version...')
    }
    const messages = event.commits ? event.commits.map(commit => commit.message) : [];
    console.log(messages);
}
catch (error) {
    core.setFailed(error.message);
}