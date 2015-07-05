Ext.define('PSA.view.cardDetail.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'carddetail-form',

    url: '/cards',

    bodyPadding: 10,
    bodyCls: 'form-main',
    jsonSubmit: true,
    width: 670,

    items: [{
        xtype: 'container',
        layout: 'hbox',
        margin: 10,
        items: [{
            xtype: 'container',
            flex: 1,
            margin: '0 0 0 20',
            defaults: {
                xtype: 'textfield',
                labelSeparator: '',
                labelAlign: 'right',
                labelWidth: 75
            },
            items: [{
                // Store the card id for submission to the server.
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                // Store the image name for submission to the server.
                xtype: 'hiddenfield',
                name: 'image'
            }, {
                fieldLabel: 'Card Number',
                name: 'number'
            }, {
                fieldLabel: 'Card Name',
                name: 'name',
                grow: true,
                growMin: 130,
                growMax: 280
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Items',
                name: 'items',
                minValue: 0
            /*
            // Temporarily disable this so POSTs aren't multipart.
            }, {
                xtype: 'fileuploadfield',
                itemId: 'upload',
                fieldLabel: '&nbsp;',
                buttonText: 'Upload',
                name: 'upload',
                listeners: {
                    change: 'onChange'
                }
            */
            }]
        }, {
            xtype: 'container',
            flex: 1,
            margin: '0 0 0 150',
            items: [{
                xtype: 'image',
                itemId: 'ballplayer',
                border: 1,
                style: {
                    borderColor: 'black',
                    borderStyle: 'solid'
                },
                height: 200,
                width: 200
            }]
        }]
    }, {
        xtype: 'htmleditor',
        name: 'notes'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        padding: '5 10',
        items: [{
            xtype: 'checkboxfield',
            itemId: 'syncOnUpdate',
            boxLabel: 'Sync on Update',
            submitValue: false
        }, {
            xtype: 'tbfill'
        }, {
            itemId: 'cancel',
            text: 'Cancel',
            scale: 'medium',
            handler: 'onCancel'
        }, {
            itemId: 'update',
            text: '<b>Update</b>',
            scale: 'medium',
            handler: 'onUpdate'
        }]
    }]
});

