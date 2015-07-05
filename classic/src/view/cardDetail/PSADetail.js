var defaults = {
        labelSeparator: '',
        labelAlign: 'right',
        labelWidth: 75
    },
    psaItems = [Ext.apply({
        xtype: 'numberfield',
        itemId: 'psa_rating',
        fieldLabel: 'PSA Rating',
        name: 'psa_rating',
        minValue: 0,
        maxValue: 10,
        step: 0.5,
        width: 200,
        allowBlank: false
    }, defaults), Ext.apply({
        xtype: 'textfield',
        fieldLabel: 'PSA Cert',
        name: 'psa_cert',
        margin: '0 10 0 0',
        allowBlank: false
    }, defaults)];

Ext.define('PSA.view.cardDetail.PSADetail', {
    extend: 'Ext.window.Window',

    xtype: 'carddetail-psadetail',
    title: 'Add PSA Rating',
    defaultFocus: 'psa_rating',
    modal: true,

    items: [{
        xtype: 'form',
        autoScroll: true,
        url: '/psa',
        height: 300,
        width: 550,
        bodyPadding: 20,
        items: [{
            xtype: 'container',
            layout: 'hbox',
            // Note don't add the hidden `id` field here because not all cards have conditions. Because of this,
            // we cannot get the card id from the condition model and so we must poke it onto the controller obj
            // when the cards model is retrieved.
            //
            // Note that setting a hidden field means that we can't call load with id in the params because it
            // will get overwritten by the empty id in the condition model!
            items: psaItems
        }],
        bbar: [{
            text: 'New PSA Rating',
            handler: function () {
                this.up('form').add({
                    xtype: 'container',
                    layout: 'hbox',
                    padding: '5 5 5 0',
                    items: psaItems.concat({
                        xtype: 'button',
                        text: 'Remove',
                        handler: function () {
                            this.up('container').destroy();
                        }
                    })
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
                                Ext.StoreManager.get('PSA').reload();
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

