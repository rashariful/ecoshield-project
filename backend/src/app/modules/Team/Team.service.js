import { Team } from "./Team.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Declare the Services

const createTeam = async (file, payload) => {
  try {
    if (!payload.name) throw new Error("Name is  required.");
    if (file?.buffer) {
      const imageName = `team${Date.now()}`;

      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    const result = await Team.create(payload);
    return result;
  } catch (error) {
     console.error("Failed to create contents:", error);
    throw new Error("Failed to create contents: " + error.message);
  }
};

const getAllTeam = async (query) => {
  const TeamSearchableFields = [];
  const resultQuery = new QueryBuilder(Team.find(), query)
    .search(TeamSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();

  return {
    data: result,
    meta,
  };
};

const getSingleTeam = async (id) => {
  const result = await Team.findById(id);
  return result;
};

const updateTeam = async (id, file, payload) => {
  try {
    const team = await Team.findById(id);
    if (!team) {
      throw new Error("Team member not found");
    }

    // যদি নতুন ফাইল থাকে, তাহলে ক্লাউডিনারিতে আপলোড করো
    if (file?.buffer) {
      const imageName = `team${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    } else {
      // নতুন thumbnail না থাকলে পুরোনোটা রেখে দাও
      payload.thumbnail = team.thumbnail;
    }

    const result = await Team.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (error) {
    console.error("Failed to update team:", error);
    throw new Error("Failed to update team: " + error.message);
  }
};

const deleteTeam = async (id) => {
  const result = await Team.findByIdAndDelete(id);
  return result;
};

export const TeamServices = {
  createTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
