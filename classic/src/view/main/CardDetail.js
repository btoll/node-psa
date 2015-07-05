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
            xtype: 'carddetail-form'
        }, {
            title: 'PSA',
            xtype: 'carddetail-psa'
        }, {
            title: 'Condition',
            xtype: 'carddetail-condition'
        }]
    }]
});

