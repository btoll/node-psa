/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'PSA',

    extend: 'PSA.Application',

    // TODO: Sort out these requires.
    requires: [
        'PSA.view.main.Main',
        'PSA.view.main.MainController',
        'PSA.view.cards.List',
        'PSA.view.cards.CardsController',
        'PSA.view.Sets',
        'PSA.view.main.CardDetail',
        'PSA.view.detail.Form',
        'PSA.view.detail.PSA',
        'PSA.view.detail.Condition',
        'PSA.view.main.MainModel',
        'PSA.view.cards.CardsModel'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'PSA.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to PSA.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});

