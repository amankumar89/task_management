import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  sequenceValue: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequenceValue;
};

export { Counter, getNextSequenceValue };
