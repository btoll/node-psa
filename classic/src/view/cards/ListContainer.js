// Note I created this solely because I needed to add the window as a chiild of a container.
// I initially tried adding it to the gridpanel after render, but the layout was all jacked.
Ext.define('PSA.view.cards.ListContainer', {
    extend: 'Ext.container.Container',
    xtype: 'app-listcontainer',

    controller: 'cards',
    viewModel: 'cards',

    items: [{
        xtype: 'app-list'
    }, {
        xtype: 'app-carddetail'
    }]
});

