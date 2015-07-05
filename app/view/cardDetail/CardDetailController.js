Ext.define('PSA.view.cardDetail.CardDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carddetail',

    onAdd: function (button) {
        // This method will show either the PSADetail view or the ConditionDetail view.
        var title = button.up('grid').title,
            detailView = this.getView().down('carddetail-' + title.toLowerCase() + 'detail');

        // Poke on the activeRecordId which is needed when a new PSA Rating or Condition is created.
        detailView.activeRecordId = this.activeRecordId;
        detailView.show();
    },

    onCancel: function (button) {
        var win = button.up('window');

        win.close();

        // Uncheck 'Sync on Update' checkbox.
        // TODO: or set it to the global config value!
        win.down('#syncOnUpdate').setValue(false);
    },

    onChange: function (filefield) {
        // When a file is selected for a file upload we want to Sync on Update to properly POST the form
        // fields. Doing a sync later wouldn't POST the form.
        this.getView().down('#syncOnUpdate').setValue(true);
    },

    onHide: function (win) {
        // Set the Main detail tab as active.
        win.down('tabpanel').setActiveTab(0);

        // When hiding the window, reset the src so as not to see the previous image when loading a new one.
        win.down('carddetail-form').down('#ballplayer').setSrc('');

        // TODO: this is probably not the best way to persist the active record it. Remember, there may not always
        // be conditions for a card, so there must be a way to get the card id if a condition(s) is created.
        this.activeRecordId = null;
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

