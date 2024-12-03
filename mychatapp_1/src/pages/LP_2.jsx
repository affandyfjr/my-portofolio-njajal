import React, { useEffect } from "react";
import gambar_2 from "../assets/gambar awal-min.png";
import gambar_3 from "../assets/foto kuning-min.png";
import gambar_4 from "../assets/gambar bawah-min.png";
import {
  IoChatbubbleOutline,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { IoNotifications, IoDocumentText } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import Slide_scrool2 from "../components/Slide_scrool2";
import Navbar from "../components/Navbar_3";
import Komponen_scroll_1 from "../components/Komponen_scroll_1";
import Komp_slider_3 from "../components/komp_slider_3";
import Button from "../components/Button";
import Gambar_atas from "../components/Gambar_atas";

const LP = () => {
  //animasi
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="induk -z-30 px-10 md:px-20 lg:px-32 "
        style={{ fontFamily: "tahoma" }}
      >
        <div data-aos="fade-up" className="1 sm:flex sm:relative pt-20">
          <div className="kiri-1 w-aut sm:w-[50%] flex flex-col items-center sm:items-start gap-4 md:gap-5 xl:gap-7">
            <Gambar_atas />
            <p className="-2 text-sm sm:text-xs md:text-sm xl:text-lg w-full text-center sm:text-left mt-48 sm:mt-0">
              Get the best chat experience with real-time connections and
              online/offline notifications.
            </p>
            {/* getstarted btn */}
            <Link to="/login">
              <Button />
            </Link>
            <div className="-4 flex space-x-2  md:justify-between">
              <Komponen_scroll_1
                logo={<IoChatbubbleOutline className="" />}
                bg_logo={"bg-oranye"}
                atas={"Online Chat Support"}
                bawah={"95% positive review"}
              />
              <Komponen_scroll_1
                logo={<MdOutlineWatchLater className="" />}
                bg_logo={"bg-hijau"}
                atas={"Quick Loading"}
                bawah={"98% availability"}
              />
            </div>
          </div>
          <div className="kanan-1 sm:right-0 sm:top-0 md:top-0 lg:-top-7 sm:w-[55%] md:w-[57%] lg:w-[58%]  md:-right-5 ">
            <img
              src={gambar_2}
              alt="gambar"
              className="w-auto sm:w-full h-auto mt-5 md:mt-0 "
            />
          </div>
        </div>

        {/* scroll 2 =============== */}

        <div className="2 mt-20 md:mt-28 xl:mt-36 ">
          <div data-aos="fade-in" className="flex justify-center w-full">
            <div className="a flex flex-col items-center lg:w-[60%] xl:w-[50%]">
              <h1 className="text-center font-bold text-3xl md:text-4xl xl:text-5xl">
                Our special features
              </h1>

              <p className="text-center mt-2 xl:text-xl xl:mt-4">
                We have created several functions to make you more comfortable
                and happy using our chat
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="bagian-slide flex flex-col sm:flex-row items-center mt-20 space-y-5 sm:space-y-0 sm:space-x-3 lg:space-x-8 sm:justify-between"
          >
            <Slide_scrool2
              logo={
                <p className="logo text-xs xl:text-base rounded-full text-white flex justify-center items-center">
                  FREE
                </p>
              }
              bg_color={"bg-merah"}
              text={
                "    Enjoy all the features at no cost. We believe communication does not need to be expensive."
              }
              judul={"100% Free"}
              angka={"4.9"}
              reviews={"(8.7k reviews)"}
            />
            <Slide_scrool2
              logo={<IoChatbubbleOutline className="fill-white xl:size-10" />}
              bg_color={"bg-oranye"}
              text={
                "   Experience seamless communication speed, all messages delivered in real time."
              }
              judul={"Real-Time Chat"}
              angka={"4.9"}
              reviews={"(7.2k reviews)"}
            />
            <Slide_scrool2
              logo={<IoNotifications className="fill-white xl:size-10" />}
              bg_color={"bg-hijau"}
              text={
                " Know your users status instantly who is online and offline."
              }
              judul={"Status Notifications User"}
              angka={"4.9"}
              reviews={"(9.1k reviews)"}
            />
          </div>
        </div>

        {/* scroll ke 3========= */}
        <div className="3 mt-20 md:mt-28 xl:mt-36 md:flex md:flex-row xl:justify-between">
          <div
            data-aos="fade-right"
            className="kiri flex flex-col items-center md:items-start justify-around  space-y-5 md:w-[50%] xl:w-[45%] "
          >
            <h1 className="text-center md:text-left font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Our awesome service
            </h1>
            <p className="text-center text-sm md:text-xs lg:text-sm md:w-[80%] md:text-left mt-2 xl:text-base xl:mt-4 ">
              Intuitive features make it easy to stay connected, from anywhere,
              at any time.Enjoy a seamless chat experience on desktop or mobile,
              with a display that adapts to the screen.
            </p>

            <Link to="/guide" className="w-full">
              <h2 className="text-center w-full md:text-left lg:text-base text-blue-600 underline underline-offset-2 font-bold ">
                Usage Guide
              </h2>
            </Link>
          </div>
          <div className="kanan mt-10 md:mt-0 flex justify-center md:w-[50%] px-5 sm:px-[15vw] md:px-0 lg:pl-7 xl:pl-20">
            <div
              data-aos="fade-left"
              className="container space-y-5 w-full h-auto bg-yellow-400 p-5 md:p-6  lg:p-7 rounded-xl xl:rounded-2xl content-center"
            >
              <Komp_slider_3
                logo_3={
                  <IoNotifications className="fill-white size-7 xl:size-12" />
                }
                atas_3={"Propper Documentation"}
                bawah_3={
                  "  Ensures that every feature is easily understandable and accessible."
                }
                bg_logo_3={"bg-oranye"}
              />
              <Komp_slider_3
                logo_3={
                  <AiOutlineFieldTime className="fill-white size-7 xl:size-12" />
                }
                atas_3={"Quick Data Transfer"}
                bawah_3={
                  "  Quick data transfer seamless and efficient sharing of information."
                }
                bg_logo_3={"bg-hijau"}
              />
              <Komp_slider_3
                logo_3={
                  <IoDocumentText className="fill-white size-7 xl:size-12" />
                }
                atas_3={"Real Time"}
                bawah_3={" Keep you instantly informed as changes happen."}
                bg_logo_3={"bg-merah"}
              />
            </div>
          </div>
        </div>

        {/* scroll ke 4============= */}
        <div className="4 mt-20 md:mt-28 xl:mt-36 md:flex md:flex-row-reverse xl:justify-between">
          <div className="kanan flex flex-col items-center md:items-start justify-around  space-y-5 md:w-[50%] xl:w-[45%]">
            <h1
              data-aos="zoom-in"
              className="text-center md:text-left font-bold text-3xl md:text-4xl xl:text-5xl"
            >
              Make easy to build <br />
              your ChatBox
            </h1>
            <p
              data-aos="zoom-in"
              className="text-center text-sm md:text-xs lg:text-sm md:w-[80%] md:text-left mt-2 xl:text-base xl:mt-4"
            >
              Every message and status is immediately updated in seconds,
              providing a more responsive experience. Our system ensures the
              connection remains stable, so your conversation never drops.
            </p>
            <div
              data-aos="zoom-in"
              className="kaki flex justify-between w-full"
            >
              <div className="a flex flex-col items-center space-y-1">
                <h2 className="text-lg lg:text-3xl font-bold">500+</h2>
                <p className="text-xs lg:text-base">Happy Customer</p>
              </div>
              <div className="a flex flex-col items-center space-y-1">
                <h2 className="text-lg lg:text-3xl font-bold">700K+</h2>
                <p className="text-xs lg:text-base">Chat Service</p>
              </div>
              <div className="a flex flex-col items-center space-y-1">
                <h2 className="text-lg lg:text-3xl font-bold">600+</h2>
                <p className="text-xs lg:text-base">Award Winning</p>
              </div>
            </div>
          </div>
          <div
            data-aos="zoom-in"
            className="kiri mt-10 md:mt-0 flex justify-center md:w-[50%] px-5 sm:px-[15vw] md:px-0 lg:pr-7 xl:pr-20"
          >
            <img src={gambar_3} alt="gambar" className="w-auto h-auto" />
          </div>
        </div>
      </div>

      {/* scroll terakhirrr========= */}
      <div className="5 mt-16 md:mt-20 xl:mt-28   flex flex-col items-center bg-blue-200 py-10 lg:py-20 px-10">
        <div className="atas items-center md:w-[50%] xl:w-[45%]">
          <h1 className="text-center font-bold text-3xl md:text-4xl xl:text-5xl">
            Alternative for communication
          </h1>
        </div>
        <div className="bawah mt-5 md:flex md:flex-row-reverse xl:justify-between">
          <div className="kanan flex flex-col items-center md:items-start justify-around  space-y-5 md:w-[50%] xl:w-[45%]">
            <p className="-2 text-center text-slate-500 text-sm md:text-xs lg:text-sm md:w-[80%] md:text-left mt-2 xl:text-base xl:mt-4">
              Every message and status is immediately updated in seconds,
              providing a more responsive experience.No fees, enjoy unlimited
              chat with all features for free.
            </p>
            {/* //getstarted btn */}
            <Link to="/login">
              <Button />
            </Link>
          </div>
          <div className="mt-10 md:mt-0 flex justify-center md:w-[50%] px-5">
            <img src={gambar_4} alt="gambar" className="w-auto h-auto" />
          </div>
        </div>
      </div>
      <div className="footer bg-putih">
        <div className="atas flex px-10 py-16 ">
          <div className="atas-kiri flex gap-3 items-center w-[50%]">
            <IoLogoLinkedin className="size-8 fill-black"/>
            <IoLogoFacebook className="size-8 fill-black"/>
            <IoLogoGithub className="size-8 fill-black"/>
          </div>
          <div className="atas-kanan w-[50%] flex justify-evenly gap-3 text-black">
            <ul>
              <li><b>Home</b></li>
              <li>about us</li>
              <li>blog</li>
              <li>category</li>
            </ul>
            <ul>
              <li><b>Service</b></li>
              <li>feature</li>
              <li>perform text</li>
              <li>performance</li>
            </ul>
            <ul>
              <li><b>Contact Us</b></li>
              <li>+100052415</li>
              <li>kawwula@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="bawah flex justify-evenly p-4 pb-8 border-t-2 border-slate-200">
          <p className="text-hitam">@QuickChat</p>
          <p className="text-hitam">@Widi_Desain</p>
          <p className="text-hitam">copyright@2024</p>
          <p className="text-hitam">Theme and Privacy</p>
        </div>
      </div>
    </>
  );
};

export default LP;
