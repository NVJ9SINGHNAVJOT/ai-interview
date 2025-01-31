import "@/components/core/about/ContactUs.css";
import { sendQueryApi } from "@/services/operations/queryApi";
import { trimWhitespaceAndNewlines } from "@/utils/stringFormat";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type ContactUsQuery = {
  fullName: string;
  emailId: string;
  queryText: string;
};

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm<ContactUsQuery>();
  const [sending, setSending] = useState<boolean>(false);

  const formHandler = async (data: ContactUsQuery) => {
    setSending(true);
    data.queryText = trimWhitespaceAndNewlines(data.queryText);
    if (data.queryText.length === 0) {
      return;
    }
    const { error } = await sendQueryApi(data);
    setSending(false);
    if (error) {
      toast("Error Occurred!");
      return;
    }
    toast.success("Query submitted");
  };
  return (
    <div className="contact-card">
      <div className="contact-content">
        {/* query form */}
        <div className="relative w-full px-16 mt-7 flex justify-center">
          <form onSubmit={handleSubmit(formHandler)} className=" w-full mt-12  flex flex-col text-black ">
            <label className="mb-1 text-white">Full Name</label>
            <input
              type="text"
              className=" mb-4 outline-none rounded-lg p-2 bg-snow-600"
              {...register("fullName", {
                required: true,
                minLength: 2,
                maxLength: 80,
                pattern: /^[a-zA-Z\s]{2,}$/,
              })}
              placeholder="Full Name"
            />
            <label className="mb-1 text-white">Email</label>
            <input
              type="email"
              className=" mb-4 outline-none rounded-lg p-2 bg-snow-600"
              {...register("emailId", {
                required: true,
              })}
              placeholder="Email"
            />
            <label className="mb-1 text-white">Message</label>
            <textarea
              className="outline-none h-48 resize-none rounded-lg p-2 bg-snow-600"
              {...register("queryText", {
                required: true,
                minLength: 1,
                maxLength: 500,
              })}
              placeholder="Message"
              maxLength={500}
            ></textarea>
            <button disabled={sending} type="submit" className="ct-signInButton mt-4 ">
              {sending === false ? "Submit" : "Submitting..."}
            </button>
          </form>
        </div>
      </div>

      <div className="points_wrapper">
        <i className="point"></i>
        <i className="point"></i>
        <i className="point"></i>
        <i className="point"></i>
        <i className="point"></i>
        <i className="point"></i>
        <i className="point"></i>
        <i className="point"></i>
        <i className="point"></i>
        <i className="point"></i>
      </div>
    </div>
  );
};

export default ContactUs;
