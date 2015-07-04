Ext.define('PSA.view.detail.Condition', {
    extend: 'Ext.grid.Panel',
    xtype: 'app-detail-condition',

    bind: '{condition}',

    height: 400,
    width: 650,
    emptyText: 'There is no data to display.',

    columns: [{
        dataIndex: 'condition',
        text: 'Condition',
        flex: 1
    }],

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            itemId: 'add',
            text: 'Add Condition'
        }]
    }]
});

