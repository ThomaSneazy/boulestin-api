import './styles/style.css'

// Configuration commune
const API_URL = 'https://www.beenbiz.com/o-chateau/webservice-internet/ws.php';
const FORMS_CONFIG = {
    contact: {
        formId: 'contactForm',
        submitId: 'contactSubmit',
        prefix: 'contact_',
        objectCommande: 'Demande de contact',
        memoFields: ['message']
    },
    collab: {
        formId: 'collabForm',
        submitId: 'collabSubmit',
        prefix: 'collab_',
        objectCommande: 'Demande de collaboration',
        memoFields: ['societe', 'message']
    },
    sav: {
        formId: 'savForm',
        submitId: 'savSubmit',
        prefix: 'sav_',
        objectCommande: 'Demande SAV',
        memoFields: ['message']
    },
    privatisation: {
        formId: 'privatisationForm',
        submitId: 'privatisationSubmit',
        prefix: '',
        objectCommande: null,
        memoFields: ['date_evenement', 'type_evenement', 'budget', 'nombre_invites', 'message']
    }
};

// Utilitaires
function getEnvVariable(key) {
    if (typeof import.meta.env !== 'undefined') {
        return import.meta.env[key] || '';
    }
    return '';
}

function getValueById(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

// Gestionnaire de formulaire générique
class FormHandler {
    constructor(config) {
        this.config = config;
        this.form = document.getElementById(config.formId);
        this.submitButton = document.getElementById(config.submitId);
        this.contactLogin = getEnvVariable('VITE_CONTACT_LOGIN');
        this.contactPassword = getEnvVariable('VITE_CONTACT_PASSWORD');

        if (!this.form || !this.submitButton) {
            console.error('Le formulaire ' + config.formId + ' ou son bouton est manquant');
            return;
        }

        this.initializeForm();
    }

    getMemoContent() {
        return this.config.memoFields
            .map(function(field) {
                const label = field.charAt(0).toUpperCase() + field.slice(1);
                return label + ' : ' + getValueById(this.config.prefix + field);
            }.bind(this))
            .join('\n');
    }

    getFormData() {
        const memoContent = this.getMemoContent();
        const prefix = this.config.prefix;
        const data = {
            action: 'contact',
            login: this.contactLogin,
            pass: this.contactPassword,
            lg: 'FR',
            civilite: getValueById(prefix + 'civilite'),
            nom: getValueById(prefix + 'nom'),
            prenom: getValueById(prefix + 'prenom'),
            email: getValueById(prefix + 'email'),
            telephone: getValueById(prefix + 'telephone'),
            memo: memoContent,
            remarque: memoContent,
            objet_commande: this.config.objectCommande || getValueById('type_evenement')
        };

        if (prefix === 'collab_') {
            data.societe = getValueById('collab_societe');
        }
        if (prefix === '') {
            data.mobile = getValueById('telephone');
        }

        return data;
    }

    submitForm(e) {
        e.preventDefault();
        const self = this;

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'UTF-8'
            },
            body: new URLSearchParams(this.getFormData())
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            if (result.erreur === 0) {
                self.form.reset();
                console.log('Formulaire ' + self.config.formId + ' soumis avec succès, ID: ' + result.id_contact);
            } else {
                console.error('Erreur:', result.message_erreur);
            }
        })
        .catch(function(error) {
            console.error('Erreur:', error);
        });
    }

    initializeForm() {
        this.form.addEventListener('submit', this.submitForm.bind(this));
    }
}

// Initialisation des formulaires
document.addEventListener('DOMContentLoaded', function() {
    Object.keys(FORMS_CONFIG).forEach(function(key) {
        new FormHandler(FORMS_CONFIG[key]);
    });
});