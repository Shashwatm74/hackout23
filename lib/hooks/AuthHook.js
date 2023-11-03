// import { Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";

// export const useAuth = () => {
//     const Supabase = supabase();

//     const signInWithPassword = async (email, password, type) => {
//         const { error } = type === "Sign Up"
//             ? await Supabase.auth.signUp({
//                 email,
//                 password,
//             })
//             : await Supabase.auth.signInWithPassword({
//                 email,
//                 password,
//             });

//         if (!error && type === "Sign Up") {
//             Alert.alert("Error", "Check Your Email!");
//         }
//         if (error) return Alert.alert("Error", error.message);
//     };

//     const signInWithGoogle = async () => {
//         try {
//             const redirectUri = "refeed://login";
//             const provider = "google";
//             const response = await WebBrowser.openAuthSessionAsync(
//                 `${process.env.EXPO_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUri}`,
//                 redirectUri,
//             );

//             if (response.type === "success") {
//                 const url = response.url;
//                 const params = url.split("#")[1];
//                 const accessToken = params?.split("&")[0]?.split("=")[1];
//                 const refreshToken = params?.split("&")[2]?.split("=")[1];

//                 const { error } = await Supabase.auth.setSession({
//                     access_token: accessToken,
//                     refresh_token: refreshToken,
//                 });
//                 if (error) {
//                     Alert.alert("Error", error.message);
//                 }
//             }
//         } catch (error) {
//             Alert.alert("Error", "Issue with Google Auth, try again");
//         } finally {
//             WebBrowser.maybeCompleteAuthSession();
//         }
//         WebBrowser.maybeCompleteAuthSession();
//     };

//     return {
//         signInWithPassword,
//         signInWithGoogle,
//     };
// };

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/db/supabase";

export const useAuth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CheckLogin = async () => {
      const ses = await supabase.auth.getSession();
      if (ses.data.session == null) {
        router.push('/login');
      } else {
        setAuthState(true);
      }
      setLoading(false);
    };
    CheckLogin();
  }, [router]);

  const signInWithPassword = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { user };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    authState,
    signInWithPassword,
  };
};
