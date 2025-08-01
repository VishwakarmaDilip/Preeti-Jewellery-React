import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { contactUsToWhatsapp } from "../features/Add To List/listFunctionSlice";

const ContactUs = () => {
  const {register, handleSubmit} = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(contactUsToWhatsapp(data));
    
  }

  return (
    <div className=" w-full h-fit xs:h-screen flex justify-center pb-4 xs:pb-0 mb-20 mt-20">
      {/* Contact us container */}
      <div className=" flex flex-col w-4/5 min-h-full xs:min-h-fit gap-8">
        <div className=" font-bold text-[2rem]">
          <h1>Contact Us</h1>
        </div>

        <div className=" w-full h-fit min-h-[70%] flex-col xs:flex-row flex justify-between">
          <form className=" w-full xs:w-[45%] flex items-center" onSubmit={handleSubmit(onSubmit)}>

            {/* message box */}
            <div className=" py-8 w-full h-full flex flex-col justify-around gap-4">
              <div className=" flex flex-col w-full gap-2">
                <label htmlFor="userName">Full Name</label>
                <input
                  {...register("userName", {required: true})}
                  placeholder="Enter your full name..."
                  className=" h-8 pl-2"
                />
              </div>

              <div className=" flex flex-col w-full gap-2">
                <label htmlFor="email">Email</label>
                <input
                  {...register("email", {required: true})}
                  placeholder="ab12c@gmail.com.."
                  className=" h-8 pl-2"
                />
              </div>

              <div className=" flex flex-col w-full gap-2">
                <label htmlFor="messageTitle">Subject</label>
                <input
                  {...register("messageTitle", {required: true})}
                  placeholder="Title Of your message."
                  className=" h-8 pl-2"
                />
              </div>

              <div className=" flex flex-col w-full gap-2">
                <label htmlFor="message">Message</label>
                <textarea
                {...register("message", {required: true})}
                  cols="30"
                  rows="10"
                  placeholder="We are always here to help you..."
                  className="p-2"
                ></textarea>
              </div>

              <div className=" flex flex-col w-full gap-2">
                <button className=" h-8 bg-buttonColor border border-black font-semibold hover:shadow-boxShadow active:bg-clickColor">Send Message</button>
              </div>
            </div>
          </form>

          {/* map box */}
          <div className=" w-full h-80 xs:h-full xs:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1220.3736967561883!2d72.82403988792352!3d19.078028441021207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c975bbc3f319%3A0x844914cfbc6901f3!2sRam%20Mandir!5e0!3m2!1sen!2sin!4v1733676268496!5m2!1sen!2sin"
              width="500px"
              height="auto"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=" border-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
