import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log("Session:", session);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;
