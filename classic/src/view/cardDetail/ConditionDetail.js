var conditionItem = {
    xtype: 'textfield',
    itemId: 'condition',
    fieldLabel: 'Condition',
    labelSeparator: '',
    labelAlign: 'right',
    labelWidth: 75,
    name: 'condition',
    width: 200,
    margin: '0 10 0 0',
    allowBlank: false
};

Ext.define('PSA.view.cardDetail.ConditionDetail', {
    extend: 'Ext.window.Window',

    xtype: 'carddetail-conditiondetail',
    closeAction: 'hide',
    title: 'Add Condition',
    defaultFocus: 'condition',
    modal: true,

    items: [{
        xtype: 'form',
        autoScroll: true,
        url: '/conditions',
        height: 300,
        width: 330,
        bodyPadding: 20,
        defaults: {
        },
        items: [{
            xtype: 'container',
            // Note don't add the hidden `id` field here because not all cards have conditions. Because of this,
            // we cannot get the card id from the condition model and so we must poke it onto the controller obj
            // when the cards model is retrieved.
            //
            // Note that setting a hidden field means that we can't call load with id in the params because it
            // will get overwritten by the empty id in the condition model!
            items: conditionItem
        }],
        bbar: [{
            text: 'New Condition',
            handler: function () {
                this.up('form').add({
                    xtype: 'container',
                    layout: 'hbox',
                    padding: '5 5 5 0',
                    items: [conditionItem, {
                        xtype: 'button',
                        text: 'Remove',
                        handler: function () {
                            this.up('container').destroy();
                        }
                    }]
                });
            }
        }, {
            xtype: 'tbfill'
        }, {
            text: 'Cancel',
            handler: function () {
                this.up('window').close();
            }
        }, {
            text: 'Add',
            formBind: true,
            disabled: true,
            handler: function () {
                var me = this,
                    panel = me.up('form'),
                    win = me.up('window'),
                    form = panel.getForm(),
                    msgBox;

                if (form.isValid()) {
                    msgBox = Ext.Msg.show({
                        title: 'Toll Memorial',
                        msg: 'Saving your data, please wait...',
                        progressText: 'Saving...',
                        wait: true,
                        waitConfig: {
                            interval: 180
                        },
                        width: 350
                    });

                    form.submit({
                        params: {
                            id: win.activeRecordId
                        },
                        success: function () {
                            win.close();
                            Ext.defer(function () {
                                Ext.StoreManager.get('Conditions').reload();
                                msgBox.close();
                            }, 1500);
                        },
                        failure: function () {
                            win.close();
                            msgBox.alert('Toll Memorial PSA app', 'There was a problem, your data could not be saved!');
                        }
                    });
                }
            }
        }]
    }]
});

