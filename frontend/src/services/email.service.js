const CLIENT_ID = import.meta.env.VITE_APP_EMAIL_ID;
const API_KEY = import.meta.env.VITE_APP_EMAIL_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

let tokenClient;
let gapiInited = false;
let gisInited = false;

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
    });
    console.log('succesfully initialized gapi client')
    gapiInited = true;
    attemptAuthAndSendEmail();
}

function initializeGisClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (resp) => {
            if (resp.error) {
                console.error(resp);
                return;
            }
            await sendEmail();
        },
    });
    gisInited = true;
    attemptAuthAndSendEmail();
}

function attemptAuthAndSendEmail() {
    if (gapiInited && gisInited) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    }
}

async function sendEmail() {
    const email = [
        "To: mooscastelijn@gmail.com",
        "Subject: Test Email",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "",
        "This is a prewritten email sent via the Gmail API."
    ].join("\r\n");

    const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    try {
        const response = await gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': {
                'raw': base64EncodedEmail
            }
        });
        console.log("Email sent!", response);
    } catch (error) {
        console.error("Error sending email", error);
    }
}

// Load the Google API client
function loadGapiClient() {
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => gapi.load('client', initializeGapiClient);
    document.body.appendChild(script);
}

// Load the Google Identity Services client
function loadGisClient() {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGisClient;
    document.body.appendChild(script);
}

// Function to set up authentication and immediately send an email
export function sendEmailToCharlotte() {
    loadGapiClient();
    loadGisClient();
}
