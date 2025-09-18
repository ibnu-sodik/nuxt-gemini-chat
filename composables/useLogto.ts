import LogtoClient from "@logto/browser";
// import { useRuntimeConfig } from "#app";
import { ref } from "vue";

const logtoClient = ref<LogtoClient | null>(null);

export function useLogto() {
  if (!logtoClient.value) {
    const config = useRuntimeConfig();
    logtoClient.value = new LogtoClient({
      endpoint: config.public.logto.endpoint,
      appId: config.public.logto.appId,
    });
  }

  const signInRedirect = async () => {
    try {
      // v3 signIn requires redirectUri and options object
      await logtoClient.value?.signIn(
        window.location.origin + "/callback",
        "signIn"
      );
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    await logtoClient.value?.signOut();
  };

  const isAuthenticated = async () => {
    return await logtoClient.value?.isAuthenticated();
  };

  const getIdTokenClaims = async () => {
    return await logtoClient.value?.getIdTokenClaims();
  };

  const handleSignInCallback = async (callbackUri: string) => {
    return await logtoClient.value?.handleSignInCallback(callbackUri);
  };

  return {
    signInRedirect,
    signOut,
    isAuthenticated,
    getIdTokenClaims,
    handleSignInCallback,
  };
}
