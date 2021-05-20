const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fs = require('fs');
let version;

//reading version from VERSION file
try {
    const data = fs.readFileSync('./VERSION', 'utf8');
    version = data;
} catch (error) {
    core.setFailed(error.message);
}

//Incremention version
try {
    const event = github.context.payload

    if (!event.commits) {
        console.log('Couldn\'t find any commits in this event, incrementing patch version...')
    }
    const message = event.commits ? event.commits.map(commit => commit.message) : [];
    console.log(message);

    let majorWords = core.getInput('major-flags-words');
    let update;
    if(String(message).toUpperCase().includes(majorWords)){
        update = 'major';
    }

    version = semver.inc(version, update);
}
catch (error) {
    core.setFailed(error.message);
}

//Output and change VERSION
try{

    core.setOutput('output-version', version);
    fs.writeFileSync('./VERSION', version);

}catch (error) {
    core.setFailed(error.message);
}