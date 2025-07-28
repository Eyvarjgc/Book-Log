import React from "react";
import { NavLink } from "react-router";

interface LinkProps {
  path:string; 
  children: React.ReactNode;
  icon: string ;
  alternativeIcon: string;
}

export const Link : React.FC<LinkProps> = ({path, children, icon, alternativeIcon}) => {

  return (
    <NavLink to={path} viewTransition >
      {({isActive}) => (

        <div className="flex items-center align-middle gap-3  tracking-wide">
          <img src={isActive ? alternativeIcon : icon} className={
            isActive ? "bg-orange-500 bg-opacity-50 rounded-xl p-2 w-8 h-8" 
            : "bg-gray-200 bg-opacity-50 rounded-xl p-2 w-8 h-8"
          } />

          <p className={isActive ? "text-black font-bold" : "text-gray-600"}>{children}</p>
        </div>

      )}
    </NavLink>
  )
}



