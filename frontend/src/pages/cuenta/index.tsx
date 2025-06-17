// src/pages/cuenta/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const CuentaRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/cuenta/resumen");
  }, [router]);

  return null;
};

export default CuentaRedirect;
