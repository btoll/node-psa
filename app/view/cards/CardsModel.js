Ext.define('PSA.view.cards.CardsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cards',

    requires: [
        'PSA.model.Card',
        'PSA.model.Condition',
        'PSA.model.PSA',
        'PSA.model.Set'
    ],

    stores: {
        cards: {
            model: 'PSA.model.Card',
            sorters: [{
                property: 'number'
            }]
        },

        conditions: {
            model: 'PSA.model.Condition',
            sorters: [{
                property: 'condition'
            }]
        },

        psa: {
            model: 'PSA.model.PSA',
            sorters: [{
                property: 'psa_rating'
            }]
        },

        sets: {
            model: 'PSA.model.Set',
            sorters: [{
                property: 'year'
            }, {
                property: 'company'
            }],
            autoLoad: true
        }
    }

    //TODO - add data, formulas and/or methods to support your view
});

