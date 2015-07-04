Ext.define('PSA.view.main.CardDetail', {
    extend: 'Ext.window.Window',
    xtype: 'app-carddetail',

    layout: 'fit',

    //modal: true,
    closable: false,
    closeAction: 'hide',

    items: [{
        xtype: 'tabpanel',
        items: [{
            title: 'Main',
            xtype: 'app-detail-carddetail'
        }, {
            title: 'PSA',
            xtype: 'app-detail-psa'
        }, {
            title: 'Condition',
            xtype: 'app-detail-condition'
        }]
    }]
});

