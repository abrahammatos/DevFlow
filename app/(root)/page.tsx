import Image from "next/image";
import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await auth();

  const userName = session?.user?.name || "Guest";
  const avatarUrl = session?.user?.image || "/images/default-avatar.png";
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1>Welcome to the Home Page</h1>
      <p>Hello, {userName}!</p>
      <Image
        src={avatarUrl}
        alt="User Avatar"
        width={64}
        height={64}
        unoptimized
        className="mt-4 h-16 w-16 rounded-full"
      />
      <p>This is the main landing page of the application.</p>

      <form
        className="px-10 pt-25"
        action={async () => {
          "use server";

          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log Out</Button>
      </form>
    </div>
  );
};

export default Home;
