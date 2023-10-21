import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { handleLogout } from "@/pages/auth/common/store";

import UserAvatar from "@/assets/images/all-img/user.png";

const ProfileLabel = () => {
  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            src={UserAvatar}
            alt=""
            className="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
          Albert Flores
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          {/* <Icon icon="heroicons-outline:chevron-down"></Icon> */}
        </span>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ProfileMenu = [

  ];

  return (
   <ProfileLabel />
  );
};

export default Profile;
