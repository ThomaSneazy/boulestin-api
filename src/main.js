import './styles/style.css'

//////////////////////CONTACT FORM//////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('contactSubmit');

    if (!form || !submitButton) {
        console.error('Le formulaire de contact ou le bouton de soumission est manquant');
        return;
    }

    function getValueById(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    // Utilisez cette fonction pour accéder à vos variables d'environnement
    const contactLogin = getEnvVariable('VITE_CONTACT_LOGIN');
    const contactPassword = getEnvVariable('VITE_CONTACT_PASSWORD');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const memoContent = `Message : ${getValueById('contact_message')}`;

        const data = {
            action: 'contact',
            login: contactLogin,
            pass: contactPassword,
            lg: 'FR',
            civilite: getValueById('contact_civilite'),
            nom: getValueById('contact_nom'),
            prenom: getValueById('contact_prenom'),
            email: getValueById('contact_email'),
            telephone: getValueById('contact_telephone'),
            memo: memoContent,
            remarque: memoContent,
            objet_commande: 'Demande de contact'
        };

        fetch('https://www.beenbiz.com/o-chateau/webservice-internet/ws.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'UTF-8'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.erreur === 0) {
                form.reset();
            } else {
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});

function getEnvVariable(key) {
    return import.meta.env[key] || process.env[key] || '';
}

//////////////////////COLLAB FORM//////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('collabForm');
    const submitButton = document.getElementById('collabSubmit');

    if (!form || !submitButton) {
        console.error('Le formulaire de collaboration ou le bouton de soumission est manquant');
        return;
    }

    function getValueById(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    // Utilisez cette fonction pour accéder à vos variables d'environnement
    const contactLogin = getEnvVariable('VITE_CONTACT_LOGIN');
    const contactPassword = getEnvVariable('VITE_CONTACT_PASSWORD');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const memoContent = [
            `Société : ${getValueById('collab_societe')}`,
            `Message : ${getValueById('collab_message')}`
        ].join('\n');

        const data = {
            action: 'contact',
            login: contactLogin,
            pass: contactPassword,
            lg: 'FR',
            civilite: getValueById('collab_civilite'),
            nom: getValueById('collab_nom'),
            prenom: getValueById('collab_prenom'),
            email: getValueById('collab_email'),
            telephone: getValueById('collab_telephone'),
            societe: getValueById('collab_societe'),
            memo: memoContent,
            remarque: memoContent,
            objet_commande: 'Demande de collaboration'
        };

        fetch('https://www.beenbiz.com/o-chateau/webservice-internet/ws.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'UTF-8'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.erreur === 0) {
                form.reset();
            } else {
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});

//////////////////////SAV FORM//////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('savForm');
    const submitButton = document.getElementById('savSubmit');

    if (!form || !submitButton) {
        console.error('Le formulaire SAV ou le bouton de soumission est manquant');
        return;
    }

    function getValueById(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    // Utilisez cette fonction pour accéder à vos variables d'environnement
    const contactLogin = getEnvVariable('VITE_CONTACT_LOGIN');
    const contactPassword = getEnvVariable('VITE_CONTACT_PASSWORD');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const memoContent = `Message : ${getValueById('sav_message')}`;

        const data = {
            action: 'contact',
            login: contactLogin,
            pass: contactPassword,
            lg: 'FR',
            civilite: getValueById('sav_civilite'),
            nom: getValueById('sav_nom'),
            prenom: getValueById('sav_prenom'),
            email: getValueById('sav_email'),
            telephone: getValueById('sav_telephone'),
            memo: memoContent,
            remarque: memoContent,
            objet_commande: 'Demande SAV'
        };

        fetch('https://www.beenbiz.com/o-chateau/webservice-internet/ws.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'UTF-8'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.erreur === 0) {
                form.reset();
            } else {
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});

//////////////////////PRIVATISATION FORM//////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('privatisationForm');
    const submitButton = document.getElementById('privatisationSubmit');

    if (!form || !submitButton) {
        console.error('Le formulaire ou le bouton de soumission est manquant');
        return;
    }

    function getValueById(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    // Utilisez cette fonction pour accéder à vos variables d'environnement
    const contactLogin = getEnvVariable('VITE_CONTACT_LOGIN');
    const contactPassword = getEnvVariable('VITE_CONTACT_PASSWORD');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const memoContent = [
            `Date de l'évènement : ${getValueById('date_evenement')}`,
            `Type d'évènement : ${getValueById('type_evenement')}`,
            `Budget : ${getValueById('budget')}`,
            `Nombre d'invités : ${getValueById('nombre_invites')}`,
            `Message : ${getValueById('message')}`
        ].join('\n');

        const data = {
            action: 'contact',
            login: contactLogin,
            pass: contactPassword,
            lg: 'FR',
            civilite: getValueById('civilite'),
            nom: getValueById('nom'),
            prenom: getValueById('prenom'),
            email: getValueById('email'),
            telephone: getValueById('telephone'),
            objet_commande: getValueById('type_evenement'),
            memo: memoContent,
            remarque: memoContent,
            mobile: getValueById('telephone'),
        };

        fetch('https://www.beenbiz.com/o-chateau/webservice-internet/ws.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Charset': 'UTF-8'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.erreur === 0) {
                form.reset();
            } else {
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});
function _(key) {
    if (typeof import.meta.env !== 'undefined') {
        return import.meta.env[key] || '';
    }
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || '';
    }
    // Si aucune variable d'environnement n'est trouvée, retournez une chaîne vide
    console.error(`La variable d'environnement ${key} n'est pas définie`);
    return '';
}
