import { recordModel } from "../schema/formSchema.js";

//! Get all the RECORDS , userId it reffers to the userId of the User which is provided by CLERK when we logged in with google account

export const getForm = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const records = await recordModel
      .find({ userId: userId })
      .sort({ date: "desc" });

    if (records.length === 0) {
      return res.status(404).send(`No records found for this user`);
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
};

//! Saving the DATA  in MongoDb Database passed in the Form by the user

export const postForm = async (req, res) => {
  try {
    const newRecordBody = req.body;

    const savedRecord = await recordModel.create(newRecordBody);
    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};

//! Update the data
export const updateForm = async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const updatedRecord = await recordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      {
        new: true,
      }
    );

    if (!updatedRecord) return res.status(404).send(`No record founded`);
    res.status(200).send(updatedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};

//! delete the data
export const deleteForm = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await recordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send(`No record founded`);

    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
};
