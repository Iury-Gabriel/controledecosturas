import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            try {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    };

                    localStorage.setItem("@controlecosturas", JSON.stringify(userData));
                    setSigned(true);
                } else {
                    setSigned(false);
                }
            } catch (error) {
                console.error("Error in onAuthStateChanged:", error);
                setSigned(false);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!signed) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
