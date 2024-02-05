import React from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { PiSyringeDuotone } from "react-icons/pi";
import { GiCage } from "react-icons/gi";
import { MdOutlineLocalHospital } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-[80px] hidden h-[100vh]  md:flex flex-col  items-center shadow-lg">
      <div className="bg-neutral text-gray-300 min-h-[320px] w-[45px] mt-2 py-3 rounded-t-[20px] rounded-b-[20px] ">
        <div className="flex justify-center items-center mb-4">
          <span>Pet</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div
            onClick={() => navigate("/dashboard")}
            className={`${
              location.pathname === "/dashboard"
                ? "bg-secondary border-l-2 border-l-primary"
                : "hover:bg-secondary hover:border-l-2 hover:border-l-primary"
            } p-3`}
          >
            <IoHomeOutline className="text-xl" />
          </div>

          <div
            onClick={() => navigate("./patients")}
            className={`${
              location.pathname === "/dashboard/patients"
                ? "bg-secondary border-l-2 border-l-primary"
                : "hover:bg-secondary hover:border-l-2 hover:border-l-primary"
            } p-3`}
          >
            <MdPets className="text-xl" />
          </div>

          <div
            onClick={() => navigate("./clinic")}
            className={`${
              location.pathname === "/dashboard/clinic"
                ? "bg-secondary border-l-2 border-l-primary"
                : "hover:bg-secondary hover:border-l-2 hover:border-l-primary"
            } p-3`}
          >
            <MdOutlineLocalHospital className="text-xl" />
          </div>

          <div
            onClick={() => navigate("./boarding")}
            className={`${
              location.pathname === "/dashboard/boarding"
                ? "bg-secondary border-l-2 border-l-primary"
                : "hover:bg-secondary hover:border-l-2 hover:border-l-primary"
            } p-3`}
          >
            <GiCage className="text-xl" />
          </div>

          <div
            onClick={() => navigate("./treatment")}
            className={`${
              location.pathname === "/dashboard/treatment"
                ? "bg-secondary border-l-2 border-l-primary"
                : "hover:bg-secondary hover:border-l-2 hover:border-l-primary"
            } p-3`}
          >
            <FaUserDoctor className="text-xl" />
          </div>
          <div
            onClick={() => navigate("./vaccine")}
            className={`${
              location.pathname === "/dashboard/vaccine"
                ? "bg-secondary border-l-2 border-l-primary"
                : "hover:bg-secondary hover:border-l-2 hover:border-l-primary"
            } p-3`}
          >
            <PiSyringeDuotone className="text-xl" />
          </div>
          {/* <div className={`${
          location.pathname === '/dashboard/patients'
            ? 'bg-secondary border-l-2 border-l-primary'
            : 'hover:bg-secondary hover:border-l-2 hover:border-l-primary'
        } p-3`}>
                         <HiOutlineDocumentReport className='text-xl'/>
                    </div> */}
          <div
            onClick={() => navigate("./owners")}
            className={`${
              location.pathname === "/dashboard/owners"
                ? "bg-secondary border-l-2 border-l-primary"
                : "hover:bg-secondary hover:border-l-2 hover:border-l-primary"
            } p-3`}
          >
            <FaUsers className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
