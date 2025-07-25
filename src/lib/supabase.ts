import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your-supabase-url' || 
    supabaseAnonKey === 'your-supabase-anon-key' ||
    !supabaseUrl.startsWith('https://')) {
  throw new Error(
    "Please configure your Supabase environment variables in the .env file:\n" +
    "- VITE_SUPABASE_URL should be your actual Supabase project URL\n" +
    "- VITE_SUPABASE_ANON_KEY should be your actual Supabase anonymous key\n" +
    "You can find these values in your Supabase project dashboard under Settings > API"
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type OrganizationType = {
  id: string;
  name: string;
  logo_url?: string;
};

export type UserType = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  organization_id?: string;
  role: "super_admin" | "org_admin" | "manager" | "employee";
  organization?: OrganizationType;
  last_sign_in?: string;
};

export async function getCurrentUser(): Promise<UserType | null> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return null;
    }

    // Check if the user exists in the users table
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching user:", error);

      // If the user doesn't exist in the users table but exists in auth, create them
      if (error.code === "PGRST116") {
        const authUser = session.user;

        // Create a basic user record
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert({
            id: authUser.id,
            email: authUser.email,
            role: "super_admin", // Default to super_admin for users created this way
            full_name: "مدير النظام",
          })
          .select()
          .single();

        if (insertError) {
          console.error("Error creating user record:", insertError);
          return null;
        }

        return newUser as unknown as UserType;
      }

      return null;
    }

    if (!user) {
      return null;
    }

    return user as unknown as UserType;
  } catch (error) {
    console.error("Unexpected error in getCurrentUser:", error);
    return null;
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ user: any } | null> {
  try {
    // Get super admin credentials from environment variables
    const superAdminEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL;
    const superAdminPassword = import.meta.env.VITE_SUPER_ADMIN_PASSWORD;

    // Check if credentials are available
    if (!superAdminEmail || !superAdminPassword) {
      throw new Error(
        "مطلوب بيانات مدير النظام. الرجاء تعيين متغيرات البيئة VITE_SUPER_ADMIN_EMAIL و VITE_SUPER_ADMIN_PASSWORD",
      );
    }

    // Check for super admin credentials
    if (email === superAdminEmail && password === superAdminPassword) {
      try {
        // Try to sign in with the credentials
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If the user doesn't exist, create it as a super admin
          if (error.message.includes("Invalid login credentials")) {
            // Sign up with email confirmation disabled for super admin
            const { data: signUpData, error: signUpError } =
              await supabase.auth.signUp({
                email,
                password,
                options: {
                  emailRedirectTo: `${window.location.origin}/login`,
                  data: {
                    is_super_admin: true,
                  },
                },
              });

            if (signUpError) throw signUpError;

            // Manually confirm the super admin's email
            if (signUpData.user) {
              // Skip admin functions for email confirmation as they're not available in client-side code
              // Instead, we'll try to sign in directly
              // No need to check for confirmError since we're skipping that step
            }

            // Create the user in our users table as super_admin
            const { error: userError } = await supabase
              .from("users")
              .insert({
                id: signUpData.user!.id,
                email,
                role: "super_admin",
                full_name: "مدير النظام",
              })
              .select();

            if (userError) throw userError;

            // Try to sign in immediately after creating the account
            const { data: signInData, error: signInError } =
              await supabase.auth.signInWithPassword({
                email,
                password,
              });

            if (signInError) {
              console.error(
                "Failed to sign in after account creation:",
                signInError,
              );
              return signUpData; // Return signup data as fallback
            }

            return signInData;
          } else {
            throw error;
          }
        }

        // If the user exists but is not a super_admin, update their role
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (userError) throw userError;

        if (user && user.role !== "super_admin") {
          const { error: updateError } = await supabase
            .from("users")
            .update({ role: "super_admin" })
            .eq("id", data.user.id);

          if (updateError) throw updateError;
        }

        return data;
      } catch (err) {
        throw err;
      }
    }

    // Regular sign in for non-super admin users
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in signIn function:", error);
    return null; // Return null instead of throwing to prevent unhandled errors
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function createOrganization(name: string, userId: string) {
  const { data: organization, error: orgError } = await supabase
    .from("organizations")
    .insert({ name })
    .select()
    .single();

  if (orgError || !organization) {
    throw orgError;
  }

  // Update the user with the organization ID
  const { error: userError } = await supabase
    .from("users")
    .update({
      organization_id: organization.id,
      role: "org_admin",
    })
    .eq("id", userId);

  if (userError) {
    throw userError;
  }

  return organization;
}

export async function inviteUserToOrganization(
  email: string,
  role: "org_admin" | "manager" | "employee",
  organizationId: string,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Generate a random token
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // Set expiry to 7 days from now
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const { data, error } = await supabase
    .from("organization_invites")
    .insert({
      organization_id: organizationId,
      email,
      role,
      invited_by: user.id,
      token,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function acceptInvite(token: string, password: string) {
  // Get the invite
  const { data: invite, error: inviteError } = await supabase
    .from("organization_invites")
    .select("*, organization:organizations(*)")
    .eq("token", token)
    .single();

  if (inviteError || !invite) {
    throw new Error("Invalid or expired invitation");
  }

  // Check if invite is expired
  if (new Date(invite.expires_at) < new Date()) {
    throw new Error("Invitation has expired");
  }

  // Create the user in auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: invite.email,
    password,
  });

  if (authError || !authData.user) {
    throw authError || new Error("Failed to create user");
  }

  // Create the user in our users table
  const { error: userError } = await supabase.from("users").insert({
    id: authData.user.id,
    email: invite.email,
    organization_id: invite.organization_id,
    role: invite.role,
  });

  if (userError) {
    throw userError;
  }

  // Delete the invite
  await supabase.from("organization_invites").delete().eq("id", invite.id);

  return authData;
}
