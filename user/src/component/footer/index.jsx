import { AiOutlineMail } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";
import logo from './new.png'
import logo_f from './logo_f.png'
function Footer() {
  return (
    <div className=" bg-main_blue flex flex-col items-center text-white font-roboto pb-[10px]">
      <div className="flex gap-[40px] md:gap-[60px] lg:gap-[130px] xl:gap-[187px] mt-[40px] md:mt-[22px] md:flex-row flex-col">
        <div className="flex  gap-[80px] lg:gap-[187px] sm:flex-row flex-col">
          <div className="flex flex-col items-center">
            <p className="font-roboto_slab text-[20px] mb-[8px]">Contact Us</p>
            <p className="w-[272px] text-justify font-medium leading-[151%] text-[14px]">
            For inquiries about our university transport services, feel free to reach out to us. 
            We’re here to assist with all your transportation needs and ensure a smooth experience 
            for students and staff.
            </p>
            <div className="flex flex-col gap-4 mt-3 text-[12px]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#111C55] border-[1px] border-[#3c4ba2]">
                  <AiOutlineMail className="text-[25px]" />
                </div>
                <div>
                  <p>Email</p>
                  <p>info@transport.usj.lk </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#111C55] border-[1px] border-[#3c4ba2]">
                  <LuPhone className="text-[25px]" />
                </div>
                <div>
                  <p>Phone</p>
                  <p>+94 11 280 2695</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center sm:block hidden">
            <p className="font-roboto_slab text-[20px] mb-[8px]">Site Links</p>
            <div className="flex flex-col items-center gap-[8px]">
              <p className="text-[14px]  font-medium">Home</p>
              <p className="text-[14px]  font-medium">Routes</p>
              <p className="text-[14px]  font-medium">Journey</p>
              <p className="text-[14px]  font-medium">Booking</p>
              <p className="text-[14px]  font-medium">Prices</p>
              <p className="text-[14px]  font-medium">Contact Us</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-centerd mx-auto xsm:px-0 px-[5px] ">
          <img
            src={logo}
            alt=""
            className="w-[400px] md:w-[250px]  sm:mx-0 mx-auto hidden sm:block"
          />
          <div className="flex flex-col gap-[13px] mt-[10px] ">
            
            <div className="flex gap-2 place-items-start  sm:justify-start justify-center  ">
              <p className="xsm:text-[14px] text-[12px]  font-medium xsm:text-left text-center">
              University of Sri Jayewardenepura
              </p>
            </div>
            <div className="flex gap-2 place-items-start sm:justify-start justify-center">
              <p className="xsm:text-[14px] text-[12px]  font-medium xsm:text-left text-center">
              Gangodawila, Nugegoda
              </p>
            </div>
            <div className="flex gap-2 place-items-start  sm:justify-start justify-center">
              <p className="xsm:text-[14px] text-[12px]  font-medium xsm:text-left text-center">
                Sri Lanka. 
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-[#848E99] w-full mt-[15px] " />
      <div className="text-sm mt-[14px] font-medium xsm:text-left text-center">
        © 2024 University of Sri Jayewardenepura. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
