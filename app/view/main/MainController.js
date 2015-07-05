Ext.define('PSA.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onShowCardDetail: function (view, record) {
        // Note that the event is fired from the List view but the window is owned by the Main view.
        var me = this,
            mainViewModel = me.getViewModel(),
            cardDetailView = me.getView().down('app-carddetail'),
            data = record.data,
            src = record.get('image') || 'default.jpg',
            formPanel = cardDetailView.down('carddetail-form'),
            formView;

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
    }
});

