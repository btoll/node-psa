Ext.define('PSA.model.PSA', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'card',
            type: 'int'
        },
        {
            name: 'psa_rating',
            type: 'float',
            convert: function (val) {
                return !val ? null : val;
            }
        },
        {
            name: 'psa_cert',
            type: 'string'
        }
    ],
    proxy: {
        type: 'rest',
        url: '/psa',
        reader: 'json'
    }
});

