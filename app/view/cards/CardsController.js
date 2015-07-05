Ext.define('PSA.view.cards.CardsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cards',

    onRefresh: function (view) {
        if (view.store.getCount()) {
            view.ownerCt.down('button[text="Sync"]').enable();
        } else {
            view.ownerCt.down('button[text="Sync"]').disable();
        }
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

    onShowCardDetail: function (view, record) {
        // Note that the event is fired from the List view but the window is owned by the Main view.
        var me = this,
            mainViewModel = me.getViewModel(),
            cardDetailView = me.getView().down('app-carddetail'),
            data = record.data,
            src = record.get('image') || 'default.jpg',
            //formPanel = cardDetailView.down('carddetail-form'),
            formPanel,
            formView;

        formPanel = cardDetailView.down('carddetail-form');
        formPanel.getForm().loadRecord(record);

        // Set the card_id so it can be retrieved when Conditions are created.
        me.activeRecordId = data.id;

        // Set the card name as the window's title.
        cardDetailView.setTitle(data.name);

        // Load the conditions store.
        mainViewModel.data.conditions.load({
            records: [record],
            callback: function (records, operation, success) {
                var resultSet = operation.getResultSet();

                if (resultSet.count) {
                    // `this`, not `me`!
                    this.loadRecords(resultSet.records);
                }
            }
        });

        // Load the psa store.
        mainViewModel.data.psa.load({
            records: [record],
            callback: function (records, operation, success) {
                var resultSet = operation.getResultSet();

                if (resultSet.count) {
                    // `this`, not `me`!
                    this.loadRecords(resultSet.records);
                }
            }
        });

        // Set the image src. Note this must happen after the call to show in case the image cmp
        // hasn't been lazy-loaded yet!
        if (src) {
            formPanel.down('#ballplayer').setSrc('/upload/' + src);
        }

        cardDetailView.show();
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

