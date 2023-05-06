import { createClient } from "@supabase/supabase-js";

// para conectarse a supabase vamos a requerir dos variables 
const url = "https://drlwuzgoqedhvoeibtlq.supabase.co";
const publicKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybHd1emdvcWVkaHZvZWlidGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExODAwODksImV4cCI6MTk5Njc1NjA4OX0.NdBRZAu_J-ee8rc3UDNQuEsd3MFYIc_5YypiFKvJRHU";

const supabase = createClient(url, publicKey);


export async function signUp(user) {
  const { data, error } = await supabase.auth.signUp(user);

  if (error) {
    console.log("error", error);
    return {
      ok: false,
      error,
    };
  }

  return {
    ok: true,
    data,
  };
}

export async function signIn(user) {
  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (error) {
    console.log("error", error);
    return {
      ok: false,
      error,
    };
  }

  return {
    ok: true,
    data,
  };
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();

  return data.user;
}

export async function updateUser(user) {
  const { data, error } = await supabase.auth.updateUser({
    data: user,
  });

  if (error) {
    console.log(error);
    return;
  }

  return data;
}

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.log(error);
    return;
  }

  return data;
}