"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth");
  };

  return (
    <div>
      Hello
      <Button onClick={handleRedirect}> Hello </Button>
    </div>
  );
}
