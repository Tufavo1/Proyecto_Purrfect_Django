from django import forms

class FiltroForm(forms.Form):
    CATEGORIAS = [
        ('Alimentos', 'Alimentos'),
        ('Accesorios', 'Accesorios'),
        ('Farmacia', 'Farmacia'),
        ('Juguetes', 'Juguetes'),
    ]

    MARCAS = [
    ('Royal Canin',),
    ('Proplan',),
    ('Zeedog',),
    ('Mpets',),
    ('Zoetis',),
    ('Kong',),
    ('Fit Formula',),
    ('Inaba',),
    ('Catit',),
    ('Tk Pet',),
    ('Traper',),
    ('The Cat Band',),
    ('Mazuri',),
    ('Tropican',),
    ('Versele Laga',),
    ('Nutrafin',),
    ('Fluval',),
    ]

    categoria = forms.ChoiceField(choices=CATEGORIAS, required=False)
    marca = forms.ChoiceField(choices=MARCAS, required=False)