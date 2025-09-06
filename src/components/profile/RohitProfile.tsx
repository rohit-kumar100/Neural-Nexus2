import React, { useState } from "react";

const RohitProfile: React.FC = () => {
  const [certificates, setCertificates] = useState<File[]>([]);

  // When user uploads a file
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCertificates([...certificates, ...Array.from(event.target.files)]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Rohit’s Profile</h2>

      {/* Profile Info */}
      <div className="mb-4">
        <p><strong>Name:</strong> Rohit</p>
        <p><strong>Role:</strong> Candidate</p>
      </div>

      {/* Certificate Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Upload Certificate</label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          multiple
          onChange={handleUpload}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Display Certificates */}
      <div>
        <h3 className="font-semibold mb-2">Uploaded Certificates</h3>
        <ul className="list-disc pl-5">
          {certificates.map((file, index) => (
            <li key={index} className="text-blue-600">
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RohitProfile;
