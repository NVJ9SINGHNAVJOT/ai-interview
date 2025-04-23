import "@/components/core/about/ContactUs.css";
import CustomInput from "@/components/form/CustomInput";
import CustomTextarea from "@/components/form/CustomTextarea";
import FormField from "@/components/form/FormField";
import { queryRoutes } from "@/services/operations/queryRoutes";
import { trimWhitespaceAndNewlines } from "@/utils/stringFormat";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type ContactUsQuery = {
  fullName: string;
  emailId: string;
  queryText: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ContactUsQuery>();

  const formHandler = async (data: ContactUsQuery) => {
    data.queryText = trimWhitespaceAndNewlines(data.queryText);
    if (data.queryText.length === 0) {
      return;
    }
    const { error } = await queryRoutes.sendQueryApi(data);

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
          <form onSubmit={handleSubmit(formHandler)} className=" w-full mt-12 flex flex-col gap-y-4 text-black ">
            <FormField title="Full Name" error={errors.fullName}>
              <CustomInput
                className=" bg-snow-600 text-black"
                type="text"
                {...register("fullName", {
                  required: true,
                  minLength: 2,
                  maxLength: 80,
                  pattern: /^[a-zA-Z\s]{2,}$/,
                  setValueAs(value: string) {
                    return value.trim();
                  },
                })}
              />
            </FormField>
            <FormField title="Email" error={errors.emailId}>
              <CustomInput
                className=" bg-snow-600 text-black"
                type="email"
                {...register("emailId", {
                  required: true,
                  setValueAs(value: string) {
                    return value.trim();
                  },
                })}
              />
            </FormField>

            <FormField title="Message" error={errors.queryText}>
              <CustomTextarea
                className=" bg-snow-600 text-black resize-none h-40"
                {...register("queryText", {
                  required: true,
                  minLength: 1,
                  maxLength: 500,
                  setValueAs(value: string) {
                    return trimWhitespaceAndNewlines(value);
                  },
                })}
                maxLength={500}
              />
            </FormField>

            <button
              disabled={isSubmitting}
              type="submit"
              className={`ct-signInButton mt-4 ${isSubmitting && "animate-pulse"}`}
            >
              {isSubmitting === false ? "Submit" : "Submitting..."}
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
