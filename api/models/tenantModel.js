'use strict';
const mongoose = require('mongoose');

// Tenantschema and model
const tenantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Enter first name'
    },
    lastName: {
        type: String,
        required: 'Enter last name',
    },
    appartment: {
        type: Number,
        required: 'Enter the appartment number'
    },
    tag: {
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    }
});

module.exports = mongoose.model("Tenant", tenantSchema);