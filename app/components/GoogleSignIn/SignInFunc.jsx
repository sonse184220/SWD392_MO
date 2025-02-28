import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {auth} from '../Firebase/FirebaseConfig';

export default async function GGSignIn() {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();

        // Try the new style of google-sign in result, from v13+ of that module
        idToken = signInResult.data?.idToken;
        if (!idToken) {
            // if you are using older versions of google-signin, try old style result
            idToken = signInResult.idToken;
        }
        if (!idToken) {
            throw new Error('No ID token found');
        }


        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const userCredential = await signInWithCredential(auth, googleCredential);

        // Extract user details
        const user = userCredential.user;

        console.log('User signed in:', user);

        // Return user data
        return user;
    } catch (error) {
        console.error('Sign-in error:', error);
        throw error; 
    }
}