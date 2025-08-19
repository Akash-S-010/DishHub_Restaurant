import User from '../models/User.js';

//  Add new address
export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const newAddress = req.body; 

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push(newAddress);
    await user.save();

    return res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Error in addAddress:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//  Get all addresses of logged-in user
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("addresses");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user.addresses);
  } catch (error) {
    console.error("Error in getAddresses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//  Update a specific address
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.addressId; // from route
    const updatedData = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    Object.assign(address, updatedData); // merge new data
    await user.save();

    return res.status(200).json({
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Error in updateAddress:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//  Delete a specific address
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.addressId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    address.deleteOne(); 
    await user.save();

    return res.status(200).json({
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Error in deleteAddress:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

