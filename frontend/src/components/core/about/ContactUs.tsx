import "@/components/core/about/ContactUs.css";
import { queryRoutes } from "@/services/operations/queryRoutes";
import { trimWhitespaceAndNewlines } from "@/utils/stringFormat";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";
import { FormField } from "@/components/common/FormFields";

export type ContactUsQuery = {
  fullName: string;
  emailId: string;
  queryText: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ContactUsQuery>();

  const { execute } = useApi(queryRoutes.sendQueryApi);

  const formHandler = async (data: ContactUsQuery) => {
    data.queryText = trimWhitespaceAndNewlines(data.queryText);
    if (data.queryText.length === 0) {
      return;
    }
    const { error } = await execute(data);

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
        <div className="relative w-full px-16 flex justify-center">
          <form onSubmit={handleSubmit(formHandler)} className=" w-full mt-12 flex flex-col gap-y-4 text-black ">
            <FormField
              control={control}
              label="Full Name"
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

            <FormField
              control={control}
              label="Email"
              type="email"
              {...register("emailId", {
                required: true,
                setValueAs(value: string) {
                  return value.trim();
                },
              })}
            />

            <FormField
              inputClassName="h-[150px] resize-none overflow-y-auto overflow-x-hidden"
              control={control}
              type="textarea"
              label="Message"
              {...register("queryText", {
                required: true,
                minLength: 1,
                maxLength: 500,
                setValueAs(value: string) {
                  return trimWhitespaceAndNewlines(value);
                },
              })}
            />

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
