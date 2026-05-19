export function getFirebaseErrorMessage(error: any): string {
  if (!error || !error.code) {
    return error?.message || "An unexpected error occurred. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed before completing.";
    case "auth/operation-not-allowed":
      return "This sign-in method is currently disabled.";
    default:
      return "Authentication failed. Please try again.";
  }
}
