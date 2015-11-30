Ext.define('PSA.view.Login', {
    extend: 'Ext.window.Window',

    xtype: 'app-login',

    title: 'Login',
    modal: true,

    // Give Username focus after render.
    defaultFocus: 'username',

    items: [{
        xtype: 'form',
        url: './login',
        standardSubmit: true,
        bodyPadding: 10,

        defaults: {
            xtype: 'textfield',
            width: 250,
            allowBlank: false
        },

        items: [{
            fieldLabel: 'Username',
            name: 'username',
            itemId: 'username',
            emptyText: 'Ty'
        },{
            fieldLabel: 'Password',
            inputType: 'password',
            name: 'password',
            emptyText: 'Cobb'
        }],

        buttons: [{
            text: 'Reset',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }, {
            text: 'Submit',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function () {
                var form = this.up('form').getForm();

                if (form.isValid()) {
                    form.submit();
                }
            }
        }]
    }]
});

