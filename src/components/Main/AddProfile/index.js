import React, { useState } from "react";
import {
  CustomLinkInput,
  CustomTextInput,
  CustomYearPicker,
  CustomSubmitButton,
} from "../../Shared/Inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import MastTitle from "../../Shared/MastTitle";
import CustomButton from "../../Shared/CustomButton";
//import'./style.css';

const AddProfile = (props) => {
  const [linksArray, setLinksArray] = useState([{ title: "", link: "" }]);
  const [SelectedYear, setSelectedYear] = useState(new Date());
  const addLinkHandler = () => {
    setLinksArray((prev) => {
      if (prev.length < 5) {
        return [...prev, { title: "", link: "" }];
      }
      return prev;
    });
  };
  const removeLinkHandler = () => {
    setLinksArray((prev) => {
      const newArray = prev.slice(0, -1);
      return newArray;
    });
  };
  const titleChangeHandler = (event, index) => {
    const changes = event.target.value;
    setLinksArray((prev) => {
      prev[index].title = changes;
      return prev;
    });
  };
  const linkChangeHandler = (event, index) => {
    const changes = event.target.value;
    setLinksArray((prev) => {
      prev[index].link = changes;
      return prev;
    });
  };
  const removeEmptySocialLinks = (arr)=>{
    const modArr = arr.filter((a) => a.title !== "" && a.link !=="");
    return modArr
  }
  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    const data = JSON.stringify({
      name: values.title,
      admission: SelectedYear.getFullYear(),
      role: values.content,
      frameworks: values.frameworks,
      languages: values.languages,
      otherSkills: values.otherSkills,
      socialLinks: removeEmptySocialLinks(linksArray),
      banner: values.banner,
    });
    console.log("Data", data);
    setSubmitting(false);
    // resetForm();
    // history.push(`/user/${auth.userId}`);
  };
  return (
    <React.Fragment>
      <MastTitle title="Add Profile"/>
      <div className="px-[1rem]  md:px-[5rem] py-[2rem] ">
        <div className="BackgroundBlurForm p-2 md:p-6 rounded border shadow-lg">
          <Formik
            initialValues={{
              name: "",
              role: "",
              admission: "",
              languages: "",
              frameworks: "",
              otherSkills: "",
              banner: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(4, "Must be atleast 4 characters")
                .max(100, "Cannot exceed 200 character")
                .required("Required"),
              role: Yup.string().required("Required"), languages: Yup.string().required("Required"),
              frameworks: Yup.string().required("Required"),
              otherSkills: Yup.string().required("Required"),
            })}
            onSubmit={dataSubmitHandler}
          >
            {({ setFieldValue, ...props }) => (
              <Form>
                <CustomTextInput
                  label="Name"
                  name="name"
                  placeholder="Name here"
                />
                <CustomYearPicker
                  value={SelectedYear}
                  onChange={(newValue) => {
                    setSelectedYear(newValue);
                  }}
                  label="Year of admission"
                  name="admission"
                  placeholder="Select your year of admission"
                />
                <CustomTextInput
                  label="Your role "
                  name="role"
                  placeholder='Which role best describes you ? for example "Web Developer", "Competitive programmer" '
                />
                <CustomTextInput
                  label="Languages"
                  name="languages"
                  placeholder="How many programming languages do you know of? "
                />
                <CustomTextInput
                  label="Frameworks"
                  name="frameworks"
                  placeholder="How many Framework do you know of? "
                />
                <CustomTextInput
                  label="Other Skills"
                  name="otherSkills"
                  placeholder="Any other skill you want to mention? "
                />{" "}
                <CustomTextInput
                  label="Banner image URL"
                  name="banner"
                  placeholder="Put any banner image URL hosted online (optional)"
                />
                <div className="m-3 pt-2 pl-2 font-bold">
                  <p>Social Links</p>
                </div>
                {linksArray.map((item, index) => (
                  <CustomLinkInput
                    key={index}
                    onChangeOne={(event) => titleChangeHandler(event, index)}
                    onChangeTwo={(event) => linkChangeHandler(event, index)}
                    labelOne="Link Title"
                    labelTwo="Link"
                  />
                ))}
                <div className="flex gap-6 items-center justify-center">
                  <AiOutlinePlusCircle
                    className="cursor-pointer"
                    onClick={addLinkHandler}
                    fontSize={40}
                    color="black"
                  />
                  {linksArray.length > 1 && (
                    <AiOutlineMinusCircle
                      onClick={removeLinkHandler}
                      className="cursor-pointer"
                      fontSize={40}
                      color="maroon"
                    />
                  )}
                </div>
                <div className="mt-6 flex items-center justify-center">
                  <CustomButton
                    isDisabled={props.isSubmitting}
                    type="submit"
                    text={props.isSubmitting ? "Submitting" : "Submit"}
                  >Submit</CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddProfile;
