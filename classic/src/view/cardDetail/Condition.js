Ext.define('PSA.view.cardDetail.Condition', {
    extend: 'Ext.grid.Panel',
    xtype: 'carddetail-condition',

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
            text: 'Add Condition',
            handler: 'onAdd'
        }]
    }]
});

