Ext.define('PSA.view.cards.CardsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cards',

    requires: [
        'PSA.model.Card',
        'PSA.model.Set'
    ],

    stores: {
        cards: {
            model: 'PSA.model.Card',
            sorters: [{
                property: 'number'
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

