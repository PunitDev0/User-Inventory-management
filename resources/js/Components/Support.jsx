import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { submitSupport, submitSupportRequest } from "@/lib/Services/SubmitSupport";

export default function SupportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [supportRequests, setSupportRequests] = useState([]); // State for fetched support requests

  // Fetch support requests on component mount
  useEffect(() => {
    const fetchSupportRequests = async () => {
      try {
        const response = await submitSupport();
        if (response.success) {
          setSupportRequests(response.data);
        } else {
          console.error("Failed to fetch support requests:", response.message);
        }
      } catch (error) {
        console.error("Error fetching support requests:", error);
      }
    };

    fetchSupportRequests();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value) => {
    setFormData((prev) => ({ ...prev, priority: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await submitSupportRequest(formData);
      
      if (response.success) {
        setSubmitStatus({ type: "success", message: "Support request submitted successfully!" });
        setFormData({
          name: "",
          email: "",
          subject: "",
          priority: "medium",
          message: "",
        });
        // Refresh support requests after submission
        const updatedRequests = await submitSupport();
        if (updatedRequests.success) {
          setSupportRequests(updatedRequests.data);
        }
      } else {
        throw new Error(response.message || "Failed to submit support request");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit support request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Support Form */}
        <Card className="w-full shadow-2xl rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={handlePriorityChange}
                  className="mt-1"
                >
                  <SelectTrigger id="priority" className="w-full border-gray-300 rounded-lg shadow-sm">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Describe your problem in detail..."
                />
              </div>

              {submitStatus && (
                <div
                  className={`p-3 rounded-lg ${
                    submitStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send size={16} />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Requests Table */}
        <Card className="w-full shadow-2xl rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Your Support Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {supportRequests.length === 0 ? (
              <p className="text-gray-500 text-center">No support requests found.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-sm font-semibold text-gray-800">ID</TableHead>
                      <TableHead className="text-sm font-semibold text-gray-800">Subject</TableHead>
                      <TableHead className="text-sm font-semibold text-gray-800">Priority</TableHead>
                      <TableHead className="text-sm font-semibold text-gray-800">Status</TableHead>
                      <TableHead className="text-sm font-semibold text-gray-800">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportRequests.map((request) => (
                      <TableRow key={request.id} className="border-b hover:bg-gray-50">
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.subject}</TableCell>
                        <TableCell className="capitalize">{request.priority}</TableCell>
                        <TableCell className="capitalize">{request.status}</TableCell>
                        <TableCell>{formatDate(request.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}