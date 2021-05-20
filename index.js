const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const fs = require('fs');

let initialVersion = getVersionFromFile('./VERSION');
let incrementedVersion = incrementBasedOnCommitMessage(initialVersion);
setOutputAndChangeFile(incrementedVersion, './VERSION');

function getVersionFromFile(filePath){
    try {
        let version;
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '1.0.0');
        }
        const data = fs.readFileSync(filePath, 'utf8');
        if (semver.valid(data) === null) {
            throw Error('Invalid initial version into VERSION file');
        }
        else { 
            version = data;
        }
        return version;
    } catch (error) {
        core.setFailed(error.message);
    }
}


function incrementBasedOnCommitMessage(currVersion){
    try {
        const event = github.context.payload;
    
        if (!event.commits) {
            throw Error('Couldn\'t find any commits in this event, incrementing patch version...');
        }
        const message = event.commits ? event.commits.map(commit => commit.message) : '';
        console.log('Commit message : ' + message);
    
        let update = updateTypeCheck(message);
        if (update === undefined || update === null) {
            throw Error('Update failed to select specific type');
        }
        else {
            incrementedVersion = semver.inc(currVersion, update);
            console.log('Version after increment : ' + incrementedVersion);
            return incrementedVersion;
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
} 

function setOutputAndChangeFile(incrementedVersion, filePath){
    try {
        if (semver.valid(incrementedVersion) === null) {
            throw Error('Final output version isnt valid');
        }
        else {
            core.setOutput('output-version', incrementedVersion);
            fs.writeFileSync(filePath, incrementedVersion);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

function updateTypeCheck(message) {
    let patchWords = core.getInput('patch-flags-words');
    let patchWordsArray = patchWords.split(',');
    let update;
    patchWordsArray.forEach(word => {
        if (String(message).toUpperCase().includes(word)) {
            update = 'patch';
        }
    })

    let minorWords = core.getInput('minor-flags-words');
    let minorWordsArray = minorWords.split(',');
    minorWordsArray.forEach(word => {
        if (String(message).toUpperCase().includes(word)) {
            update = 'minor';
        }
    })

    let majorWords = core.getInput('major-flags-words');
    let majorWordsArray = majorWords.split(',');
    majorWordsArray.forEach(word => {
        if (String(message).toUpperCase().includes(word)) {
            update = 'major';
        }
    })

    return update;
}