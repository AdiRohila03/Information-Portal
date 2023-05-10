const Hackathon = require('../models/hackathon.model');

//add new hackathon
const addHackathon = async (req, res) => {
    try {
        req.body.user_id = req.user._id;
        let hackathon = new Hackathon(req.body);
        await hackathon.save();
        res.status(200).send({ message: 'New Hackathon Added!', status: 'successful' });
    } catch (error) {
        res.status(400).send({ message: error.message, status: 'failed' });
    }
};

//view the hackathons
const viewHackathon = async (req, res) => {
    try {
        const hackathons = await Hackathon.find({ user_id: req.user._id });
        if (!hackathons) {
            res.status(401).send({ message: 'No Hackathon present!', status: 'failed' });
        } else {
            res.status(200).send(hackathons);
        }
    } catch (error) {
        res.status(400).send({ message: error.message, status: 'failed' });
    }
};

//update hackathon
const updateHackathon = async (req, res) => {
    try {
        const id = req.user._id;
        const hackathon = req.body;
        const hackathon_id = await Hackathon.findOne({
            user_id: id,
            hackathonEventName: req.body.hackathonEventName
        });
        const updatedHackathon = await Hackathon.findByIdAndUpdate(hackathon_id, hackathon, {
            new: true
        });
        if (!updatedHackathon) {
            res.status(401).send({ message: 'No Hackathon present!', status: 'failed' });
        } else {
            res.status(200).send(updatedHackathon);
        }
    } catch (error) {
        res.status(400).send({ message: error.message, status: 'failed' });
    }
};

//delete hackathon
const deleteHackathon = async (req, res) => {
    try {
        const hackathon_id = await Hackathon.findOne(
            { user_id: req.user._id, hackathonEventName: req.params.name },
            { _id: 1 }
        );
        await Hackathon.deleteOne({ _id: hackathon_id });
        res.status(200).send({ message: 'Hackathon deleted successfully!', status: 'success' });
    } catch (error) {
        res.status(400).send({ message: error.message, status: 'failed' });
    }
};

module.exports = { addHackathon, viewHackathon, updateHackathon, deleteHackathon };
