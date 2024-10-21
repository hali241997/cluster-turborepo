import { FC } from "react";
import { AppRoutes } from "./AppRoutes";
import { CurrentUser } from "./CurrentUser";
import { Heading } from "./Heading";

export const Drawer: FC = () => {
  return (
    <div className="w-[200px] hidden lg:block transition-all  border-[#283038] border-r-[1px] bg-greyPrimary">
      <div className="py-[14px] flex flex-col h-full">
        <div className="h-full">
          <Heading />

          <AppRoutes />
        </div>

        <div>
          <CurrentUser />
        </div>
      </div>
    </div>
  );
};
