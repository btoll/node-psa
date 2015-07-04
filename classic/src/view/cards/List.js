Ext.define('PSA.view.cards.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'app-list',

    controller: 'cards',
    viewModel: 'cards',

    bind: '{cards}',

    title: 'Cards',
    height: 600,
    scrollable: true,
    emptyText: 'There is no data to display.',

    /*
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    */

    columns: [{
        dataIndex: 'number',
        text: 'Number',
        flex: 1
    }, {
        dataIndex: 'name',
        text: 'Name',
        flex: 3
    }, {
        dataIndex: 'items',
        text: 'Items',
        flex: 1
    }, {
        dataIndex: 'psa_rating',
        text: 'PSA Rating',
        flex: 1
    }, {
        dataIndex: 'psa_cert',
        text: 'PSA Cert #',
        flex: 1
    }, {
        dataIndex: 'notes',
        text: 'Notes',
        renderer: function (val) {
            return val ? 'Y' : '';
        },
        width: 50
    }],

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            itemId: 'sets',
            xtype: 'app-sets'
        }, {
            xtype: 'tbfill'
        }, {
            itemId: 'sync',
            text: 'Sync',
            disabled: true
        }]
    }],

    listeners: {
        itemdblclick: 'onItemDblClick'
    }
});

