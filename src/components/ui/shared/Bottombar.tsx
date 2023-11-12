import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${
              isActive && "border-b-4 border-primary-500"
            } flex-center flex-col gap-1 p-2 transition group`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`${
                isActive && "invert-white"
              } group-hover:invert-white`}
            />
            {link.label}
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
