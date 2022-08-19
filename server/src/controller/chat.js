import models from "../models";

const { chatModel } = models;

export default {
  sendChat: async (message, postedBy, to) => {
    //const { message, postedBy, to } = req.body;
    try {
      const newChatMessage = new chatModel({
        message,
        postedBy,
        to,
        messageRead: false,
      });
      await newChatMessage.save();
      return {
        message,
        postedBy,
        to,
        messageRead,
        success: true,
      };
    } catch (error) {
      return { success: false, error };
    }
  },
  getChatMessage: async (req, res) => {
    try {
      const { postedBy, to } = req.params;
      const msgs = await chatModel
        .find({
          $or: [
            { postedBy: postedBy, to: to },
            { postedBy: to, to: postedBy },
          ],
        })
        .sort({ createdAt: -1 });
      return res.status(200).json({
        msgs,
        postedBy,
        to,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
};
