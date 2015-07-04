Ext.define('PSA.model.Card', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'card_set',
            type: 'int'
        },
        {
            name: 'number',
            type: 'int',
            convert: function (val) {
                // Some cards don't have a number!
                return !val ? null : val;
            }
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'items',
            type: 'int',
            convert: function (val) {
                return !val ? null : val;
            }
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
        },
        {
            name: 'notes',
            type: 'string'
        },
        {
            name: 'image',
            type: 'string'
        }
    ],
    proxy: {
        type: 'rest',
        url: '/cards',
        reader: 'json'
    }
});

