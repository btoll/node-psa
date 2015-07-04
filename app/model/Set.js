Ext.define('PSA.model.Set', {
    extend: 'Ext.data.Model',
    fields: ['id', 'year', 'company'],
    proxy: {
        type: 'ajax',
        url: '/sets',
        reader: 'json'
    }
});

