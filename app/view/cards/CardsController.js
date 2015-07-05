Ext.define('PSA.view.cards.CardsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cards',

    onItemDblClick: function (view, record, item, index) {
        // Note that if the view isn't the first element passed in the args array that the framework
        // will prepend it before passing it to its destination.
        // So, to avoid confusion, let's just pass it explicitly here.
        this.fireViewEvent('showcarddetail', record);
    },

    onSelect: function (combo, record) {
        var me = this,
            cardDetailView = this.cardDetailView;

        // TODO
        // Close the form when selecting another set.
        if (cardDetailView && !cardDetailView.hidden) {
            cardDetailView.close();
        }

        me.getViewModel().data.cards.load({
            params: {
                set: record.data.id
            },
            callback: function (records, operation, success) {
                this.loadRawData(Ext.JSON.decode(operation.getResponse().responseText));
            }
        });
    },

    onRefresh: function (view) {
        if (view.store.getCount()) {
            view.ownerCt.down('button[text="Sync"]').enable();
        } else {
            view.ownerCt.down('button[text="Sync"]').disable();
        }
    },

    onSync: function (button) {
        var me = this,
            store = button.up('grid').store,
            records = store.getModifiedRecords(),
            cardDetailView = this.cardDetailView,
            msg = false;

        if (cardDetailView && !cardDetailView.hidden) {
            msg = 'Cannot perform sync operation when Card Details window is open!';
        } else if (!records.length) {
            msg = 'No records have been modified.';
        } else {
            this.showMsgBox();
            store.sync({
                success: function (form, action) {
                    // Show the prompt a bit after the request has returned for a PRO effect. (\s)
                    Ext.defer(function () {
                        me.msgBox.close();
                    }, 1500);
                },
                failure: function () {
                    me.msgBox.alert('Toll Memorial PSA app', 'There was a problem, your data could not be saved!');
                }
            });
        }

        if (msg) {
            Ext.Msg.alert('Welcome to Toll Memorial!', msg);
        }
    }
});

