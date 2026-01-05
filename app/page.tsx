import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>AI Agent Builder Platform</h2>
      <Button>generate</Button>
      <UserButton/>
    </div>
  );
}
