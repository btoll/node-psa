Ext.define('PSA.view.cards.CardsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cards',

    /*
    init: function() {
        this.control({
            'grid-cards gridview': {
                refresh: this.onRefresh
            },

            'grid-cards #sync': {
                click: this.onSync
            },
            'form-main #cancel': {
                click: this.onCancel
            },
            'form-main #update': {
                click: this.onUpdate
            },
            'form-main #upload': {
                change: this.onChange
            },
            'window-carddetail': {
                hide: this.onHide
            },
            'grid-condition #add': {
                click: this.onAdd
            },
            'grid-psa #add': {
                click: this.onAdd
            }
        });
    },
    */

    onItemClick: function () {
        this.fireViewEvent('blech', {});
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
    },

    onCancel: function (button) {
        var win = button.up('window');

        win.close();
        // Uncheck 'Sync on Update' checkbox.
        // TODO: or set it to the global config value!
        win.down('#syncOnUpdate').setValue(false);
    },

    onUpdate: function (button) {
        var me = this,
            panel = button.up('form'),
            syncCheckbox = panel.down('#syncOnUpdate'),
            form = panel.form;

        // TODO: isDirty() returns `true` even when nothing has been changed!
        if (form.isDirty()) {
            if (!syncCheckbox.getValue()) {
                button.up('form-main').getForm().updateRecord();
            } else {
                // Sync immediately if the checkbox is checked.
                me.showMsgBox();

                form.submit({
                    success: function (form, action) {
                        /*
                        var grid = me.getCards(),
                            oldRecord = form.getRecord();

                        // Here we are mixing our new data into the old record's data object and only refreshing
                        // the view node that we're targeting.
                        Ext.apply(oldRecord.data, action.result.record);
                        grid.view.refreshNode(oldRecord.index);
                        */
                        me.getCards().store.reload();

                        // Show the prompt a bit after the request has returned for a PRO effect.
                        Ext.defer(function () {
                            me.msgBox.close();
                        }, 1500);
                    },
                    failure: function () {
                        me.msgBox.alert('Toll Memorial PSA app', 'There was a problem, your data could not be saved!');
                    }
                });
            }
        }

        // Reset the Sync on Update checkbox.
        syncCheckbox.setValue(false);
        button.up('window-carddetail').close();
    },

    onChange: function (filefield) {
        // When a file is selected for a file upload we want to Sync on Update to properly POST the form
        // fields. Doing a sync later wouldn't POST the form.
        filefield.up('window').down('#syncOnUpdate').setValue(true);
    },

    onHide: function (win) {
        // Set the Main detail tab as active.
        win.down('tabpanel').setActiveTab(0);

        // When hiding the window, reset the src so as not to see the previous image when loading a new one.
        win.down('form-main').down('#ballplayer').setSrc('');

        // TODO: this is probably not the best way to persist the active record it. Remember, there may not always
        // be conditions for a card, so there must be a way to get the card id if a condition(s) is created.
        this.activeRecordId = null;
    },

    onAdd: function (button) {
        // TODO: Reuse views if already created!
        // This method will raise either the PSADetail view or the ConditionDetail view.
        var title = button.up('grid').title,
            ViewCtr = this['getDetail' + title + 'DetailView'](),
            view = new ViewCtr();

        // Poke on the activeRecordId which is needed when a new PSA Rating or Condition is created.
        view.activeRecordId = this.activeRecordId;
        view.show();
    },

    showMsgBox: function () {
        // TODO: could turn this into a generalized method, passing in a config object.
        this.msgBox = Ext.Msg.show({
            title: 'Toll Memorial',
            msg: 'Saving your data, please wait...',
            progressText: 'Saving...',
            wait: true,
            waitConfig: {
                interval: 180
            },
            width: 350
        });
    }
});

