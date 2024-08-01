const Form = require("../Model/Form");
const { v4: uuidv4 } = require("uuid");

const createForm = async (req, res) => {
  try {
    const { formName, formData, userid } = req.body;
    console.log("Received data:", { formName, formData, userid });

    if (!formName || !formData || !userid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uniqueId = uuidv4();
    const uniqueLink = `http://localhost:5174/form/unique/${uniqueId}`;

    const form = new Form({
      formName,
      formData,
      userid,
      link: uniqueLink,
      uniqueId,
    });

    await form.save();
    console.log("Form saved successfully:", form);

    res.status(201).json({ form, link: uniqueLink });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFormByUniqueId = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const form = await Form.findOne({ uniqueId });
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getForms, getFormById, createForm, getFormByUniqueId };
