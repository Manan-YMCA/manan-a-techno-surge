import React, { useEffect, useState } from "react";
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
import ImageUploadBox from "../../Shared/ImageUploadBox/ImageUploadBox";
import ErrorModal from "../../Shared/ErrorModal";
import { ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage, auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import imageCompression from "browser-image-compression";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "../../Shared/LoadingScreen";
import { useForkRef } from "@mui/material";
//import'./style.css';

const EditProfile = (props) => {
  const { profileData } = props;
  const [user, loading, UserError] = useAuthState(auth);
  const [error, setError] = useState(null);
  const [linksArray, setLinksArray] = useState(profileData.socialLinks);
  const [profilePic, setProfilePic] = useState(null);
  const [SelectedYear, setSelectedYear] = useState(
    new Date(profileData.admission, 10, 20)
  );
  const [formSubmitting, SetFormSubmitting] = useState(false);
  //Upload file
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();
  let profilePicRef;
  const [downloadUrl, downloadUrlLoading, downloadUrlError] = useDownloadURL(
    user && ref(storage, `members/${user.email}.jpg`)
  );

  const upload = async (pic, picRef, size) => {
    let url;
    const options = {
      maxSizeMB: size,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(pic, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      await uploadFile(picRef, compressedFile, {
        contentType: "image/jpeg",
      }).then(async () => {
        await getDownloadURL(picRef).then((downloadUrl) => {
          console.log("url", downloadUrl);
          url = downloadUrl;
        });
      });
    } catch (error) {
      console.log(error);
    }
    return url;
  };

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
  const removeEmptySocialLinks = (arr) => {
    const modArr = arr.filter((a) => a.title !== "" && a.link !== "");
    return modArr;
  };
  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    if (user) {
      profilePicRef = ref(storage, `members/${user.email}.jpg`);
      SetFormSubmitting(true);
      const data = {
        name: values.name,
        admission: SelectedYear.getFullYear(),
        role: values.role,
        frameworks: values.frameworks,
        languages: values.languages,
        otherSkills: values.otherSkills,
        socialLinks: removeEmptySocialLinks(linksArray),
        banner: values.banner,
        permission: profileData.permission,
        pfp:
          profilePic.length === 0
            ? profileData.pfp
            : await upload(profilePic[0], profilePicRef, 0.1),
        email: user.email,
      };
      await setDoc(doc(db, "userProfiles", user.email), data);
      setSubmitting(false);
      SetFormSubmitting(false);
    }
  };
  return (
    <React.Fragment>
      {user && (
        <div>
          <MastTitle title="Edit Profile" />
          {error && (
            <ErrorModal errorText={error} clicked={() => setError(null)} />
          )}
          {formSubmitting && <LoadingScreen />}
          <div className="px-[1rem]  md:px-[5rem] py-[2rem] ">
            <div className="BackgroundBlurForm p-2 md:p-6 rounded border shadow-lg">
              <Formik
                initialValues={{
                  name: profileData.name,
                  role: profileData.role,
                  admission: profileData.admission,
                  languages: profileData.languages,
                  frameworks: profileData.frameworks,
                  otherSkills: profileData.otherSkills,
                  banner: profileData.banner,
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .min(4, "Must be atleast 4 characters")
                    .max(100, "Cannot exceed 200 character")
                    .required("Required"),
                  role: Yup.string().required("Required"),
                  languages: Yup.string().required("Required"),
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
                      <p>Select Profile Picture</p>
                    </div>
                    <ImageUploadBox
                      fileURL={
                        profilePic && profilePic.length === 0 && profileData.pfp
                      }
                      onDrop={(files) => {
                        setProfilePic(files);
                      }}
                    />
                    <div className="m-3 pt-2 pl-2 font-bold">
                      <p>Social Links</p>
                    </div>
                    {linksArray.map((item, index) => (
                      <CustomLinkInput
                        key={index}
                        onChangeOne={(event) =>
                          titleChangeHandler(event, index)
                        }
                        onChangeTwo={(event) => linkChangeHandler(event, index)}
                        labelOne="Link Title"
                        labelTwo="Link"
                        valueOne={item.title}
                        valueTwo={item.link}
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
                      >
                        <p className="dark:text-gray-800 px-2 text-[22px] font-bold">
                          Submit
                        </p>
                      </CustomButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="w-screen h-screen">
          <LoadingScreen />
        </div>
      )}
    </React.Fragment>
  );
};

export default EditProfile;
