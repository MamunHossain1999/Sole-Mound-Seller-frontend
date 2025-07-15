import { Card, CardContent } from "@/components/ui/card";
import img1 from "@/assets/dashboardIcon/img1.png";
import img2 from "@/assets/dashboardIcon/img2.png";
import img3 from "@/assets/dashboardIcon/img3.png";
import img4 from "@/assets/dashboardIcon/img4.png";
import img5 from "@/assets/dashboardIcon/img5.png";
import shoppingCart from "@/assets/dashboardIcon/shoppingCart.svg";
import total from "@/assets/dashboardIcon/totalIncome.svg";
import monthlyIcome from "@/assets/dashboardIcon/monthlyIcome.svg";
import user from "@/assets/dashboardIcon/user.svg";

const DashBoardCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 ">
      {/* Card 1 */}
      <Card className="relative text-white transition-all duration-300 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center "
          style={{ backgroundImage: `url(${img1})` }}
        />
        <CardContent className="px-4 relative z-10">
          <div className="">
            <div>
              <p className="text-base font-bold lg:text-[20px] text-[#FFF] mb-1">
                Total Sales
              </p>
              <p className="text-base lg:text-4xl font-bold text-[#FFFFFF] mb-2">
                34,945
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <img
              src={shoppingCart}
              alt="Total Income"
              className="w-[34px] h-[34px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="relative text-white transition-all duration-300 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center "
          style={{ backgroundImage: `url(${img2})` }}
        />
        <CardContent className="px-4 relative z-10">
          <div className="">
            <div>
              <p className="text-base font-bold lg:text-[20px] text-[#FFF] mb-1">
                Total Income
              </p>
              <p className="text-base lg:text-4xl font-bold text-[#FFFFFF] mb-2">
                $23,802
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <img src={total} alt="Total Income" className="w-[34px] h-[34px]" />
          </div>
        </CardContent>
      </Card>

      {/* Card 3 */}
      <Card className="relative text-white transition-all duration-300 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center "
          style={{ backgroundImage: `url(${img3})` }}
        />
        <CardContent className="px-4 relative z-10">
          <div className="">
            <div>
              <p className="text-base font-bold lg:text-[20px] text-[#FFF] mb-1">
                Monthly Earning
              </p>
              <p className="text-base lg:text-4xl font-bold text-[#FFFFFF] mb-2">
                $13,123
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <img
              src={monthlyIcome}
              alt="Total Income"
              className="w-[34px] h-[34px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 4 */}
      <Card className="relative text-white transition-all duration-300 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center "
          style={{ backgroundImage: `url(${img4})` }}
        />
        <CardContent className="px-4 relative z-10">
          <div className="">
            <div>
              <p className="text-base font-bold lg:text-[20px] text-[#FFF] mb-1">
                Total Withdraw
              </p>
              <p className="text-base lg:text-4xl font-bold text-[#FFFFFF] mb-2">
                $2,543
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <img
              src={monthlyIcome}
              alt="Total Income"
              className="w-[34px] h-[34px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 5 */}
      <Card className="relative text-white transition-all duration-300 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center "
          style={{ backgroundImage: `url(${img5})` }}
        />
        <CardContent className="px-4 relative z-10">
          <div className="">
            <div>
              <p className="text-base font-bold lg:text-[20px] text-[#FFF] mb-1">
                Total Visitors
              </p>
              <p className="text-base lg:text-4xl font-bold text-[#FFFFFF] mb-2">
                34,945
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <img src={user} alt="Total Income" className="w-[34px] h-[34px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoardCard;
