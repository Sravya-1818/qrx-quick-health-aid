import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DemoProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">How to Fill Your Medical Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <div>
              <h3 className="font-semibold">
                <span role="img" aria-label="profile">👤</span> Basic Information
              </h3>
              <ul className="list-disc ml-6">
                <li><strong>Name:</strong> Your full legal name.</li>
                <li><strong>Age:</strong> Your current age in years.</li>
                <li><strong>Blood Group:</strong> Like A+, O-, AB+, etc.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">
                <span role="img" aria-label="leaf">🌿</span> Medical Details
              </h3>
              <ul className="list-disc ml-6">
                <li><strong>Allergies:</strong> Example: "Peanuts, Penicillin".</li>
                <li><strong>Medical Conditions:</strong> Example: "Diabetes, Asthma".</li>
                <li><strong>Medications:</strong> Example: "Metformin, Inhaler".</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">
                <span role="img" aria-label="phone">📞</span> Emergency Contact
              </h3>
              <ul className="list-disc ml-6">
                <li><strong>Name:</strong> Someone to contact in case of emergency.</li>
                <li><strong>Phone:</strong> Their phone number.</li>
                <li><strong>Relation:</strong> Example: Father, Sister, Friend.</li>
              </ul>
            </div>

            <div className="text-center">
              <Button className="w-full sm:w-auto" onClick={() => navigate("/generate")}>
                🚀 Fill My Profile Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoProfile;
