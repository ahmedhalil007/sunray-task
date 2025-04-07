import React from "react";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import { Button, Spinner } from "@heroui/react";
import axios from "axios";

const EmailList = ({ emails }) => {
  const [isInvalid, setIsInvalid] = React.useState(true);
  const [selectedEmails, setSelectedEmails] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleEmailChange = (value) => {
    setSelectedEmails(value);
    setIsInvalid(value.length < 3);
  };

  const handleSendEmails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/emails", {
        emails: selectedEmails,
      });

      if (response.status === 200) {
        alert("Emails successfully added!");
      }

      setSelectedEmails([]);
    } catch (error) {
      alert("Blacklisted emails cannot be added.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2 w-80">Email Search & Send</h2>
      <div className="flex items-center space-x-4">
        <Accordion className="flex-1 w-80" onChange={() => setIsOpen(!isOpen)}>
          <AccordionItem key="1" aria-label="Select" title="Select">
            <CheckboxGroup
              isRequired
              description={
                emails.length === 0
                  ? "Add mail above"
                  : "Select at least 3 emails"
              }
              isInvalid={isInvalid}
              label=""
              onValueChange={handleEmailChange}
              value={selectedEmails}
            >
              {emails.map((email) => (
                <Checkbox key={email} value={email}>
                  {email}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </AccordionItem>
        </Accordion>

        {isLoading ? (
          <Spinner className="h-10" />
        ) : (
          <Button
            className="sticky top-0 self-start h-10"
            color="primary"
            isDisabled={selectedEmails.length < 3}
            onClick={handleSendEmails}
          >
            Send Emails
          </Button>
        )}
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "mt-8" : "mt-0"
        }`}
      ></div>
    </div>
  );
};

export default EmailList;
