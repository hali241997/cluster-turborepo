"use client";

import { FC } from "react";
import Logo from "@/vectors/logo.svg";
import Image from "next/image";
import { useClusterState } from "@/redux/cluster/slice";

export const Heading: FC = () => {
  const { name } = useClusterState();

  return (
    <div className="px-3 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div>
          <Image src={Logo} alt="logo" width={28} height={28} />
        </div>

        <div className="text-h1">{name}</div>
      </div>

      <hr className="border-greySecondary" />
    </div>
  );
};
