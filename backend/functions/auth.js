import supabase from '../supabase'; // Import the Supabase client

// Function to register a new user
async function registerUser(email, password) {
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { user, error };
  } catch (error) {
    return { error: error.message };
  }
}

// Function to authenticate a user
async function loginUser(email, password) {
  try {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    return { user, error };
  } catch (error) {
    return { error: error.message };
  }
}

// Function to log out a user
async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return { error: error.message };
  }
}

export { registerUser, loginUser, logoutUser };
