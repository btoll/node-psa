Ext.define('PSA.view.cardDetail.PSA', {
    extend: 'Ext.grid.Panel',
    xtype: 'carddetail-psa',

    bind: '{psa}',

    height: 400,
    width: 650,

    columns: [{
        dataIndex: 'psa_rating',
        text: 'PSA Rating',
        flex: 1
    }, {
        dataIndex: 'psa_cert',
        text: 'PSA Cert',
        flex: 1
    }],

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            itemId: 'add',
            text: 'Add PSA Rating',
            handler: 'onAdd'
        }]
    }]
});

