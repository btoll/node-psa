Ext.define('PSA.model.Condition', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'card',
            type: 'int'
        },
        {
            name: 'condition',
            type: 'float',
            convert: function (val) {
                return !val ? null : val;
            }
        }
    ],
    proxy: {
        type: 'rest',
        url: '/conditions',
        reader: 'json'
    }
});

