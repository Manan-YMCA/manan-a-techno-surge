import React, { useState } from "react";
import { CustomTextInput } from "../../Shared/Inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MastTitle from "../../Shared/MastTitle";
import CustomButton from "../../Shared/CustomButton";
import ImageUploadBox from "../../Shared/ImageUploadBox/ImageUploadBox";
import ErrorModal from "../../Shared/ErrorModal";
import { ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage, auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "../../Shared/LoadingScreen";
import { v4 as uuidv4 } from "uuid";
//import'./style.css';

const AddGallery = (props) => {
  const [user, loading, UserError] = useAuthState(auth);
  const [error, setError] = useState(null);
  const [galleryPic, setGalleryPic] = useState(null);
  const [formSubmitting, SetFormSubmitting] = useState(false);
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();
  let eventPicRef;

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

  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    const uniqueId = uuidv4();
    if (!setGalleryPic && user) {
      setError("Please select a Gallery picture");
    } else if (galleryPic.length === 0) {
      setError("Please select a Gallery picture");
    } else if (user) {
      eventPicRef = ref(storage, `gallery/${uniqueId}.jpg`);
      SetFormSubmitting(true);
      const data = {
        name: values.name,
        desc: values.desc,
        timestamp: new Date(),
        image: await upload(galleryPic[0], eventPicRef, 0.2),
      };
      await setDoc(doc(db, "gallery", uniqueId), data);
      console.log("Data", data);
    //   setGalleryPic(null);
      setSubmitting(false);
      SetFormSubmitting(false);
      resetForm();
      // history.push(`/user/${auth.userId}`);
    }
  };
  return (
    <React.Fragment>
      {user && (
        <div>
          <MastTitle title="Add Gallery Picture" />
          {error && (
            <ErrorModal errorText={error} clicked={() => setError(null)} />
          )}
          {formSubmitting && <LoadingScreen />}
          <div className="px-[1rem]  md:px-[5rem] py-[2rem] ">
            <div className="BackgroundBlurForm p-2 md:p-6 rounded border shadow-lg">
              <Formik
                initialValues={{
                  name: "",
                  desc: "",
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .min(4, "Must be atleast 4 characters")
                    .max(100, "Cannot exceed 200 character")
                    .required("Required"),
                  desc: Yup.string().required("Required"),
                })}
                onSubmit={dataSubmitHandler}
              >
                {({ setFieldValue, ...props }) => (
                  <Form>
                    <CustomTextInput
                      label="Name of the event"
                      name="name"
                      placeholder="Name here"
                    />
                    <CustomTextInput
                      label="Description"
                      name="desc"
                      placeholder="Supports Markdown"
                      multiline
                    />
                    <div className="m-3 pt-2 pl-2 font-bold">
                      <p>Select Gallery Picture</p>
                    </div>
                    <ImageUploadBox
                      onDrop={(files) => {
                        setGalleryPic(files);
                      }}
                    />
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

export default AddGallery;
