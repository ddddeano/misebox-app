import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
const config = useRuntimeConfig();

const serviceAccount = {
  type: "service_account",
  project_id: "misebox-78f9c",
  private_key_id: "6fc76064a1f39f51db2e5823998c1124c33b7d3e",
  private_key: config.apiSecret,
  client_email: "firebase-adminsdk-n373e@misebox-78f9c.iam.gserviceaccount.com",
  client_id: "117824506699842384635",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n373e%40misebox-78f9c.iam.gserviceaccount.com",
};

export const app = initializeApp({
  credential: cert(serviceAccount),
});
export const firestore = getFirestore();
