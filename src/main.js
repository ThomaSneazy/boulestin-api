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
        objectCommande: null, // Utilise type_evenement du formulaire
        memoFields: ['date_evenement', 'type_evenement', 'budget', 'nombre_invites', 'message']
    }
};

// Utilitaires
const getEnvVariable = (key) => import.meta.env[key] || process.env[key] || '';
const getValueById = (id) => document.getElementById(id)?.value || '';

// Gestionnaire de formulaire générique
class FormHandler {
    constructor(config) {
        this.config = config;
        this.form = document.getElementById(config.formId);
        this.submitButton = document.getElementById(config.submitId);
        this.contactLogin = getEnvVariable('VITE_CONTACT_LOGIN');
        this.contactPassword = getEnvVariable('VITE_CONTACT_PASSWORD');

        if (!this.form || !this.submitButton) {
            console.error(`Le formulaire ${config.formId} ou son bouton est manquant`);
            return;
        }

        this.initializeForm();
    }

    getMemoContent() {
        return this.config.memoFields
            .map(field => {
                const label = field.charAt(0).toUpperCase() + field.slice(1);
                return `${label} : ${getValueById(this.config.prefix + field)}`;
            })
            .join('\n');
    }

    getFormData() {
        const memoContent = this.getMemoContent();
        const prefix = this.config.prefix;

        return {
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
            objet_commande: this.config.objectCommande || getValueById('type_evenement'),
            ...(prefix === 'collab_' && { societe: getValueById('collab_societe') }),
            ...(prefix === '' && { mobile: getValueById('telephone') })
        };
    }

    async submitForm(e) {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Charset': 'UTF-8'
                },
                body: new URLSearchParams(this.getFormData())
            });

            const result = await response.json();
            if (result.erreur === 0) {
                this.form.reset();
                console.log(`Formulaire ${this.config.formId} soumis avec succès, ID: ${result.id_contact}`);
            } else {
                console.error('Erreur:', result.message_erreur);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    initializeForm() {
        this.form.addEventListener('submit', (e) => this.submitForm(e));
    }
}

// Initialisation des formulaires
document.addEventListener('DOMContentLoaded', () => {
    Object.values(FORMS_CONFIG).forEach(config => new FormHandler(config));
});