import { Builder, By, Key } from 'selenium-webdriver';

(async function testSite() {
    // Spécifier le Hub URL de Selenium Grid
    const HUB_URL = 'http://192.168.8.105:4444';

    // Configuration pour le navigateur (ici Chrome)
    let driver = await new Builder()
        .usingServer(HUB_URL) // Utilise Selenium Grid Hub
        .forBrowser('chrome')  // Navigateur à utiliser
        .build();


    // Fonction pour simuler une saisie lente
    async function slowType(element, text, delay = 100) {
        for (const char of text) {
            await element.sendKeys(char);
            await new Promise(resolve => setTimeout(resolve, delay)); // Pause entre chaque frappe
        }
    }

    try {
        // Ouvrir votre site
        await driver.get('http://127.0.0.1:5500/contact.html'); // Remplacez par l'URL de votre site
        await driver.sleep(3000);
        await driver.findElement(By.id('showContact')).click();

        // Scénario 1: Test du formulaire de contact (caché initialement)
        // ETAPE 1 : TESTER LE FORMULAIRE DE CONTACT
        // Ouvrir la barre de contact qui est caché initialement
        await driver.sleep(5000);
        let nameField = await driver.findElement(By.id('name'));
        await slowType(nameField, 'Test User', 150);
        await driver.sleep(1000);

        let emailField = await driver.findElement(By.id('email'));
        await slowType(emailField, 'test@example.com', 150);
        await driver.sleep(1000);

        let subjectField = await driver.findElement(By.id('subject'));
        await slowType(subjectField, 'Test', 150);
        await driver.sleep(1000);

        let messageField = await driver.findElement(By.id('message'));
        await slowType(messageField, 'Ceci est un test.', 150);
        await driver.sleep(3000);

        // Cliquer sur le bouton soumettre
        await driver.findElement(By.id('btn-soumettre')).click();
        await driver.sleep(10000);

        // Cliquer sur le bouton OK de notification
        await driver.findElement(By.id('close-notificatione')).click();
        await driver.sleep(3000);

        // Cliquer sur le bouton x pour fermer
        await driver.findElement(By.id('closeContactBtn')).click();
        await driver.sleep(5000);


        // Scénario 2: Test de la barre de recherche (caché initialement)
        // ETAPE 2 : TESTER LA BARRE DE RECHERCHE
        // Ouvrir la barre de recherche qui est caché initialement
        await driver.findElement(By.id('showSearch')).click();
        await driver.sleep(3000);

        let searchField = await driver.findElement(By.id('searchInput'));
        await slowType(searchField, 'diffusion', 150);
        await driver.sleep(3000);

        // Clique sur entrer ou clique sur l'icône recherche à l'intérieur
        await driver.findElement(By.id('icon-search')).click(Key.RETURN);
        await driver.sleep(5000);

        // Cliquer dans une zone neutre de la page (le <body>) pour faire disparaître la notification
        let body = await driver.findElement(By.css('body'));
        await body.click();
        await driver.sleep(2000);

        // Cliquer sur le bouton x pour fermer
        await driver.findElement(By.id('closeSearchBtn')).click();
        await driver.sleep(3000);

        // Cliquer sur le bouton back-to-top pour revenir au top
        await driver.findElement(By.id('btnBack')).click();
        await driver.sleep(3000);


        // Scénario 3: Navigation entre les pages et les autres fonctionnalités
        // ETAPE 3 : TESTER UN LIEN PAR EXEMPLE "A propos de nous"
        await driver.findElement(By.linkText('À propos de nous')).click();
        await driver.sleep(3000);

        // Scroller vers le bouton nos services
        let btnService = await driver.findElement(By.className('btn-primary1'));
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", btnService);
        await driver.sleep(3000);

        // Clique sur le bouton Nos services
        await driver.findElement(By.className('btn-primary1')).click();
        await driver.sleep(5000);

        // Scroller vers la partie multi-service de service
        let multiService = await driver.findElement(By.className('a-propos-de'));
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", multiService);
        await driver.sleep(3000);

        // Cliquer par exemple sur l'un de multipage
        await driver.findElement(By.linkText('Transformation numérique')).click();
        await driver.sleep(5000);


        // Scénario 4: Test du champs des abonnées (pour l’inscription)
        // ETAPE 4 : ALLER VERS LA PAGE D'ACCUEIL
        await driver.findElement(By.linkText('Accueil')).click();
        await driver.sleep(3000);

        // Scroller jusqu'à l'élément spécifique (formulaire d'inscription)
        let subscribeField = await driver.findElement(By.id('emaile'));
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", subscribeField);
        await driver.sleep(3000);

        // Entrer un email dans le champ
        await slowType(subscribeField, 'test-automatique@gmail.com', 100);
        await driver.sleep(3000);

        // Clique sur le bouton s'inscrire
        await driver.findElement(By.id('btnFooter')).click();
        await driver.sleep(5000);

        // Clique sur le bouton OK de notification
        await driver.findElement(By.className('swal2-confirm')).click();
        await driver.sleep(5000);


        // Scénario 5: Test fonctionnalité appel
        // ETAPE 5: APPEL
        // Scroller jusqu'à l'appel
        let callBlock = await driver.findElement(By.className('bloc-appelez'));
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", callBlock);
        await driver.sleep(3000);

        // Clique sur le bouton appel
        await driver.findElement(By.id('appel')).click();
        await driver.sleep(8000);

        // Clique sur le bouton annuler
        await driver.findElement(By.id('closeSelector')).click();
        await driver.sleep(3000);

        // Cliquer sur le bouton back-to-top pour revenir au top
        await driver.findElement(By.id('btnBack')).click();
        await driver.sleep(3000);

        await driver.findElement(By.linkText('Nos services')).click();
        await driver.sleep(3000);


        // Scénario 6: Test du formulaire de contact GENERALE dans la page contact
        // ETAPE 6 : RE-ALLER VERS LA PAGE CONTACT
        await driver.findElement(By.linkText('Contact')).click();
        await driver.sleep(3000);

        // Scroller vers le contactBlock
        let contactBlock = await driver.findElement(By.id('contact-form'));
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", contactBlock);
        await driver.sleep(3000);

        // Puis re-tester le formulaire
        let namField = await driver.findElement(By.className('name'));
        await slowType(namField, 'Utilisateur Test', 100);
        await driver.sleep(1000);

        let emaiField = await driver.findElement(By.className('email'));
        await slowType(emaiField, 'utilisateurtest@example.com', 100);
        await driver.sleep(1000);

        let subjecField = await driver.findElement(By.className('subject'));
        await slowType(subjecField, 'Essaie', 200);
        await driver.sleep(1000);

        let messagField = await driver.findElement(By.className('message'));
        await slowType(messagField, 'Voici le deuxième essai et test.', 100);
        await driver.sleep(3000);

        // Clique sur le bouton soumettre
        await driver.findElement(By.id('btn-submit')).click();
        await driver.sleep(10000);

        // Clique sur le bouton OK de notification
        await driver.findElement(By.id('close-notification')).click();
        await driver.sleep(3000);



        console.log("Tous les tests se sont terminés avec succès !");
    } catch (error) {
        console.error("Erreur pendant le test :", error);
    } finally {
        // Fermer le navigateur
        await driver.quit();
    }
})();
