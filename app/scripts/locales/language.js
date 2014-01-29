'use strict';

var languageMap = {
    en: {
        common: {
            'landing-page': {
                'caption': 'ivy',
                'create': 'Create New Workspace',
                'load': 'Load Existing Workspace',
                'export': 'Export Workspace',
                'exit': 'Exit Ivy'
            },
            'ivy-page': {
                'name': 'ivy Visualization',
                'probands': 'Probands',
                'statistics': 'Statistics',
                'timeline': 'Timeline',
                'configuration': 'Configuration',
                'exit': 'Exit',
                'save-workspace': 'Save Workspace',
                'workspaces': 'Workspaces',
                'heatmap': 'Interactions',
                'activities': 'Activities'
            },
            'proband': {
                'general': 'General',
                'show-probands': 'Show Probands',
                'add-proband': 'Add Proband',
                'interaction-data': 'Interaction Data',
                'manage-interaction-data': 'Manage Interaction Data',
                'add-interaction-data': 'Add Interaction Data',
                'show-proband-caption': 'Probands',
                'default-proband-caption': 'Proband Area',
                'add-proband-caption': 'Add Proband Data',
                'interaction-caption': 'Interaction Data',
                'view-interaction-data': 'View Interaction Data',
                'overview': 'Overview',
                'button-delete': 'Delete Proband',
                'add-proband-name-label': 'Name of Proband',
                'add-proband-data-label': 'Proband Data',
                'button-show-statistics': 'Show Statistics',
                'proband-name': 'Name of Proband',
                'additional-information': 'Additional Information',
                'actions': 'Actions',
                'caption': 'Probands',
                'button-add-proband': 'Add Proband',
                'label-proband-name': 'Proband Name',
                'label-proband-data': 'Interaction Data of Proband'
            },
            'statistics': {
                'select-label': 'Select Proband',
                'generate-statistics': 'Generate Statistics',
                'error': 'Error while loading proband statistics.',
                'load-proband-information': '<strong>Hint:</strong> Please select probands to show statistics.',
                'go-back': 'Go back.',
                'label-frequency-of-interactions': 'Frequency of Interactions',
                'label-privacy': 'Privacy Settings'
            },
            'workspaces': {
                'caption': 'Workspaces',
                'button-import': 'Import Workspaces',
                'button-export': 'Export All Workspaces',
                'caption-load-workspace': 'Load Workspace',
                'button-create-workspace': 'Create Workspace',
                'select-label': 'Select Workspace',
                'load-button': 'Load Workspace',
                'delete-button': 'Delete Workspace',
                'create-label-name': 'Name of Workspace',
                'create-label-author': 'Author',
                'create-button': 'Create Workspace',
                'no-workspace-loaded': 'No Workspace loaded',
                'loaded-information': 'Current Workspace: ',
                'import-button': 'Import Workspaces from Harddisk',
                'export-button': 'Backup Workspaces to Harddisk',
                'actions': 'Actions',
                'workspace-name': 'Workspace Name',
                'additional-information': 'Additional Information',
                'export-dialog-text': 'Once you choose to export your workspaces, a file will be generated and left for you to save.',
                'single-export-button': 'Export This Workspace'
            },
            'modal': {
                'create-workspace-success-header': 'Workspace successfully created',
                'create-workspace-success-text': 'The workspace has been created.',
                'create-workspace-name-conflict-header': 'Name Conflict',
                'create-workspace-name-conflict-text': 'There is another workspace with the same name. Could not create workspace.',
                'add-proband-success-header': 'Proband successfully added',
                'add-proband-success-text': 'The new proband has been successfully added.'
            },
            'dialogs': {
                'check-delete-workspace': 'Do you really want to delete this workspace?'
            },
            'drop': {
                'information': 'Please drop data file here.',
                'accepted': 'File accepted.'
            },
            'messages': {
                'corrupt-proband-data': 'The proband data seems to be corrupt. Proband not added.',
                'empty-proband-name': 'Name of proband is empty. Proband not added.',
                'corrupt-workspaces-data': 'The workspace import data seems to be corrupt. No workspaces imported.',
                'export-single-failed': 'Could not export workspace.',
                'no-entries-workspace': 'There are currently no workspaces available.',
                'no-entries-probands': 'There are currently no probands available.'
            },
            'buttons': {
                'cancel': 'Cancel'
            },
            'privacy': {
                'post-scope': 'Who can see your future posts?',
                'FindContact': 'Who can look you up using the email address or phone number you provided?',
                'search-engine': 'Do you want other search engines to link to your timeline?',
                'posting': 'Who can post on your timeline?',
                'review': 'Review posts friends tag you in before they appear on your timeline?',
                'tagging': 'Who can see posts you\'ve been tagged in on your timeline?',
                'post-others': 'Who can see what others post on your timeline?',
                'tag-review': 'Review tags people add to your own posts before the tags appear on Facebook?',
                'expansion': 'When you’re tagged in a post, who do you want to add to the audience if they aren’t already in it?',
                'suggestions': 'Who sees tag suggestions when photos that look like you are uploaded?',
                'Unknown': 'Unknown privacy scope',
                'Custom': 'Custom',
                'Public': 'Public',
                'Friends': 'Friends',
                'OnlyMe': 'Only User'
            }
        }
    }
};

define(
    function() {
        function _getLanguageMap() {
            return languageMap;
        }

        return {
            getLanguageMap: _getLanguageMap
        };
    }
);