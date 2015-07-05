Ext.define('PSA.view.cardDetail.CardDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carddetail',

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
    }
});

