Ext.define('PSA.view.cards.Sets', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'app-sets',

    bind: {
        store: '{sets}'
    },

    fieldLabel: 'Choose set',
    queryMode: 'local',
    displayField: 'company',
    valueField: 'id',
    tpl: '<tpl for="."><div class="x-boundlist-item">{year} {company}</div></tpl>',
    displayTpl: '<tpl for=".">{year} {company}</tpl>',
    emptyText: 'Make a selection',
    listeners: {
        select: 'onSelect'
    }
});

