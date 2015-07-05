Ext.define('PSA.view.main.CardDetail', {
    extend: 'Ext.window.Window',
    xtype: 'app-carddetail',

    controller: 'carddetail',

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
    // The following items are window views that are "owned" by this window view but are
    // accessed via the PSA and Condition views in cardDetail/.
    }, {
        xtype: 'carddetail-psadetail'
    }, {
        xtype: 'carddetail-conditiondetail'
    }],

    listeners: {
        hide: 'onHide'
    }
});

