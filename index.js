const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fs = require('fs');
let version;
let update;

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
    console.log('Message : ' + message);

    update = updateTypeCheck(message);
    version = semver.inc(version, update);
    console.log('Version after increment : ' + version);
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

function updateTypeCheck(message){
    let patchWords = core.getInput('patch-flags-words');
    let patchWordsArray = patchWords.split(',');
    patchWordsArray.forEach(word => {
        if(String(message).toUpperCase().includes(word)){
            update = 'patch';
        }     
    })

    let minorWords = core.getInput('minor-flags-words');
    let minorWordsArray = minorWords.split(',');
    minorWordsArray.forEach(word => {
        if(String(message).toUpperCase().includes(word)){
            update = 'minor';
        }     
    })

    let majorWords = core.getInput('major-flags-words');
    let majorWordsArray = majorWords.split(',');
    majorWordsArray.forEach(word => {
        if(String(message).toUpperCase().includes(word)){
            update = 'major';
        }     
    })
   
    return update;
    console.log('String to up : '+String(message).toUpperCase());
    console.log('Update : ' + update);
}