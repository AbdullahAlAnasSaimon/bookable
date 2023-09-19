import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div>
      <h1>Navbar</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export default Navbar;
