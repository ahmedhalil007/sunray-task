const Email = require("../models/Email");
const blacklist = require("../blacklist");

const isBlacklisted = (email) => {
  const domain = email.split("@")[1];
  return blacklist.includes(domain);
};

exports.addEmails = async (req, res) => {
  const emails = req.body.emails;

  if (!Array.isArray(emails)) {
    return res
      .status(400)
      .json({ message: "You must send an array of emails." });
  }

  const blacklisted = emails.filter((email) => isBlacklisted(email));
  if (blacklisted.length > 0) {
    return res.status(400).json({
      message: "Request contains blacklisted emails.",
      blacklisted,
    });
  }

  const results = {
    added: [],
    updated: [],
  };

  for (const email of emails) {
    try {
      const existing = await Email.findOne({ email });

      if (existing) {
        existing.count += 1;
        await existing.save();
        results.updated.push(email);
      } else {
        const newEmail = new Email({ email });
        await newEmail.save();
        results.added.push(email);
      }
    } catch (err) {
      console.error("Error handling email:", email, err);
    }
  }

  res.status(200).json(results);
};

exports.getTopEmails = async (req, res) => {
  try {
    const topEmails = await Email.find().sort({ count: -1 }).limit(10);

    res.status(200).json(topEmails);
  } catch (err) {
    console.error("Error fetching top emails:", err);
    res.status(500).json({ message: "Server error" });
  }
};
