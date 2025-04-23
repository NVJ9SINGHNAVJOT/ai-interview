import Page from "@/components/wrapper/Page";
import { useForm } from "react-hook-form";

const MCQ = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <Page>
      <p>Generate MCQ's</p>
      <form></form>
    </Page>
  );
};

export default MCQ;
