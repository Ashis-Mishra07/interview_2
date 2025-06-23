"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Login() {
    const router = useRouter();

    const signInWithGoogle = async () => {
        const redirectTo = `${window.location.origin}/auth`;
        console.log("Redirecting to:", redirectTo);
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo },
        });
        if (error) {
            console.error("Google login error:", error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center border rounded-2xl p-8">
                <Image src="/logo.png" alt="logo" width={180} height={80} />
                <Image
                    src="/login.png"
                    alt="login"
                    width={400}
                    height={250}
                    className="rounded-2xl mt-6"
                />
                <h2 className="text-2xl font-bold mt-5">Welcome to AiCruiter</h2>
                <p className="text-gray-500 text-center">Sign in with Google</p>
                <Button onClick={signInWithGoogle} className="mt-7 w-full">
                    Login With Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
