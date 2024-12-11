/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader, Mail, MapPin, Phone } from "lucide-react";
import RootLayout from "./RootLayout";
import { useEffect, useState } from "react";
import { client } from "@/utils/sanityClient";
import toast from "react-hot-toast";
import { authStore } from "@/store/authStore";

const Contact = () => {
  const { getBasicInfo } = authStore();
  const [basicInfo, setBasicInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getBasicInfo();
      setBasicInfo(data);
    };
    fetch();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const doc = {
      _type: "contact",
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      message: formData.message,
    };
    try {
      // Use the Sanity client to create a new document in the database
      const response = await client.create(doc);
      console.log("Document created:", response);
      toast.success("Our Team Will Contact You Soon");
      // Optionally reset form or notify user of success
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error("Error creating document:", error);
      toast.error("Error Sending Form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RootLayout>
      <section className="bg-white">
        <div className="container px-6 py-12 mx-auto">
          <div className="text-center">
            <p className="text-pink-600 font-medium">Contact Us</p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-800 md:text-4xl dark:text-gray-800">
              Get in Touch with Our Team
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              We'd love to hear from you! Whether you have a question or just
              want to say hello, feel free to reach out.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-2 ">
            {/* Contact Methods */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <span className="p-3 text-pink-600 bg-pink-100/80 rounded-full">
                  <Mail />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">
                    Our team is ready to assist you.
                  </p>
                  <p className="text-pink-600">
                    {basicInfo ? `${basicInfo[0]?.email}` : "No Email Found"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="p-3 text-pink-600 bg-pink-100/80 rounded-full">
                  <MapPin />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Office
                  </h3>
                  <p className="text-gray-600">Visit us at our HQ.</p>
                  <p className="text-pink-600">
                    {basicInfo ? `${basicInfo[0]?.address}` : "No Email Found"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="p-3 text-pink-600 bg-pink-100/80 rounded-full">
                  <Phone />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">Mon-Fri from 8am to 5pm.</p>
                  <p className="text-pink-600">
                    +91{" "}
                    {basicInfo ? `${basicInfo[0]?.phone}` : "No Email Found"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 bg-gray-100 rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-2 text-sm font-medium text-gray-600">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      placeholder="Eg. John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 text-sm font-medium text-gray-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Eg. Doe"
                      className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 text-sm font-medium text-gray-600">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Eg. johndoe@example.com"
                    className="w-full px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-2 text-sm font-medium text-gray-600">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="Type your message here..."
                    rows={4}
                  ></textarea>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full mt-6 px-6 py-3 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-400 focus:outline-none focus:ring focus:ring-pink-300"
                >
                  {isLoading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default Contact;
