import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; 

const AddPhones = () => {
  
  const [successMessage, setSuccessMessage] = useState(null);  
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate(); 

  // Updated validation schema with brand, model, and profile_id
  const validationSchema = Yup.object({
    brand: Yup.string().required("Phone brand is required"),
    model: Yup.string().required("Phone model is required"),
    profile_id: Yup.string().required("Profile ID is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    fetch("http://127.0.0.1:5000/phones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage("Phone added successfully!");
        resetForm();
        setSubmitting(false);

        setRedirecting(true);
        setTimeout(() => {
          navigate("/");  
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding phone:", error);
        setSubmitting(false);
      });
  };

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Phone</h1>

      {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

      <Formik
        initialValues={{ brand: "", model: "", profile_id: "" }} // Strict fields
        validationSchema={validationSchema}
        onSubmit={handleSubmit} 
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Phone Brand</label>
              <Field
                type="text"
                name="brand"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Phone Model</label>
              <Field
                type="text"
                name="model"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage name="model" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Profile ID</label>
              <Field
                type="text"
                name="profile_id"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage name="profile_id" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-md transition duration-300 hover:bg-green-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add phone"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {redirecting && <div className="text-center text-gray-600 mt-4">Redirecting to homepage...</div>}
    </div>
  );
};

export default AddPhones;
