import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Accounts } from 'meteor/accounts-base';
import './login';
import './cpanel';
import './home';
import './projects';
import './config-project';
import './project-page';
import './new-issue';
import './issue-page';
import './edit-workflow';
import './body.html';

loggedIn = new ReactiveVar(true);
target = new ReactiveVar('home');
activeProject = new ReactiveVar(null);
editIssue = new ReactiveVar(false);
workflow = new ReactiveVar('default');
activeWorkflow = new ReactiveVar(null);
newWorkflow = new ReactiveVar(false);

Template.body.onCreated(function onCreated() {
    this.state = new ReactiveDict();
    if (Meteor.user() == null) {
        loggedIn.set(false);
        this.state.set('showControlPanel', false);
    } else {
        loggedIn.set(true);
        this.state.set('showControlPanel', true);
    }
});

Template.registerHelper("not", function(condition) {
    return !condition;
});

Template.body.helpers({
    showLoginForm() {
        return !loggedIn.get();
    },
    targetTemplate() {
        return target.get();
    }
});

Template.body.events({
    'click [id=btn-cpanel]'(event, template) {
        if (Meteor.user().profile.isRoot) {
            target.set('controlPanel');
        }
    },
    'click [id=btn-logout]'(event, template) {
        Meteor.logout(function (error) {
            loggedIn.set(false);
        });
    },
    'click [id=btn-list-projects]'(event, template) {
        target.set('projects');
    },
    'click [id=btn-usr-page]'(event, template) {
        target.set('home');
    },
});
