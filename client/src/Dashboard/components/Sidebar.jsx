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
import LargeSidebar from "./LargeSidebar";
import SmallSidebar from "./SmallSidebar";

const Sidebar = () => {

  return (
    <>
          <LargeSidebar />
          <SmallSidebar />
    </>
  );
};

export default Sidebar;
