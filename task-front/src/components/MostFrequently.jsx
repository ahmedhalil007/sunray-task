import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import axios from "axios";
import { generateFibonacci } from "./fibonacci";

const MostFrequently = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fibSet, setFibSet] = useState(new Set());

  useEffect(() => {
    setFibSet(generateFibonacci(100));
  }, []);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/emails/top"
        );
        setEmails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const isFibonacci = (num) => fibSet.has(num);

  return (
    <div className="w-full mt-4">
      <h2 className="text-xl font-bold mb-2">Most Frequently Sent Emails</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table aria-label="Most Frequently Repeated Emails Table">
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Count</TableColumn>
          </TableHeader>
          <TableBody>
            {emails.map((emailData, index) => {
              const emailLength = emailData.email.length;
              const isFib = isFibonacci(emailLength);
              return (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: isFib ? "red" : "transparent",
                  }}
                >
                  <TableCell
                    style={{
                      fontWeight: isFib ? "bold" : "normal",
                      color: isFib ? "white" : "black",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: isFib ? "bold" : "normal",
                      color: isFib ? "white" : "black",
                    }}
                  >
                    {emailData.email}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: isFib ? "bold" : "normal",
                      color: isFib ? "white" : "black",
                    }}
                  >
                    {emailData.count}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MostFrequently;
