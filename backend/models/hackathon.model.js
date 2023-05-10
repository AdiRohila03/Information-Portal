const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    organizer: {
        type: String,
        required: true
    },
    hackathonEventName: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        require: true
    },
    hackathonProject: [
        {
            projectName: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            githubURL: {
                type: String,
            },
            hostedLink: {
                type: String
            }
        }
    ],
    role_details: [
        {
            position: {
                type: String,
                required: true
            },
            contribution: {
                type: String
            }
        }
    ],
    certificate: {
        data: Buffer,
        contentType: String,
        originalName: String
    }
});

const Hackathon = mongoose.model('Hackathon', HackathonSchema);
module.exports = Hackathon;
